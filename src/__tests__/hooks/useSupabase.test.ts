import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSupabase } from '../../hooks/useSupabase';
import { supabase } from '../../lib/supabase';

describe('useSupabase Hook', () => {
  beforeEach(async () => {
    await supabase.auth.signUp({
      email: `test-${crypto.randomUUID()}@test.com`,
      password: 'testpassword123'
    });
  });

  afterEach(async () => {
    await supabase.auth.signOut();
  });

  it('should save a new character', async () => {
    const { result } = renderHook(() => useSupabase());

    const mockCharacter = {
      name: 'Test Character',
      type: 'unicorn',
      created_at: new Date().toISOString(),
      last_played: new Date().toISOString(),
      progress: 0
    };

    let savedCharacter;
    await act(async () => {
      savedCharacter = await result.current.saveCharacter(mockCharacter);
    });

    expect(savedCharacter).toBeTruthy();
    expect(savedCharacter?.name).toBe(mockCharacter.name);
    expect(savedCharacter?.type).toBe(mockCharacter.type);
  });

  it('should fetch characters on mount', async () => {
    const { result } = renderHook(() => useSupabase());

    // Wait for initial fetch
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(Array.isArray(result.current.characters)).toBe(true);
  });
});