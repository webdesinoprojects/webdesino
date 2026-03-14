
import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from "../lib/generated/prisma";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Or SERVICE_ROLE_KEY if you have RLS enabled and need bypass

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const prisma = new PrismaClient();

async function main() {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  
  if (!fs.existsSync(uploadsDir)) {
    //console.log("Uploads directory not found");
    return;
  }

  //console.log("Scanning uploads directory for migration...");
  
  const files: string[] = [];

  function scanDir(dir: string) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        scanDir(fullPath);
      } else {
        if (!item.startsWith(".")) {
            files.push(fullPath);
        }
      }
    }
  }

  scanDir(uploadsDir);
  //console.log(`Found ${files.length} files to migrate.`);

  let successCount = 0;
  let errorCount = 0;

  for (const filePath of files) {
    const relativePath = path.relative(path.join(process.cwd(), "public"), filePath);
    // Convert windows backslashes to forward slashes
    const normalizedPath = relativePath.split(path.sep).join("/");
    const fileBuffer = fs.readFileSync(filePath);
    const contentType = getMimeType(filePath);

    // Upload to Supabase
    // We use the same path structure: uploads/2024/05/image.jpg
    // Note: Supabase storage paths shouldn't start with /
    const storagePath = normalizedPath.startsWith("/") ? normalizedPath.substring(1) : normalizedPath;

    //console.log(`Uploading: ${storagePath}`);

    const { data, error } = await supabase.storage
      .from('images')
      .upload(storagePath, fileBuffer, {
        contentType,
        upsert: true
      });

    if (error) {
      console.error(`Failed to upload ${storagePath}:`, error.message);
      errorCount++;
      continue;
    }

    // Get Public URL
    const { data: publicUrlData } = supabase.storage
      .from('images')
      .getPublicUrl(storagePath);
    
    const publicUrl = publicUrlData.publicUrl;

    // Update Prisma Database
    // We find the record by the OLD local URL (e.g. /uploads/...) and update it to the NEW Supabase URL
    const oldUrl = "/" + storagePath;
    
    try {
        // Try to find by old URL first
        const existing = await prisma.media.findUnique({
            where: { url: oldUrl }
        });

        if (existing) {
            await prisma.media.update({
                where: { id: existing.id },
                data: { url: publicUrl }
            });
        } else {
            // If not found (maybe seeded differently?), create it
            await prisma.media.create({
                data: {
                    filename: path.basename(filePath),
                    url: publicUrl,
                    size: fs.statSync(filePath).size,
                    mimeType: contentType
                }
            });
        }
        successCount++;
    } catch (dbError) {
        console.error(`Database error for ${storagePath}:`, dbError);
        errorCount++;
    }
  }

  //console.log(`Migration complete.`);
  //console.log(`Success: ${successCount}`);
  //console.log(`Errors: ${errorCount}`);
}

function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".gif":
      return "image/gif";
    case ".webp":
      return "image/webp";
    case ".svg":
      return "image/svg+xml";
    case ".pdf":
      return "application/pdf";
    case ".avif":
      return "image/avif";
    default:
      return "application/octet-stream";
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
