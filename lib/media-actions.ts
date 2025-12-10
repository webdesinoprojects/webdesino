"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY) are required");
}

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
  if (!file) {
    throw new Error("No file provided");
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error(`File type ${file.type} is not allowed. Only images are permitted.`);
  }

  // Validate file size (10MB limit)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error(`File size exceeds the maximum limit of 10MB. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
  }

  if (file.size === 0) {
    throw new Error("File is empty");
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Sanitize filename
    const sanitizedFilename = file.name
      .replace(/[^a-zA-Z0-9.-]/g, "-")
      .replace(/\s+/g, "-")
      .toLowerCase()
      .substring(0, 255);
    
    // Create YYYY/MM folder structure
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const timestamp = Date.now();
    const storagePath = `uploads/${year}/${month}/${timestamp}-${sanitizedFilename}`;

    const { data, error } = await supabase.storage
      .from('images')
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: false
      });

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    if (!data) {
      throw new Error("Upload failed: No data returned");
    }

    const { data: publicUrlData } = supabase.storage
      .from('images')
      .getPublicUrl(storagePath);

    if (!publicUrlData?.publicUrl) {
      throw new Error("Failed to get public URL for uploaded file");
    }

    const media = await prisma.media.create({
      data: {
        filename: sanitizedFilename,
        url: publicUrlData.publicUrl,
        size: file.size,
        mimeType: file.type,
      },
    });

    revalidatePath("/admin/media");
    return media;
  } catch (error) {
    console.error("Error uploading media:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to upload file. Please try again.");
  }
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
