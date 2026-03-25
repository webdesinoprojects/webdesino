# Bulk Location Pages Creation Script

This script efficiently creates location pages for multiple services using the existing backend infrastructure.

## Features

- ✅ **Idempotent**: Safe to run multiple times without creating duplicates
- ✅ **Batch Processing**: Processes entries in chunks to avoid memory issues
- ✅ **Duplicate Detection**: Checks existing slugs before insertion
- ✅ **Dry Run Mode**: Preview changes before executing
- ✅ **Progress Tracking**: Real-time progress updates
- ✅ **Error Handling**: Continues processing even if some entries fail
- ✅ **Memory Efficient**: Uses indexed queries and batch operations
- ✅ **Rate Limited**: Delays between batches to avoid server overload

## Usage

### Dry Run (Preview Only)
```bash
npm run bulk-locations
```

This will show you what would be created without actually inserting data.

### Execute (Create Pages)
```bash
npm run bulk-locations --execute
```

This will actually create the location pages in the database.

## What It Does

The script:
1. Generates location-service combinations from predefined location lists
2. For each location, creates pages for all 6 service focuses:
   - Web Development
   - Digital Marketing
   - SEO Services
   - Graphic Designing
   - Content Writing
   - All Services

3. Uses the existing `generateLocationContent()` function to create:
   - SEO-optimized slugs
   - Page titles and meta descriptions
   - Hero section content
   - Story sections
   - Service listings

## Configuration

Edit `scripts/bulk-create-locations.ts` to customize:

- `BATCH_SIZE`: Number of entries processed at once (default: 50)
- `DELAY_BETWEEN_BATCHES`: Milliseconds between batches (default: 100ms)
- `LOCATIONS_BY_STATE`: Add or modify location lists

## Current Data

The script includes locations from:
- Delhi (30 locations)
- Haryana (20 locations)
- Uttar Pradesh (20 locations)
- Rajasthan (15 locations)
- Punjab (15 locations)
- Maharashtra (15 locations)
- Karnataka (15 locations)
- Tamil Nadu (15 locations)
- Gujarat (15 locations)
- West Bengal (15 locations)

**Total**: 175 locations × 6 services = **1,050 pages**

## Adding More Locations

To add more locations, edit the `LOCATIONS_BY_STATE` object in the script:

```typescript
const LOCATIONS_BY_STATE = {
  "Your State": [
    "City 1",
    "City 2",
    // ... more cities
  ],
  // ... more states
};
```

## Output Example

```
============================================================
Bulk Location Pages Creation Script
============================================================

🔍 DRY RUN MODE - No data will be created
   Run with --execute flag to actually create pages

📋 Generating location entries...
   Total entries to process: 1050

📦 Processing in 21 batches of 50

Processing batch 1/21 (1-50/1050)...
   ✓ Created: 50, Skipped: 0, Failed: 0
   Progress: 4.8% (50/1050)

Processing batch 2/21 (51-100/1050)...
   ✓ Created: 50, Skipped: 0, Failed: 0
   Progress: 9.5% (100/1050)

...

============================================================
Summary
============================================================
Total entries:    1050
✓ Created:        1050
⊘ Skipped:        0 (already exist)
✗ Failed:         0

💡 This was a dry run. Run with --execute to create pages.
============================================================
```

## Safety Features

1. **Duplicate Prevention**: Checks existing slugs before insertion
2. **Batch Processing**: Prevents memory overflow with large datasets
3. **Error Isolation**: One failed entry doesn't stop the entire process
4. **Dry Run**: Preview before making changes
5. **Progress Tracking**: Monitor execution in real-time

## Performance

- Processes ~1,000 entries in approximately 2-3 minutes
- Memory footprint: < 100MB
- Uses indexed slug field for efficient duplicate checking
- Batch queries reduce database round trips

## Troubleshooting

### "Module not found" error
Make sure you have ts-node installed:
```bash
npm install --save-dev ts-node
```

### Database connection error
Check your `.env` file has correct `DATABASE_URL` and `DIRECT_URL`.

### Duplicate slug errors
The script automatically skips duplicates. If you see errors, check that the slug generation logic matches your existing data.

## Notes

- The script uses the exact same logic as the admin panel
- No existing data is modified or deleted
- Footer locations are not affected (they use a separate query)
- All content is generated using existing templates
- Service focus field is properly set for each page
