-- Remove state column from LocationPage table
-- This script reverses the state column addition from previous optimization attempts

-- Drop the state column if it exists
ALTER TABLE "LocationPage" 
DROP COLUMN IF EXISTS "state";

-- Drop any indexes related to state (if they exist)
DROP INDEX IF EXISTS "idx_locationpage_state";
DROP INDEX IF EXISTS "idx_locationpage_state_service";
