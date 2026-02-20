-- Remove closed status from qa_posts
-- This migration updates the CHECK constraint to only allow 'open' and 'answered' statuses

-- Drop the existing CHECK constraint
ALTER TABLE qa_posts DROP CONSTRAINT IF EXISTS qa_posts_status_check;

-- Add new CHECK constraint with only open and answered
ALTER TABLE qa_posts ADD CHECK (status IN ('open', 'answered'));
