import prisma from "../lib/prisma";

/**
 * Check for blog posts with invalid slugs and optionally fix them
 * Run with: npx tsx scripts/check-blog-slugs.ts
 */

function isValidSlug(slug: string): boolean {
  // Valid slug should only contain lowercase letters, numbers, and hyphens
  return /^[a-z0-9-]+$/.test(slug);
}

function generateValidSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    // Replace special characters and spaces with hyphens
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    // Remove multiple consecutive hyphens
    .replace(/-+/g, "-")
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, "");
}

async function checkBlogSlugs() {
  try {
    console.log("🔍 Checking blog post slugs...\n");

    // Fetch all blog posts
    const allBlogs = await prisma.blogPost.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(`📊 Total blog posts: ${allBlogs.length}\n`);

    // Check for invalid slugs
    const invalidBlogs = allBlogs.filter((blog) => !isValidSlug(blog.slug));

    if (invalidBlogs.length === 0) {
      console.log("✅ All blog slugs are valid!");
      return;
    }

    console.log(`⚠️  Found ${invalidBlogs.length} blog(s) with invalid slugs:\n`);

    invalidBlogs.forEach((blog, index) => {
      const suggestedSlug = generateValidSlug(blog.title);
      console.log(`${index + 1}. "${blog.title}"`);
      console.log(`   Current slug:   ${blog.slug}`);
      console.log(`   Suggested slug: ${suggestedSlug}`);
      console.log(`   Created: ${blog.createdAt.toLocaleDateString()}`);
      console.log(`   ID: ${blog.id}\n`);
    });

    // Ask if user wants to fix them
    console.log("🔧 Do you want to fix these slugs automatically?");
    console.log("Press Ctrl+C to cancel, or wait 5 seconds to proceed...\n");

    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log("🔄 Fixing invalid slugs...\n");

    let fixedCount = 0;
    for (const blog of invalidBlogs) {
      const newSlug = generateValidSlug(blog.title);
      
      try {
        await prisma.blogPost.update({
          where: { id: blog.id },
          data: { slug: newSlug },
        });
        
        console.log(`✅ Fixed: "${blog.title}"`);
        console.log(`   ${blog.slug} → ${newSlug}\n`);
        fixedCount++;
      } catch (error: any) {
        if (error.code === "P2002") {
          console.log(`❌ Slug conflict for "${blog.title}"`);
          console.log(`   "${newSlug}" already exists. Skipping...\n`);
        } else {
          console.log(`❌ Error fixing "${blog.title}": ${error.message}\n`);
        }
      }
    }

    console.log(`\n✅ Successfully fixed ${fixedCount} out of ${invalidBlogs.length} blog slug(s).`);

    if (fixedCount < invalidBlogs.length) {
      console.log("\n⚠️  Some slugs couldn't be fixed due to conflicts.");
      console.log("You may need to manually update these in the admin panel.");
    }

  } catch (error) {
    console.error("❌ Error checking blog slugs:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
checkBlogSlugs();
