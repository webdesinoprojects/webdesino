-- Add state column to LocationPage table
-- Run this directly in Supabase SQL Editor

ALTER TABLE "LocationPage" 
ADD COLUMN IF NOT EXISTS "state" TEXT DEFAULT 'Delhi NCR';

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS "LocationPage_state_idx" ON "LocationPage"("state");

-- Verify the column was added
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'LocationPage' AND column_name = 'state';
