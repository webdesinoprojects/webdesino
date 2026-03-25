import prisma from "../lib/prisma";

/**
 * Update existing location pages with state field
 * Run with: npx tsx scripts/update-location-states.ts
 */

async function updateLocationStates() {
  console.log("🔄 Updating location states...\n");

  try {
    // Get all locations without state
    const locations = await prisma.locationPage.findMany({
      where: {
        state: "",
      },
      select: { id: true, location: true }
    });

    console.log(`📊 Found ${locations.length} locations to update\n`);

    let updated = 0;
    for (const loc of locations) {
      await prisma.locationPage.update({
        where: { id: loc.id },
        data: { state: "Delhi NCR" }
      });
      updated++;
      if (updated % 100 === 0) {
        console.log(`✅ Updated ${updated}/${locations.length} locations...`);
      }
    }

    console.log(`\n✅ Successfully updated ${updated} locations with state "Delhi NCR"`);
  } catch (error) {
    console.error("❌ Error updating locations:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateLocationStates();
