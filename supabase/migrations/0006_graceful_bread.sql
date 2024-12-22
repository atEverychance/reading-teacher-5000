/*
  # Set Character Table Constraints

  1. Changes
    - Add NOT NULL constraints
    - Set default values for required columns
    - Ensure consistent column constraints
*/

DO $$ 
BEGIN
  -- Add NOT NULL constraints and defaults if not already set
  ALTER TABLE characters 
    ALTER COLUMN avatar_color SET NOT NULL,
    ALTER COLUMN avatar_color SET DEFAULT 'bg-purple-400',
    ALTER COLUMN type SET NOT NULL,
    ALTER COLUMN type SET DEFAULT 'unicorn';

  -- Ensure the check constraint exists
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.constraint_column_usage 
    WHERE table_name = 'characters' AND constraint_name = 'valid_character_type'
  ) THEN
    ALTER TABLE characters ADD CONSTRAINT valid_character_type 
      CHECK (type IN ('unicorn', 'mermaid'));
  END IF;
END $$;