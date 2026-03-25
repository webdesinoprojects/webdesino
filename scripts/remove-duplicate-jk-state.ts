/**
 * Remove Duplicate Jammu & Kashmir State Entries
 * 
 * This script identifies and removes the duplicate "Jammu and Kashmir" state entry
 * that has only 27 locations, keeping the correct "Jammu & Kashmir" entry with 1537 locations.
 * 
 * SAFETY:
 * - Dry-run mode by default (no deletions)
 * - Shows exactly what will be deleted before executing
 * - Only deletes entries with the wrong state value
 * 
 * Usage:
 *   npm run remove-duplicate-jk              # Dry run (preview only)
 *   npm run remove-duplicate-jk -- --execute # Actually delete (note the -- before --execute)
 */

import { PrismaClient } from "../lib/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const args = process.argv.slice(2);
  const execute = args.includes("--execute") || args.includes("execute");

  console.log("=".repeat(60));
  console.log("Remove Duplicate Jammu & Kashmir State Entries");
  console.log("=".repeat(60));
  console.log();
  console.log("Arguments received:", args);
  console.log("Execute mode:", execute);
  console.log();

  if (execute) {
    console.log("⚠️  EXECUTE MODE - Entries will be deleted");
  } else {
    console.log("🔍 DRY RUN MODE - No data will be deleted");
    console.log("   Run with: npm run remove-duplicate-jk -- --execute");
    console.log("   (note the -- before --execute)");
  }
  console.log();

  // Check both state values
  const wrongStateCount = await prisma.locationPage.count({
    where: { state: "Jammu and Kashmir" }
  });

  const correctStateCount = await prisma.locationPage.count({
    where: { state: "Jammu & Kashmir" }
  });

  console.log("📊 Current Database State:");
  console.log("-".repeat(60));
  console.log(`  "Jammu and Kashmir" (wrong):  ${wrongStateCount} entries`);
  console.log(`  "Jammu & Kashmir" (correct):  ${correctStateCount} entries`);
  console.log();

  if (wrongStateCount === 0) {
    console.log("✅ No duplicate entries found. Database is clean!");
    console.log("=".repeat(60));
    return;
  }

  // Get sample entries to show what will be deleted
  const samplesToDelete = await prisma.locationPage.findMany({
    where: { state: "Jammu and Kashmir" },
    select: {
      id: true,
      location: true,
      slug: true,
      serviceFocus: true,
      state: true,
    },
    take: 10,
  });

  console.log("🗑️  Entries to be deleted (showing first 10):");
  console.log("-".repeat(60));
  samplesToDelete.forEach((entry, index) => {
    console.log(`  ${index + 1}. ${entry.location} (${entry.serviceFocus})`);
    console.log(`     Slug: ${entry.slug}`);
    console.log(`     State: "${entry.state}"`);
    console.log();
  });

  if (wrongStateCount > 10) {
    console.log(`  ... and ${wrongStateCount - 10} more entries`);
    console.log();
  }

  if (!execute) {
    console.log("💡 This was a dry run.");
    console.log("   To delete, run: npm run remove-duplicate-jk -- --execute");
    console.log("   (note the -- before --execute)");
    console.log("=".repeat(60));
    return;
  }

  // Execute deletion
  console.log("🔄 Deleting entries...");
  console.log();

  const deleteResult = await prisma.locationPage.deleteMany({
    where: { state: "Jammu and Kashmir" }
  });

  console.log("✅ Deletion complete!");
  console.log("-".repeat(60));
  console.log(`  Deleted: ${deleteResult.count} entries`);
  console.log();

  // Verify final state
  const finalWrongCount = await prisma.locationPage.count({
    where: { state: "Jammu and Kashmir" }
  });

  const finalCorrectCount = await prisma.locationPage.count({
    where: { state: "Jammu & Kashmir" }
  });

  console.log("📊 Final Database State:");
  console.log("-".repeat(60));
  console.log(`  "Jammu and Kashmir" (wrong):  ${finalWrongCount} entries`);
  console.log(`  "Jammu & Kashmir" (correct):  ${finalCorrectCount} entries`);
  console.log();

  if (finalWrongCount === 0) {
    console.log("✅ Success! All duplicate entries removed.");
  } else {
    console.log("⚠️  Warning: Some entries still remain. Please investigate.");
  }

  console.log("=".repeat(60));
}

main()
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
