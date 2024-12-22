import { useEffect } from 'react';
import { supabase } from '../lib/supabase.js';
import { useStore } from '../store/useStore.js';
import type { Character } from '../types/index.js';
import { mapCharacterFromDb, mapCharacterToDb } from '../lib/database.js';

export function useSupabase() {
  const { setCharacters, addCharacter } = useStore();

  useEffect(() => {
    // Load initial characters
    const loadCharacters = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data } = await supabase
        .from('characters')
        .select('*')
        .order('last_played', { ascending: false });

      if (data) {
        const formattedCharacters = data.map(mapCharacterFromDb);
        setCharacters(formattedCharacters);
      }
    };

    loadCharacters();

    // Set up auth state change handler
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        loadCharacters();
      } else {
        setCharacters([]);
      }
    });

    // Set up character changes subscription
    const setupSubscription = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const characterSubscription = supabase
        .channel('characters')
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'characters',
            filter: `user_id=eq.${session.user.id}`  // Only listen for this user's changes
          },
          async (payload) => {
            console.log('Character change detected:', payload);
            // Only fetch on inserts or updates, not on deletes
            if (payload.eventType !== 'DELETE') {
              console.log('Fetching updated characters list');
              loadCharacters();
            }
          }
        )
        .subscribe();

      return characterSubscription;
    };

    // Set up initial subscription
    let characterSubscription: any;
    setupSubscription().then(sub => characterSubscription = sub);

    // Cleanup
    return () => {
      authSubscription.unsubscribe();
      if (characterSubscription) {
        characterSubscription.unsubscribe();
      }
    };
  }, [setCharacters]);

  const saveCharacter = async (character: Omit<Character, 'id' | 'user_id'>) => {
    let { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: `${crypto.randomUUID()}@anonymous.com`,
        password: crypto.randomUUID()
      });
      
      if (authError || !authData.session) {
        console.error('Failed to create anonymous session:', authError);
        return null;
      }
      
      session = authData.session;
    }

    const characterData = mapCharacterToDb(character);

    const { data: savedData, error } = await supabase
      .from('characters')
      .insert([characterData])
      .select()
      .single();

    if (error) {
      console.error('Failed to save character:', error);
      return null;
    }

    if (savedData) {
      const formattedCharacter = mapCharacterFromDb(savedData);
      // Immediately update the store with the new character
      addCharacter(formattedCharacter);
      return formattedCharacter;
    }

    return null;
  };

  const deleteCharacter = async (characterId: string) => {
    console.log('Attempting to delete character:', characterId);
    
    // Get current session to ensure we're deleting for the right user
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      console.error('No active session when trying to delete character');
      return false;
    }

    const userId = session.user.id;
    console.log('Current user ID:', userId);

    try {
      // First verify the character exists and belongs to the user
      const { data: existingChar, error: fetchError } = await supabase
        .from('characters')
        .select('*')
        .eq('id', characterId)
        .eq('user_id', userId)
        .single();

      console.log('Existing character:', existingChar);
      console.log('Fetch error:', fetchError);

      if (!existingChar) {
        console.error('Character not found or does not belong to user');
        return false;
      }

      // Perform the delete operation with explicit user_id check
      const { data, error: deleteError, status, statusText } = await supabase
        .from('characters')
        .delete()
        .match({ 
          id: characterId,
          user_id: userId 
        })
        .select();

      console.log('Delete response:', { data, deleteError, status, statusText });

      if (deleteError) {
        console.error('Failed to delete character:', deleteError);
        return false;
      }

      // Verify deletion with user_id check
      const { data: verifyData, error: verifyError } = await supabase
        .from('characters')
        .select('*')
        .eq('id', characterId)
        .eq('user_id', userId)
        .single();

      console.log('Verify response:', { verifyData, verifyError });

      if (verifyData) {
        console.error('Character still exists after deletion');
        return false;
      }

      // Update local state immediately
      setCharacters(prev => {
        const newCharacters = prev.filter(char => char.id !== characterId);
        console.log('Updated local characters:', newCharacters);
        return newCharacters;
      });

      return true;
    } catch (error) {
      console.error('Error during character deletion:', error);
      return false;
    }
  };

  return {
    supabase,
    saveCharacter,
    deleteCharacter
  };
}