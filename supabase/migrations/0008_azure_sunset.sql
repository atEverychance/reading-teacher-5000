/*
  # Fix Avatar Color Constraints

  1. Changes
    - Ensure NOT NULL constraint for avatar_color
    - Set default value for avatar_color
    - Update any existing NULL values
*/

DO $$ 
BEGIN
  -- Ensure NOT NULL constraint and default value
  ALTER TABLE characters 
    ALTER COLUMN avatar_color SET NOT NULL,
    ALTER COLUMN avatar_color SET DEFAULT 'bg-purple-400';

  -- Update any NULL values to default
  UPDATE characters 
  SET avatar_color = 'bg-purple-400' 
  WHERE avatar_color IS NULL;
END $$;