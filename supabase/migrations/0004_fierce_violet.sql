/*
  # Fix RLS policies for characters table

  1. Changes
    - Drop existing policies
    - Create new policies for authenticated users
    - Add trigger for automatic user_id assignment
  
  2. Security
    - Ensure users can only access their own data
    - Automatically set user_id on insert using trigger
*/

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can read their own characters" ON characters;
DROP POLICY IF EXISTS "Users can insert their own characters" ON characters;
DROP POLICY IF EXISTS "Users can update their own characters" ON characters;

-- Create function to set user_id
CREATE OR REPLACE FUNCTION set_user_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.user_id = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically set user_id
DROP TRIGGER IF EXISTS set_user_id_trigger ON characters;
CREATE TRIGGER set_user_id_trigger
  BEFORE INSERT ON characters
  FOR EACH ROW
  EXECUTE FUNCTION set_user_id();

-- Create new policies
CREATE POLICY "Users can read their own characters"
ON characters FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert characters"
ON characters FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Users can update their own characters"
ON characters FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);