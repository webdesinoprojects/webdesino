/**
 * Location Pages Statistics Script
 * 
 * Shows statistics about existing location pages in the database.
 * Useful for monitoring and verification after bulk creation.
 * 
 * Usage: ts-node --compiler-options {"module":"CommonJS"} scripts/location-stats.ts
 */

import { PrismaClient } from "../lib/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("=".repeat(60));
  console.log("Location Pages Statistics");
  console.log("=".repeat(60));
  console.log();

  // Total count
  const totalCount = await prisma.locationPage.count();
  console.log(`📊 Total Location Pages: ${totalCount}`);
  console.log();

  // Count by service focus
  console.log("📈 Breakdown by Service Focus:");
  console.log("-".repeat(60));
  
  const serviceFocuses = [
    "web-development",
    "digital-marketing",
    "seo-services",
    "graphic-designing",
    "content-writing",
    "all-services",
  ];

  for (const focus of serviceFocuses) {
    const count = await prisma.locationPage.count({
      where: { serviceFocus: focus },
    });
    console.log(`  ${focus.padEnd(20)}: ${count}`);
  }
  console.log();

  // Recent additions
  console.log("🕐 Recently Created (Last 10):");
  console.log("-".repeat(60));
  
  const recent = await prisma.locationPage.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    select: {
      location: true,
      serviceFocus: true,
      slug: true,
      createdAt: true,
    },
  });

  recent.forEach((page, index) => {
    const date = page.createdAt.toISOString().split('T')[0];
    console.log(`  ${index + 1}. ${page.location} (${page.serviceFocus}) - ${date}`);
  });
  console.log();

  // Unique locations
  const uniqueLocations = await prisma.locationPage.groupBy({
    by: ['location'],
    _count: {
      location: true,
    },
  });
  
  console.log(`📍 Unique Locations: ${uniqueLocations.length}`);
  console.log();

  // Sample slugs
  console.log("🔗 Sample Slugs:");
  console.log("-".repeat(60));
  
  const samples = await prisma.locationPage.findMany({
    take: 5,
    select: { slug: true, location: true },
  });

  samples.forEach((page, index) => {
    console.log(`  ${index + 1}. ${page.slug}`);
  });
  console.log();

  console.log("=".repeat(60));
}

main()
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
