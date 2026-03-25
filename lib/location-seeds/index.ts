/**
 * Location name lists per state for bulk insert + backfill.
 *
 * Data lives in `merged.ts` (you can split into `states/*.ts` later and re-export from here).
 * Add new state labels in `lib/location-states.ts` first, then add the key + names in `merged.ts`.
 *
 * One-shot after editing seeds:
 *   npm run seed:locations
 *
 * Single state only (key must match merged.ts, e.g. "Bihar"):
 *   npm run bulk-insert-locations -- --execute --state=Bihar
 *   npm run backfill-location-states -- --execute --state=Bihar
 */
export { LOCATIONS_BY_STATE } from "./merged";
