# Fix Database Timeout Issue

## Problem
`npx prisma db push` is timing out because you have 1,804 existing location pages and Supabase's connection pooler has a statement timeout.

## Solution: Add Column Directly in Supabase

### Step 1: Go to Supabase SQL Editor
1. Open your Supabase dashboard
2. Go to "SQL Editor"
3. Click "New Query"

### Step 2: Run This SQL

```sql
-- Add state column with default value
ALTER TABLE "LocationPage" 
ADD COLUMN IF NOT EXISTS "state" TEXT DEFAULT 'Delhi NCR';

-- Add indexes for performance (IMPORTANT for 40K pages)
CREATE INDEX IF NOT EXISTS "LocationPage_slug_idx" 
ON "LocationPage"("slug");

CREATE INDEX IF NOT EXISTS "LocationPage_state_idx" 
ON "LocationPage"("state");

CREATE INDEX IF NOT EXISTS "LocationPage_serviceFocus_idx" 
ON "LocationPage"("serviceFocus");

CREATE INDEX IF NOT EXISTS "LocationPage_state_service_idx" 
ON "LocationPage"("state", "serviceFocus");

CREATE INDEX IF NOT EXISTS "LocationPage_location_idx" 
ON "LocationPage"("location");

-- Verify the column was added
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'LocationPage' AND column_name = 'state';
```

### Step 3: Regenerate Prisma Client

```bash
npx prisma generate
```

### Step 4: Mark J&K Locations

```bash
npx tsx scripts/mark-jk-locations-safe.ts
```

### Step 5: Enable State Filter

Uncomment the state-related code in `app/admin/(protected)/locations/page.tsx`

---

## Why This Approach?

1. **Faster:** Direct SQL bypasses Prisma's migration system
2. **No Timeout:** Runs directly on database without connection pooler limits
3. **Adds Indexes:** Critical for performance with 40K pages
4. **Safe:** Uses `IF NOT EXISTS` so it won't fail if column already exists

---

## Alternative: Increase Timeout (Not Recommended)

If you really want to use `prisma db push`, you can try:

```bash
# Use direct URL instead of pooler
DATABASE_URL="your-direct-url" npx prisma db push
```

But the SQL approach is faster and adds necessary indexes.

---

## After This Works

Follow the performance optimization guide in `PERFORMANCE-OPTIMIZATION.md` to handle 40K pages efficiently.
