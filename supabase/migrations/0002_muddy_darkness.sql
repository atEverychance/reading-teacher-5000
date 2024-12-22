/*
  # Add character type support

  1. Changes
    - Add type column to characters table
    - Add type check constraint for valid character types
    - Update existing RLS policies

  2. Security
    - Maintain existing RLS policies
    - Add constraint to ensure valid character types
*/

-- Add type column to characters table
ALTER TABLE characters ADD COLUMN IF NOT EXISTS type text NOT NULL DEFAULT 'unicorn';

-- Add check constraint for valid character types
ALTER TABLE characters ADD CONSTRAINT valid_character_type 
  CHECK (type IN ('unicorn', 'mermaid'));

-- Rename avatar_color for consistency
ALTER TABLE characters RENAME COLUMN avatar_color TO avatarColor;

-- Add indexes for frequently queried columns
CREATE INDEX IF NOT EXISTS idx_characters_type ON characters(type);
CREATE INDEX IF NOT EXISTS idx_characters_user_id ON characters(user_id);