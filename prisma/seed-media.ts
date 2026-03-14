
import { PrismaClient } from "../lib/generated/prisma";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  
  if (!fs.existsSync(uploadsDir)) {
    //console.log("Uploads directory not found");
    return;
  }

  //console.log("Scanning uploads directory...");
  
  const files: string[] = [];

  function scanDir(dir: string) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        scanDir(fullPath);
      } else {
        // Filter for image files or common media types if needed
        if (!item.startsWith(".")) {
            files.push(fullPath);
        }
      }
    }
  }

  scanDir(uploadsDir);

  //console.log(`Found ${files.length} files. Seeding database...`);

  let count = 0;
  for (const filePath of files) {
    const relativePath = path.relative(path.join(process.cwd(), "public"), filePath);
    // Ensure forward slashes for URL
    const url = "/" + relativePath.split(path.sep).join("/");
    const filename = path.basename(filePath);
    const stat = fs.statSync(filePath);

    // Check if exists
    const existing = await prisma.media.findUnique({
      where: { url },
    });

    if (!existing) {
      await prisma.media.create({
        data: {
          filename,
          url,
          size: stat.size,
          mimeType: getMimeType(filename),
        },
      });
      count++;
      if (count % 100 === 0) {
          //console.log(`Seeded ${count} files...`);
      }
    }
  }

  //console.log(`Seeding complete. Added ${count} new files.`);
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
