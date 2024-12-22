/*
  # Update Character Table Constraints

  1. Changes
    - Set NOT NULL constraints
    - Set default values
    - Ensure consistent column constraints
*/

DO $$ 
BEGIN
  -- Update constraints and defaults
  ALTER TABLE characters 
    ALTER COLUMN avatar_color SET NOT NULL,
    ALTER COLUMN avatar_color SET DEFAULT 'bg-purple-400';

  -- Ensure existing NULL values are updated to default
  UPDATE characters 
  SET avatar_color = 'bg-purple-400' 
  WHERE avatar_color IS NULL;
END $$;