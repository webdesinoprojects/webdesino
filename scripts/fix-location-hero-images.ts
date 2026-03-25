import prisma from "../lib/prisma";

/**
 * Fix existing location pages by removing hero images
 * Run with: npx tsx scripts/fix-location-hero-images.ts
 */

async function fixLocationHeroImages() {
  try {
    console.log("🔧 Fixing hero images in existing location pages...\n");

    // Fetch all location pages
    const locations = await prisma.locationPage.findMany({
      select: {
        id: true,
        location: true,
        slug: true,
        content: true,
      },
    });

    console.log(`📊 Found ${locations.length} location pages\n`);

    let updatedCount = 0;
    let skippedCount = 0;

    for (const location of locations) {
      const content = location.content as any;

      // Check if hero section has an image
      if (content?.hero?.image) {
        console.log(`🔄 Updating: ${location.location} (${location.slug})`);
        console.log(`   Removing image: ${content.hero.image}`);

        // Remove the hero image
        const updatedContent = {
          ...content,
          hero: {
            ...content.hero,
            image: "", // Set to empty string
          },
        };

        // Update the database
        await prisma.locationPage.update({
          where: { id: location.id },
          data: { content: updatedContent },
        });

        console.log(`   ✅ Updated successfully\n`);
        updatedCount++;

        // Add small delay to avoid overwhelming the database
        await new Promise((resolve) => setTimeout(resolve, 50));
      } else {
        console.log(`⏭️  Skipped: ${location.location} (no hero image)`);
        skippedCount++;
      }
    }

    // Summary
    console.log("\n" + "=".repeat(60));
    console.log("📊 FIX SUMMARY");
    console.log("=".repeat(60));
    console.log(`✅ Updated: ${updatedCount} pages`);
    console.log(`⏭️  Skipped: ${skippedCount} pages (no hero image)`);
    console.log(`📈 Total processed: ${locations.length} pages`);
    console.log("=".repeat(60) + "\n");

    if (updatedCount > 0) {
      console.log("✨ Hero images removed successfully!");
      console.log("💡 Pages will now display centered text without images\n");
    }
  } catch (error) {
    console.error("❌ Error fixing hero images:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
fixLocationHeroImages();
