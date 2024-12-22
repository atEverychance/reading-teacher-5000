/*
  # Remove avatar_color column
  
  1. Changes
    - Drop avatar_color column from characters table
    - Remove related constraints
*/

ALTER TABLE characters 
  DROP COLUMN IF EXISTS avatar_color,
  DROP COLUMN IF EXISTS avatarcolor;