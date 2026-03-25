# Quick Start: Bulk Location Pages

## TL;DR

```bash
# Preview what will be created (safe, no changes)
npm run bulk-locations

# Actually create the pages
npm run bulk-locations --execute
```

## What You Get

- **1,050 location pages** (175 locations × 6 services)
- SEO-optimized content for each page
- Unique slugs like:
  - `best-web-development-company-in-delhi`
  - `best-seo-services-in-mumbai`
  - `best-digital-marketing-agency-in-bangalore`

## Before Running

1. ✅ Backup your database (recommended)
2. ✅ Check `.env` has correct database credentials
3. ✅ Run dry-run first to preview

## Step-by-Step

### Step 1: Preview (Dry Run)
```bash
npm run bulk-locations
```

This shows you:
- How many pages will be created
- Which ones already exist (will be skipped)
- Any potential errors

### Step 2: Execute
```bash
npm run bulk-locations --execute
```

This actually creates the pages.

### Step 3: Verify
Check your database or admin panel to see the new location pages.

## Customization

Want to add more locations? Edit `scripts/bulk-create-locations.ts`:

```typescript
const LOCATIONS_BY_STATE = {
  "Your State": [
    "City 1",
    "City 2",
    // Add more cities here
  ],
};
```

Then run the script again. It will only create new pages, skipping existing ones.

## Safety

- ✅ **Idempotent**: Run multiple times safely
- ✅ **No duplicates**: Automatically skips existing pages
- ✅ **No data loss**: Only creates, never updates or deletes
- ✅ **Batch processing**: Won't crash with large datasets
- ✅ **Error handling**: Continues even if some entries fail

## Need Help?

See `scripts/README.md` for detailed documentation.
