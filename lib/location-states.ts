/**
 * Location "state/UT" for admin filtering and bulk imports.
 * - DB default for new rows: {@link DEFAULT_LOCATION_STATE} (catch-all until you assign a real state).
 * - When you add a new region: add a line here and use the same `value` as the key in bulk script `LOCATIONS_BY_STATE`.
 * - Any `state` value that exists in the DB but is not listed here still appears in the filter (merged on the locations page).
 */

export const DEFAULT_LOCATION_STATE = "Delhi";

export const LOCATION_STATE_OPTIONS: { value: string; label: string }[] = [
  { value: "Delhi", label: "Delhi (default / rest)" },
  { value: "Jammu & Kashmir", label: "Jammu & Kashmir" },
  { value: "Andhra Pradesh", label: "Andhra Pradesh" },
  { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
  { value: "Assam", label: "Assam" },
  { value: "Bihar", label: "Bihar" },
];

export function labelForLocationState(value: string | null | undefined): string {
  if (value == null || value === "") {
    return (
      LOCATION_STATE_OPTIONS.find((o) => o.value === DEFAULT_LOCATION_STATE)
        ?.label ?? DEFAULT_LOCATION_STATE
    );
  }
  const found = LOCATION_STATE_OPTIONS.find((o) => o.value === value);
  return found?.label ?? value;
}

/** Curated labels + any extra values already stored in DB → sorted dropdown options */
export function mergeStateFilterOptions(fromDb: string[]): {
  value: string;
  label: string;
}[] {
  const map = new Map<string, string>();
  for (const o of LOCATION_STATE_OPTIONS) {
    map.set(o.value, o.label);
  }
  for (const v of fromDb) {
    if (v && !map.has(v)) {
      map.set(v, v);
    }
  }
  return Array.from(map.entries())
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => a.label.localeCompare(b.label, "en"));
}
