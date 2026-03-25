# Remove Duplicate Jammu & Kashmir State Entries

## Problem

There are two different state values in the database for Jammu & Kashmir:
1. `"Jammu and Kashmir"` - **27 locations** (WRONG - needs to be removed)
2. `"Jammu & Kashmir"` - **1537 locations** (CORRECT - keep this)

This causes duplicate entries in the admin panel state filter dropdown.

## Solution

A safe script that removes only the wrong entries (27 locations with "Jammu and Kashmir").

## Usage

### Step 1: Preview (Dry Run)
```bash
npm run remove-duplicate-jk
```

This will show:
- How many entries will be deleted
- Sample entries (first 10)
- Current vs final state counts

### Step 2: Review Output

The script will display something like:
```
📊 Current Database State:
------------------------------------------------------------
  "Jammu and Kashmir" (wrong):  27 entries
  "Jammu & Kashmir" (correct):  1537 entries

🗑️  Entries to be deleted (showing first 10):
------------------------------------------------------------
  1. Srinagar (web-development)
     Slug: best-web-development-company-in-srinagar
     State: "Jammu and Kashmir"

  2. Jammu (digital-marketing)
     Slug: best-digital-marketing-agency-in-jammu
     State: "Jammu and Kashmir"

  ... and 17 more entries
```

### Step 3: Execute (If Preview Looks Good)
```bash
npm run remove-duplicate-jk --execute
```

This will:
- Delete all entries with state = "Jammu and Kashmir"
- Keep all entries with state = "Jammu & Kashmir"
- Show final counts to verify success

## Safety Features

✅ **Dry-run by default** - Must explicitly use `--execute` flag
✅ **Preview before deletion** - Shows exactly what will be deleted
✅ **Targeted deletion** - Only deletes entries with wrong state value
✅ **Verification** - Shows before/after counts
✅ **No data loss** - Only removes duplicate entries, keeps correct ones

## Expected Result

After execution:
```
📊 Final Database State:
------------------------------------------------------------
  "Jammu and Kashmir" (wrong):  0 entries
  "Jammu & Kashmir" (correct):  1537 entries

✅ Success! All duplicate entries removed.
```

## What This Fixes

- ✅ Removes duplicate "Jammu & Kashmir" from state filter dropdown
- ✅ Cleans up database inconsistency
- ✅ Keeps all correct entries (1537 locations)
- ✅ Removes only wrong entries (27 locations)

## Rollback

If you need to rollback, you would need to restore from a database backup. 

**Recommendation**: Create a database backup before running with `--execute`.

```bash
# PostgreSQL backup example
pg_dump -U username -d database_name > backup_before_jk_cleanup.sql
```

## Technical Details

**What it does:**
```sql
DELETE FROM "LocationPage" WHERE state = 'Jammu and Kashmir';
```

**What it keeps:**
```sql
-- All entries with state = 'Jammu & Kashmir' remain untouched
```

## Verification

After running, check the admin panel:
1. Go to `/admin/locations`
2. Check the "Filter by state" dropdown
3. You should see only ONE "Jammu & Kashmir" entry

Or run:
```bash
npm run location-stats
```

This will show the breakdown by state.
