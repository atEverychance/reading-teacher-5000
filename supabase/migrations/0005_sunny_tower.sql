/*
  # Fix character policies and triggers

  1. Changes
    - Drop existing policies
    - Create new policies with proper user_id handling
    - Add trigger for setting user_id on insert
  
  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read their own characters" ON characters;
DROP POLICY IF EXISTS "Users can insert characters" ON characters;
DROP POLICY IF EXISTS "Users can update their own characters" ON characters;

-- Create function to set user_id
CREATE OR REPLACE FUNCTION public.handle_new_character() 
RETURNS TRIGGER AS $$
BEGIN
  NEW.user_id := auth.uid();
  RETURN NEW;
END;
$$ language plpgsql security definer;

-- Create trigger
DROP TRIGGER IF EXISTS on_character_created ON characters;
CREATE TRIGGER on_character_created
  BEFORE INSERT ON characters
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_character();

-- Create new policies
CREATE POLICY "Users can read own characters"
  ON characters FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert characters"
  ON characters FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own characters"
  ON characters FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);