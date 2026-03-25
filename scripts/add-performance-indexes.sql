-- Performance Optimization Indexes for 40K+ Location Pages
-- Run this in Supabase SQL Editor
-- NO DATA WILL BE LOST - This only adds indexes for faster queries

-- 1. Add state column (if not exists)
ALTER TABLE "LocationPage" 
ADD COLUMN IF NOT EXISTS "state" TEXT DEFAULT 'Delhi NCR';

-- 2. Index for slug lookups (most common query - individual page loads)
CREATE INDEX IF NOT EXISTS "LocationPage_slug_idx" 
ON "LocationPage"("slug");

-- 3. Index for state filtering (admin panel filter)
CREATE INDEX IF NOT EXISTS "LocationPage_state_idx" 
ON "LocationPage"("state");

-- 4. Index for service filtering (admin panel filter)
CREATE INDEX IF NOT EXISTS "LocationPage_serviceFocus_idx" 
ON "LocationPage"("serviceFocus");

-- 5. Composite index for combined state + service filtering
CREATE INDEX IF NOT EXISTS "LocationPage_state_service_idx" 
ON "LocationPage"("state", "serviceFocus");

-- 6. Index for location name (for deduplication in footer)
CREATE INDEX IF NOT EXISTS "LocationPage_location_idx" 
ON "LocationPage"("location");

-- 7. Index for admin panel sorting by location name
CREATE INDEX IF NOT EXISTS "LocationPage_location_asc_idx" 
ON "LocationPage"("location" ASC);

-- 8. Index for createdAt (for ISR - fetching most recent pages)
CREATE INDEX IF NOT EXISTS "LocationPage_createdAt_idx" 
ON "LocationPage"("createdAt" DESC);

-- Verify indexes were created
SELECT 
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename = 'LocationPage'
ORDER BY indexname;

-- Check table statistics
SELECT 
    schemaname,
    tablename,
    n_live_tup as row_count,
    n_dead_tup as dead_rows,
    last_vacuum,
    last_autovacuum
FROM pg_stat_user_tables
WHERE tablename = 'LocationPage';
