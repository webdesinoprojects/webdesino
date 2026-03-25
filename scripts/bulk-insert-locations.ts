/**
 * Bulk insert location pages - same DB payload as admin createLocation (lib/actions.ts).
 * Uses generateLocationContent from lib/location-templates.ts (no duplicated logic).
 *
 * Services: all SERVICE_FOCUS_OPTIONS except "all-services" (same slug pattern as web-development).
 *
 * Usage:
 *   npm run bulk-insert-locations              # dry-run (no inserts; still reads DB for skip counts)
 *   npm run bulk-insert-locations -- --execute # insert all states from lib/location-seeds
 *   npm run bulk-insert-locations -- --execute --state=Bihar   # one state only
 *
 * Edit lib/location-seeds/merged.ts (LOCATIONS_BY_STATE), then run.
 */

import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma";
import {
  generateLocationContent,
  SERVICE_FOCUS_OPTIONS,
} from "../lib/location-templates";
import { DEFAULT_LOCATION_STATE } from "../lib/location-states";
import { LOCATIONS_BY_STATE } from "../lib/location-seeds";

const prisma = new PrismaClient();


// ---------------------------------------------------------------------------
// Tuning (safe defaults for ~50k rows)
// ---------------------------------------------------------------------------
const BATCH_SIZE = 80;
const DELAY_MS_BETWEEN_BATCHES = 100;

function stateFromArgv(): string | null {
  const raw = process.argv.find((a) => a.startsWith("--state="));
  if (!raw) return null;
  return raw.slice("--state=".length).trim() || null;
}

/** Mirrors admin "Auto-Generate": same fields as createLocation -> prisma.locationPage.create */
function rowFromGenerated(
  locationDisplayName: string,
  serviceFocus: string,
  state: string
): {
  location: string;
  slug: string;
  title: string;
  description: string;
  serviceFocus: string;
  state: string;
  content: object;
} {
  const full = generateLocationContent(locationDisplayName, serviceFocus);
  const { hero, story, leadingCompany, services } = full;
  return {
    location: locationDisplayName,
    slug: full.slug,
    title: full.title,
    description: full.description,
    serviceFocus,
    state: state || DEFAULT_LOCATION_STATE,
    content: { hero, story, leadingCompany, services },
  };
}

function serviceFocusesForBulk(): string[] {
  return SERVICE_FOCUS_OPTIONS.filter((o) => o.value !== "all-services").map(
    (o) => o.value
  );
}

function buildPlannedRows(): {
  rows: ReturnType<typeof rowFromGenerated>[];
  skippedPlanDuplicates: number;
} {
  const onlyState = stateFromArgv();
  if (onlyState && LOCATIONS_BY_STATE[onlyState] === undefined) {
    console.error(
      `Unknown --state="${onlyState}". Valid keys: ${Object.keys(LOCATIONS_BY_STATE).join(", ")}`
    );
    process.exit(1);
  }

  const services = serviceFocusesForBulk();
  const slugSeen = new Set<string>();
  const rows: ReturnType<typeof rowFromGenerated>[] = [];
  let skippedPlanDuplicates = 0;

  for (const [stateKey, names] of Object.entries(LOCATIONS_BY_STATE)) {
    if (onlyState && stateKey !== onlyState) continue;
    for (const raw of names) {
      const locationDisplayName = raw.trim();
      if (!locationDisplayName) continue;

      for (const serviceFocus of services) {
        const row = rowFromGenerated(
          locationDisplayName,
          serviceFocus,
          stateKey
        );
        if (slugSeen.has(row.slug)) {
          skippedPlanDuplicates++;
          continue;
        }
        slugSeen.add(row.slug);
        rows.push(row);
      }
    }
  }

  return { rows, skippedPlanDuplicates };
}

