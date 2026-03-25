/**
 * Bulk Location Pages Creation Script
 * 
 * This script creates location pages for multiple services using the existing
 * backend logic. It's designed to handle ~50,000 entries efficiently with:
 * - Duplicate detection (idempotent)
 * - Batch processing
 * - Progress tracking
 * - Dry-run mode
 * - Memory-efficient queries
 * 
 * Usage:
 *   npm run bulk-locations           # Dry run (preview only)
 *   npm run bulk-locations --execute # Actually create pages
 */

import { PrismaClient } from "../lib/generated/prisma";
import { generateLocationContent, SERVICE_FOCUS_OPTIONS } from "../lib/location-templates";
import { DEFAULT_LOCATION_STATE } from "../lib/location-states";
import { LOCATIONS_BY_STATE as LOCATION_SEEDS } from "../lib/location-seeds";

const prisma = new PrismaClient();

// Same scope as before lib/location-seeds merged AP: J&K only (use bulk-insert-locations for AP).
const LOCATIONS_BY_STATE: Record<string, string[]> = {
  "Jammu and Kashmir": LOCATION_SEEDS["Jammu and Kashmir"] ?? [],
};

// Configuration
const BATCH_SIZE = 50; // Process 50 locations at a time
const DELAY_BETWEEN_BATCHES = 100; // 100ms delay to avoid overload

// Service focuses to create for each location
const SERVICE_FOCUSES = SERVICE_FOCUS_OPTIONS.map(opt => opt.value);

interface LocationEntry {
  location: string;
  serviceFocus: string;
  slug: string;
  state: string;
}

interface ProcessResult {
  total: number;
  created: number;
  skipped: number;
  failed: number;
  errors: Array<{ location: string; service: string; error: string }>;
}

/**
 * Generate all location-service combinations
 */
function generateLocationEntries(): LocationEntry[] {
  const entries: LocationEntry[] = [];
  
  for (const [state, locations] of Object.entries(LOCATIONS_BY_STATE)) {
    for (const location of locations) {
      for (const serviceFocus of SERVICE_FOCUSES) {
        const content = generateLocationContent(location, serviceFocus);
        entries.push({
          location,
          serviceFocus,
          slug: content.slug,
          state: state || DEFAULT_LOCATION_STATE,
        });
      }
    }
  }
  
  return entries;
}

/**
 * Check if a location page already exists by slug
 */
async function locationExists(slug: string): Promise<boolean> {
  const existing = await prisma.locationPage.findUnique({
    where: { slug },
    select: { id: true }, // Only select ID for efficiency
  });
  return !!existing;
}

/**
 * Create a single location page
 */
async function createLocationPage(entry: LocationEntry): Promise<void> {
  const content = generateLocationContent(entry.location, entry.serviceFocus);
  
  await prisma.locationPage.create({
    data: {
      location: entry.location,
      slug: content.slug,
      title: content.title,
      description: content.description,
      serviceFocus: entry.serviceFocus,
      state: entry.state,
      content: content as any, // JSON type
    },
  });
}

/**
 * Process a batch of location entries
 */
async function processBatch(
  entries: LocationEntry[],
  dryRun: boolean
): Promise<{ created: number; skipped: number; failed: number; errors: Array<{ location: string; service: string; error: string }> }> {
  let created = 0;
  let skipped = 0;
  let failed = 0;
  const errors: Array<{ location: string; service: string; error: string }> = [];

  // Check which entries already exist (batch query for efficiency)
  const slugs = entries.map(e => e.slug);
  const existingSlugs = await prisma.locationPage.findMany({
    where: { slug: { in: slugs } },
    select: { slug: true },
  });
  const existingSlugSet = new Set(existingSlugs.map(e => e.slug));

  for (const entry of entries) {
    try {
      if (existingSlugSet.has(entry.slug)) {
        skipped++;
        continue;
      }

      if (!dryRun) {
        await createLocationPage(entry);
      }
      created++;
    } catch (error) {
      failed++;
      errors.push({
        location: entry.location,
        service: entry.serviceFocus,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return { created, skipped, failed, errors };
}

/**
 * Sleep for specified milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Main execution function
 */
async function main() {
  const args = process.argv.slice(2);
  const dryRun = !args.includes("--execute");

  console.log("=".repeat(60));
  console.log("Bulk Location Pages Creation Script");
  console.log("=".repeat(60));
  console.log();

  if (dryRun) {
    console.log("🔍 DRY RUN MODE - No data will be created");
    console.log("   Run with --execute flag to actually create pages");
    console.log();
  } else {
    console.log("⚠️  EXECUTE MODE - Pages will be created in database");
    console.log();
  }

  // Generate all entries
  console.log("📋 Generating location entries...");
  const allEntries = generateLocationEntries();
  console.log(`   Total entries to process: ${allEntries.length}`);
  console.log();

  // Calculate batches
  const totalBatches = Math.ceil(allEntries.length / BATCH_SIZE);
  console.log(`📦 Processing in ${totalBatches} batches of ${BATCH_SIZE}`);
  console.log();

  const result: ProcessResult = {
    total: allEntries.length,
    created: 0,
    skipped: 0,
    failed: 0,
    errors: [],
  };

  // Process in batches
  for (let i = 0; i < totalBatches; i++) {
    const start = i * BATCH_SIZE;
    const end = Math.min(start + BATCH_SIZE, allEntries.length);
    const batch = allEntries.slice(start, end);

    console.log(`Processing batch ${i + 1}/${totalBatches} (${start + 1}-${end}/${allEntries.length})...`);

    const batchResult = await processBatch(batch, dryRun);
    result.created += batchResult.created;
    result.skipped += batchResult.skipped;
    result.failed += batchResult.failed;
    result.errors.push(...batchResult.errors);

    // Progress update
    const progress = ((end / allEntries.length) * 100).toFixed(1);
    console.log(`   ✓ Created: ${batchResult.created}, Skipped: ${batchResult.skipped}, Failed: ${batchResult.failed}`);
    console.log(`   Progress: ${progress}% (${end}/${allEntries.length})`);
    console.log();

    // Delay between batches (except for last batch)
    if (i < totalBatches - 1) {
      await sleep(DELAY_BETWEEN_BATCHES);
    }
  }

  // Final summary
  console.log("=".repeat(60));
  console.log("Summary");
  console.log("=".repeat(60));
  console.log(`Total entries:    ${result.total}`);
  console.log(`✓ Created:        ${result.created}`);
  console.log(`⊘ Skipped:        ${result.skipped} (already exist)`);
  console.log(`✗ Failed:         ${result.failed}`);
  console.log();

  if (result.errors.length > 0) {
    console.log("Errors:");
    console.log("-".repeat(60));
    result.errors.forEach(err => {
      console.log(`  ${err.location} (${err.service}): ${err.error}`);
    });
    console.log();
  }

  if (dryRun && result.created > 0) {
    console.log("💡 This was a dry run. Run with --execute to create pages.");
  } else if (!dryRun && result.created > 0) {
    console.log("✅ Location pages created successfully!");
  }

  console.log("=".repeat(60));
}

// Execute
main()
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
