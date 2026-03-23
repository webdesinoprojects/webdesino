import prisma from "../lib/prisma";

/**
 * Delete blog posts from October 8, 2024 and before
 * Run with: npx tsx scripts/delete-old-blogs.ts
 */
async function deleteOldBlogs() {
  try {
    // Define the cutoff date: October 8, 2024 at 23:59:59
    const cutoffDate = new Date("2024-10-08T23:59:59.999Z");

    console.log(`🗑️  Deleting blog posts from ${cutoffDate.toLocaleDateString()} and before...`);

    // First, count how many blogs will be deleted
    const countToDelete = await prisma.blogPost.count({
      where: {
        date: {
          lte: cutoffDate,
        },
      },
    });

    if (countToDelete === 0) {
      console.log("✅ No blog posts found to delete.");
      return;
    }

    console.log(`📊 Found ${countToDelete} blog post(s) to delete.`);

    // Get the list of blogs that will be deleted (for logging)
    const blogsToDelete = await prisma.blogPost.findMany({
      where: {
        date: {
          lte: cutoffDate,
        },
      },
      select: {
        id: true,
        title: true,
        date: true,
        slug: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    console.log("\n📝 Blogs to be deleted:");
    blogsToDelete.forEach((blog) => {
      console.log(`  - ${blog.title} (${blog.date.toLocaleDateString()}) [${blog.slug}]`);
    });

    // Confirm deletion
    console.log("\n⚠️  This action cannot be undone!");
    console.log("Press Ctrl+C to cancel, or wait 5 seconds to proceed...\n");

    // Wait 5 seconds before proceeding
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Delete the blog posts
    const result = await prisma.blogPost.deleteMany({
      where: {
        date: {
          lte: cutoffDate,
        },
      },
    });

    console.log(`\n✅ Successfully deleted ${result.count} blog post(s).`);
  } catch (error) {
    console.error("❌ Error deleting blog posts:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
deleteOldBlogs();
