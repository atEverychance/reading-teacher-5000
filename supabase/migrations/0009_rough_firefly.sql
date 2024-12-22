/*
  # Ensure avatar_color column constraints

  1. Changes
    - Set NOT NULL constraint
    - Set default value
    - Update any existing NULL values
*/

DO $$ 
BEGIN
  -- Update any existing NULL values first
  UPDATE characters 
  SET avatar_color = 'bg-purple-400' 
  WHERE avatar_color IS NULL;

  -- Set constraints and default value
  ALTER TABLE characters 
    ALTER COLUMN avatar_color SET NOT NULL,
    ALTER COLUMN avatar_color SET DEFAULT 'bg-purple-400';
END $$;