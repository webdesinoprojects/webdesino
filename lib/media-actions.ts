"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getMedia(page = 1, limit = 50) {
  const skip = (page - 1) * limit;
  const [media, total] = await Promise.all([
    prisma.media.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.media.count(),
  ]);
  return { media, total };
}

export async function uploadMedia(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name.replace(/\s+/g, "-");
  
  // Create YYYY/MM folder structure
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const storagePath = `uploads/${year}/${month}/${Date.now()}-${filename}`;

  const { data, error } = await supabase.storage
    .from('images')
    .upload(storagePath, buffer, {
      contentType: file.type,
      upsert: false
    });

  if (error) {
    throw new Error(`Supabase upload failed: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from('images')
    .getPublicUrl(storagePath);

  const media = await prisma.media.create({
    data: {
      filename: filename,
      url: publicUrlData.publicUrl,
      size: file.size,
      mimeType: file.type,
    },
  });

  revalidatePath("/admin/media");
  return media;
}

export async function deleteMedia(id: string) {
  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) return;

  // Extract storage path from URL
  // URL format: https://[project].supabase.co/storage/v1/object/public/images/uploads/2024/05/file.jpg
  // We need: uploads/2024/05/file.jpg
  try {
    const urlObj = new URL(media.url);
    const pathParts = urlObj.pathname.split('/public/images/');
    if (pathParts.length > 1) {
        const storagePath = decodeURIComponent(pathParts[1]);
        await supabase.storage.from('images').remove([storagePath]);
    }
  } catch (e) {
      console.error("Error parsing URL for deletion", e);
  }

  await prisma.media.delete({ where: { id } });
  revalidatePath("/admin/media");
}
