import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { supabase } from '../../lib/supabase';
import { Character } from '../../types';

describe('Character Database Operations', () => {
  const mockCharacter: Omit<Character, 'id' | 'user_id'> = {
    name: 'Test Character',
    type: 'unicorn',
    avatarColor: 'bg-purple-400',
    created_at: new Date().toISOString(),
    last_played: new Date().toISOString(),
    progress: 0
  };

  beforeEach(async () => {
    // Sign in as test user
    await supabase.auth.signUp({
      email: `test-${crypto.randomUUID()}@test.com`,
      password: 'testpassword123'
    });
  });

  afterEach(async () => {
    await supabase.auth.signOut();
  });

  it('should create a new character', async () => {
    const { data, error } = await supabase
      .from('characters')
      .insert([{
        name: mockCharacter.name,
        type: mockCharacter.type,
        avatar_color: mockCharacter.avatarColor,
        created_at: mockCharacter.created_at,
        last_played: mockCharacter.last_played,
        progress: mockCharacter.progress
      }])
      .select()
      .single();

    expect(error).toBeNull();
    expect(data).toBeTruthy();
    expect(data.name).toBe(mockCharacter.name);
    expect(data.type).toBe(mockCharacter.type);
    expect(data.avatar_color).toBe(mockCharacter.avatarColor);
  });

  it('should fetch characters for authenticated user', async () => {
    // First create a character
    await supabase
      .from('characters')
      .insert([{
        name: mockCharacter.name,
        type: mockCharacter.type,
        avatar_color: mockCharacter.avatarColor,
        created_at: mockCharacter.created_at,
        last_played: mockCharacter.last_played,
        progress: mockCharacter.progress
      }]);

    // Then fetch characters
    const { data, error } = await supabase
      .from('characters')
      .select('*');

    expect(error).toBeNull();
    expect(data).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);
    expect(data[0].name).toBe(mockCharacter.name);
  });

  it('should update character progress', async () => {
    // Create character
    const { data: character } = await supabase
      .from('characters')
      .insert([{
        name: mockCharacter.name,
        type: mockCharacter.type,
        avatar_color: mockCharacter.avatarColor,
        created_at: mockCharacter.created_at,
        last_played: mockCharacter.last_played,
        progress: mockCharacter.progress
      }])
      .select()
      .single();

    const newProgress = 50;
    
    // Update progress
    const { error } = await supabase
      .from('characters')
      .update({ progress: newProgress })
      .eq('id', character.id);

    expect(error).toBeNull();

    // Verify update
    const { data: updated } = await supabase
      .from('characters')
      .select()
      .eq('id', character.id)
      .single();

    expect(updated.progress).toBe(newProgress);
  });
});