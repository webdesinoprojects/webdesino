/**
 * Sets LocationPage.state from lib/location-seeds by matching the "location" display name.
 * Use when rows were inserted before state was set, or bulk runs skipped existing slugs (left as default Delhi).
 *
 * Usage:
 *   npx ts-node --compiler-options {\"module\":\"CommonJS\"} scripts/backfill-location-states.ts
 *   npx ts-node --compiler-options {\"module\":\"CommonJS\"} scripts/backfill-location-states.ts --execute
 *   ... --execute --state=Bihar   # one state only
 */

import "dotenv/config";
import prisma from "../lib/prisma";
import { Prisma } from "../lib/generated/prisma";
import { LOCATIONS_BY_STATE } from "../lib/location-seeds";

const IN_CHUNK = 120;

function stateFromArgv(): string | null {
  const raw = process.argv.find((a) => a.startsWith("--state="));
  if (!raw) return null;
  return raw.slice("--state=".length).trim() || null;
}

async function main() {
  const execute = process.argv.includes("--execute");
  const onlyState = stateFromArgv();

  if (onlyState && LOCATIONS_BY_STATE[onlyState] === undefined) {
    console.error(
      `Unknown --state="${onlyState}". Valid keys: ${Object.keys(LOCATIONS_BY_STATE).join(", ")}`
    );
    process.exit(1);
  }

  console.log("=".repeat(64));
  console.log("Backfill LocationPage.state from lib/location-seeds");
  console.log(execute ? "MODE: EXECUTE (writes to DB)" : "MODE: DRY-RUN (no writes)");
  if (onlyState) console.log(`STATE FILTER: ${onlyState}`);
  console.log("=".repeat(64));

  let batches = 0;
  let rowsAffected = 0;

  for (const [state, rawNames] of Object.entries(LOCATIONS_BY_STATE)) {
    if (onlyState && state !== onlyState) continue;
    const names = [...new Set(rawNames.map((n) => n.trim()).filter(Boolean))];
    for (let i = 0; i < names.length; i += IN_CHUNK) {
      const chunk = names.slice(i, i + IN_CHUNK);
      const fragments = chunk.map((n) => Prisma.sql`${n}`);
      const sql = Prisma.sql`
        UPDATE "LocationPage"
        SET "state" = ${state}
        WHERE "location" IN (${Prisma.join(fragments, ", ")})
      `;
      batches += 1;
      if (execute) {
        const n = await prisma.$executeRaw(sql);
        rowsAffected += Number(n);
      }
    }
  }

  console.log(`Batches run: ${batches}`);
  if (execute) {
    console.log(`Rows updated (sum of batch counts): ${rowsAffected}`);
  } else {
    console.log("Dry-run only. Re-run with --execute to apply updates.");
  }
  console.log("=".repeat(64));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