async function main() {
  const execute = process.argv.includes("--execute");
  const onlyState = stateFromArgv();

  console.log("=".repeat(64));
  console.log("Bulk insert location pages");
  console.log(execute ? "MODE: EXECUTE (will write to database)" : "MODE: DRY-RUN (no writes)");
  if (onlyState) console.log(`STATE FILTER: ${onlyState}`);
  console.log("=".repeat(64));

  const { rows: planned, skippedPlanDuplicates } = buildPlannedRows();
  const total = planned.length;

  if (total === 0) {
    console.log("No rows to process. Add locations to LOCATIONS_BY_STATE.");
    return;
  }

  console.log(`Planned rows: ${total}`);
  if (skippedPlanDuplicates > 0) {
    console.log(
      `Skipped ${skippedPlanDuplicates} duplicate slug(s) while building plan (input duplicates / collisions)`
    );
  }
  console.log(`Batch size: ${BATCH_SIZE}, delay: ${DELAY_MS_BETWEEN_BATCHES}ms`);
  console.log();

  let processed = 0;
  let inserted = 0;
  let skippedExisting = 0;
  let failed = 0;
  const failures: { slug: string; reason: string }[] = [];

  const batchCount = Math.ceil(total / BATCH_SIZE);

  for (let b = 0; b < batchCount; b++) {
    const start = b * BATCH_SIZE;
    const chunk = planned.slice(start, start + BATCH_SIZE);
    const slugs = chunk.map((r) => r.slug);

    const existing = await prisma.locationPage.findMany({
      where: { slug: { in: slugs } },
      select: { slug: true },
    });
    const existingSet = new Set(existing.map((e) => e.slug));
    const toWrite = chunk.filter((r) => !existingSet.has(r.slug));
    skippedExisting += chunk.length - toWrite.length;

    if (!execute) {
      inserted += toWrite.length;
      processed += chunk.length;
      console.log(
        `Batch ${b + 1}/${batchCount} â€” progress ${processed}/${total} (dry-run: would insert ${toWrite.length}, skip existing ${chunk.length - toWrite.length})`
      );
      continue;
    }

    if (toWrite.length === 0) {
      processed += chunk.length;
      console.log(
        `Batch ${b + 1}/${batchCount} â€” progress ${processed}/${total} (all skipped â€” already exist)`
      );
      if (b < batchCount - 1 && DELAY_MS_BETWEEN_BATCHES > 0) {
        await new Promise((r) => setTimeout(r, DELAY_MS_BETWEEN_BATCHES));
      }
      continue;
    }

    try {
      const result = await prisma.locationPage.createMany({
        data: toWrite,
        skipDuplicates: true,
      });
      inserted += result.count;
      if (result.count < toWrite.length) {
        const gap = toWrite.length - result.count;
        skippedExisting += gap;
        console.warn(
          `Batch ${b + 1}: createMany inserted ${result.count}/${toWrite.length} (${gap} treated as skip/duplicate)`
        );
      } else {
        console.log(
          `Batch ${b + 1}: inserted ${result.count} row(s) (createMany)`
        );
      }
    } catch (err) {
      console.warn(
        `Batch ${b + 1}: createMany failed, falling back per-row â€”`,
        err instanceof Error ? err.message : err
      );
      let fallbackOk = 0;
      for (const row of toWrite) {
        try {
          await prisma.locationPage.create({ data: row });
          inserted += 1;
          fallbackOk += 1;
        } catch (e) {
          failed += 1;
          const reason =
            e instanceof Error ? e.message : typeof e === "string" ? e : "Unknown error";
          failures.push({ slug: row.slug, reason });
        }
      }
      console.log(
        `Batch ${b + 1}: per-row fallback inserted ${fallbackOk}, failed ${toWrite.length - fallbackOk}`
      );
    }

    processed += chunk.length;
    console.log(`Batch ${b + 1}/${batchCount} â€” progress ${processed}/${total}`);

    if (b < batchCount - 1 && DELAY_MS_BETWEEN_BATCHES > 0) {
      await new Promise((r) => setTimeout(r, DELAY_MS_BETWEEN_BATCHES));
    }
  }

  console.log();
  console.log("-".repeat(64));
  console.log("Summary");
  console.log("-".repeat(64));
  console.log(`Planned rows:              ${total}`);
  console.log(`Skipped (plan duplicates): ${skippedPlanDuplicates}`);
  console.log(`Skipped (already in DB):   ${skippedExisting}`);
  if (execute) {
    console.log(`Inserted:                  ${inserted}`);
    console.log(`Failed:                    ${failed}`);
  } else {
    console.log(`Would insert (new slugs):  ${inserted} (dry-run estimate)`);
  }

  if (failures.length > 0) {
    console.log();
    console.log("Failures (first 50):");
    failures.slice(0, 50).forEach((f) => console.log(`  ${f.slug} â€” ${f.reason}`));
    if (failures.length > 50) {
      console.log(`  ... and ${failures.length - 50} more`);
    }
  }

  if (!execute) {
    console.log();
    console.log("Dry-run only. Pass --execute after review to insert.");
  }

  console.log("=".repeat(64));
}

main()
  .catch((e) => {
    console.error("Fatal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
