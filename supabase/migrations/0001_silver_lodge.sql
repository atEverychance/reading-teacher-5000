/*
  # Initial Schema Setup for Reading Adventure App

  1. New Tables
    - characters
      - Stores user characters with customization options
      - Tracks basic progress metrics
    - reading_progress
      - Stores detailed progress for each character
      - Tracks completed activities and achievements
    - words
      - Stores vocabulary words with difficulty levels
    - stories
      - Stores reading materials and associated metadata

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
*/

-- Characters table
CREATE TABLE IF NOT EXISTS characters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  avatar_color text NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_played timestamptz DEFAULT now(),
  progress integer DEFAULT 0
);

-- Reading progress table
CREATE TABLE IF NOT EXISTS reading_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id uuid REFERENCES characters(id),
  level integer DEFAULT 1,
  words_learned jsonb DEFAULT '[]'::jsonb,
  stories_completed jsonb DEFAULT '[]'::jsonb,
  last_activity timestamptz DEFAULT now()
);

-- Words table
CREATE TABLE IF NOT EXISTS words (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  word text NOT NULL,
  difficulty integer NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Stories table
CREATE TABLE IF NOT EXISTS stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  difficulty integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE words ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read their own characters"
  ON characters
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own characters"
  ON characters
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own characters"
  ON characters
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read their own progress"
  ON reading_progress
  FOR SELECT
  TO authenticated
  USING (
    character_id IN (
      SELECT id FROM characters WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own progress"
  ON reading_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (
    character_id IN (
      SELECT id FROM characters WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own progress"
  ON reading_progress
  FOR UPDATE
  TO authenticated
  USING (
    character_id IN (
      SELECT id FROM characters WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Everyone can read words"
  ON words
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Everyone can read stories"
  ON stories
  FOR SELECT
  TO authenticated
  USING (true);