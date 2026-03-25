# Location Bulk Upload Guide

## Overview
This guide explains how to upload all locations from the JSON file (`data/all_locations_data.json`) to your WebDesino admin panel. Each location will be automatically assigned 5 different services and proper state categorization.

## What the Script Does

✅ Reads all locations from `data/all_locations_data.json`
✅ Creates proper URL slugs following the existing codebase convention
✅ Generates SEO-friendly page titles and descriptions
✅ Assigns **5 main services** to each location (Website Solutions, Digital Marketing, SEO Services, Graphic Designing, Content Writing)
✅ Properly sets the **state name** for admin filtering
✅ Displays locations correctly in the **Admin Panel → Locations → Filter by State**

## Prerequisites

1. **Environment Variables**: Make sure your `.env` file has:
   ```
   DATABASE_URL=your_database_url
   DIRECT_URL=your_direct_database_url (for Prisma)
   ```

2. **Database**: Your PostgreSQL database should be set up and Prisma migrations should be applied.

## How to Run

### Option 1: Using Batch File (Windows)
Simply double-click the batch file:
```
run-seed-locations.bat
```
This will:
- Check and install dependencies if needed
- Generate Prisma client
- Run the location seed script
- Show you a summary of the upload

### Option 2: Using NPM Script
Run this command from the project root:
```bash
npm run seed:all-locations
```

### Option 3: Using TypeScript Directly
```bash
npx ts-node --compiler-options {\"module\":\"CommonJS\"} scripts/seed-locations.ts
```

## What Gets Created

For each location, the script creates/updates:

| Field | Value | Example |
|-------|-------|---------|
| **slug** | Location slug | `best-web-development-company-in-srinagar` |
| **location** | Location name | `Srinagar` |
| **state** | State name | `Jammu & Kashmir` |
| **title** | SEO title | `Best Web Development Company in Srinagar` |
| **description** | Meta description | Site description |
| **serviceFocus** | Service category | `all-services` |
| **content** | JSON with 5 services | `{services: [...]}`  |

## Service Assignment

The script automatically assigns **the same 5 main services** to every location:
- Website Solutions
- Digital Marketing
- SEO Services
- Graphic Designing
- Content Writing

These are the 5 core service categories defined in your codebase.

## Verify in Admin Panel

After running the script:

1. Go to: **Admin Panel → Locations**
2. Use the **State Filter** dropdown - you should see all Indian states
3. Filter by any state to see locations with their assigned services
4. Click on any location to view/edit its details

## Example Output

When you run the script, you'll see:

```
🚀 Starting locations seed...

📍 Processing Jammu & Kashmir (20 locations)
  ✅ Srinagar (best-web-development-company-in-srinagar)
      Services: Web Development, Local SEO, Content Marketing, PPC Advertising, Website Design
  ✅ Jammu (best-web-development-company-in-jammu)
      Services: Technical SEO, E-commerce Development, Social Media Marketing, Link Building, Web Maintenance
  ...

============================================================
📊 SEED SUMMARY
============================================================
Total Locations Processed: 5000+
Successfully Created: 4950
Skipped/Updated: 50
============================================================
✨ Location seeding completed successfully!
```

## Troubleshooting

### Error: "Database connection failed"
- ✅ Check your `.env` file has correct `DATABASE_URL`
- ✅ Ensure PostgreSQL is running
- ✅ Check network connectivity

### Error: "Module not found"
- ✅ Run `npm install` first
- ✅ Run `npx prisma generate` to generate Prisma client

### Error: "Duplicate entry"
- ✅ This means the location already exists in the database
- ✅ The script will skip and update instead (using upsert)

### No states showing in filter after running script
- ✅ Make sure the database migration for `state` field is applied
- ✅ Check the `LocationPage` table has data: `SELECT DISTINCT state FROM "LocationPage" LIMIT 10;`

## What if I want to modify something?

### Change slug pattern:
Edit `scripts/seed-locations.ts` - look for `generateLocationSlug()` function

### Change service selection:
- Modify `availableServices` array with different services
- Change the `getRandomServices(5)` call to pick a different number

### Change title/description template:
Edit `generateTitle()` and `generateDescription()` functions

## Database Query to Verify

After running, you can verify the data with:

```sql
-- Count total locations
SELECT COUNT(*) FROM "LocationPage";

-- Count locations by state
SELECT state, COUNT(*) as count FROM "LocationPage" GROUP BY state ORDER BY count DESC;

-- Check a specific location with services
SELECT slug, location, state, content FROM "LocationPage" WHERE location = 'Srinagar';
```

## Notes

- ⚡ The script uses **upsert** - it won't create duplicates if run multiple times
- 🎲 Services are randomly selected each time - you can re-run to get different service combinations
- 📍 The state field is crucial for the admin filter to work properly
- 🔒 All locations use `serviceFocus: "all-services"` by default

## Support

If you encounter any issues:
1. Check that your `.env` is set up correctly
2. Ensure database migrations are applied
3. Verify the JSON file exists at `data/all_locations_data.json`
4. Check console output for specific error messages
