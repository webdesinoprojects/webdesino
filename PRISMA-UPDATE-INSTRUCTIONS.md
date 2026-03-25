# How to Update Prisma Schema with State Field

The `state` field has been added to the LocationPage model, but Prisma needs to be regenerated.

## Steps to Fix:

### Option 1: Using the Batch File (Easiest)
1. **Stop your dev server** (Ctrl+C in the terminal running `npm run dev`)
2. **Close VS Code** completely (this releases file locks)
3. **Run the batch file**: Double-click `update-prisma.bat`
4. Wait for it to complete
5. Reopen VS Code and restart dev server

### Option 2: Manual Steps
1. **Stop your dev server** (Ctrl+C)
2. **Close VS Code** completely
3. Open a new terminal/command prompt
4. Navigate to your project folder
5. Run these commands:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
6. Reopen VS Code and restart dev server

## After Prisma is Updated:

Once Prisma generates successfully, uncomment the state-related code in:
- `app/admin/(protected)/locations/page.tsx` (lines with state filtering)

The state field will then work properly with:
- State dropdown filter in admin panel
- State column in the locations table
- State field in location forms

## What Changed:

1. **Schema**: Added `state String? @default("Delhi NCR")` to LocationPage model
2. **Admin Panel**: Added state filter dropdown and state column
3. **Forms**: Added state input field
4. **Actions**: Updated create/update functions to handle state
5. **Bulk Script**: Updated to accept state parameter

## Troubleshooting:

If you still get file lock errors:
1. Restart your computer (this clears all file locks)
2. Run the update commands again
3. Make sure no Node processes are running in Task Manager
