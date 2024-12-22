import { supabase } from './supabase.js';
import type { Character } from '../types/index.js';
import type { Database } from '../types/supabase.js';

type CharacterInsert = Database['public']['Tables']['characters']['Insert'];

export const mapCharacterToDb = (character: Omit<Character, 'id' | 'user_id'>): CharacterInsert => ({
  name: character.name,
  type: character.type,
  created_at: character.created_at,
  last_played: character.last_played,
  progress: character.progress
});

export const mapCharacterFromDb = (dbCharacter: Database['public']['Tables']['characters']['Row']): Character => ({
  id: dbCharacter.id,
  user_id: dbCharacter.user_id,
  name: dbCharacter.name,
  type: dbCharacter.type,
  created_at: dbCharacter.created_at,
  last_played: dbCharacter.last_played,
  progress: dbCharacter.progress
});