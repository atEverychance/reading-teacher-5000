/*
  # Fix column naming convention

  1. Changes
    - Add type column if it doesn't exist
    - Ensure avatar_color column exists with correct name
  
  2. Notes
    - Using snake_case for database columns (PostgreSQL convention)
    - Safely handling column existence checks
*/

DO $$ 
BEGIN
  -- Add type column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'characters' AND column_name = 'type'
  ) THEN
    ALTER TABLE characters ADD COLUMN type text NOT NULL DEFAULT 'unicorn';
  END IF;

  -- Ensure avatar_color column exists with correct name
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'characters' AND column_name = 'avatar_color'
  ) THEN
    ALTER TABLE characters ADD COLUMN avatar_color text NOT NULL DEFAULT 'bg-purple-400';
  END IF;
END $$;