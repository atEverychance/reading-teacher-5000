import { create } from 'zustand';
import { supabase } from '../lib/supabase.js';
import type { Character } from '../types/index.js';

// Get the stored active character ID from local storage
const storedActiveCharacterId = localStorage.getItem('activeCharacterId');

export interface StoreState {
  characters: Character[];
  activeCharacter: Character | null;
  setCharacters: (characters: Character[] | ((prev: Character[]) => Character[])) => void;
  setActiveCharacter: (character: Character | null) => void;
  addCharacter: (character: Character) => void;
  updateCharacterProgress: (progress: number) => void;
  level: number;
  setLevel: (level: number) => void;
}

// Load initial active character from localStorage
const getInitialState = () => {
  const stored = localStorage.getItem('activeCharacter');
  return stored ? JSON.parse(stored) : null;
};

export const useStore = create<StoreState>((set, get) => ({
  characters: [],
  activeCharacter: getInitialState(),
  setCharacters: (characters) => {
    const newCharacters = typeof characters === 'function' ? characters(get().characters) : characters;
    set({ characters: newCharacters });
  },
  setActiveCharacter: (character) => {
    // Update local storage
    if (character) {
      localStorage.setItem('activeCharacter', JSON.stringify(character));
      localStorage.setItem('activeCharacterId', character.id);
      
      // Update Supabase
      supabase
        .from('characters')
        .update({ last_played: new Date().toISOString() })
        .eq('id', character.id)
        .then(({ error }) => {
          if (!error) {
            set((state) => ({
              activeCharacter: character,
              characters: state.characters.map(char =>
                char.id === character.id
                  ? { ...char, last_played: new Date().toISOString() }
                  : char
              )
            }));
          }
        });
    } else {
      localStorage.removeItem('activeCharacter');
      localStorage.removeItem('activeCharacterId');
      set({ activeCharacter: null });
    }
  },
  addCharacter: (character) => 
    set((state) => ({ 
      characters: [...state.characters, character],
      activeCharacter: character
    })),
  updateCharacterProgress: async (progress) => {
    const { activeCharacter } = get();
    if (!activeCharacter) return;

    const now = new Date().toISOString();
    
    // Update Supabase
    const { error } = await supabase
      .from('characters')
      .update({ 
        progress,
        last_played: now
      })
      .eq('id', activeCharacter.id);

    if (!error) {
      const updatedCharacter = {
        ...activeCharacter,
        progress,
        last_played: now
      };
      
      // Update local storage and state
      localStorage.setItem('activeCharacter', JSON.stringify(updatedCharacter));
      
      set((state) => ({
        activeCharacter: updatedCharacter,
        characters: state.characters.map(char =>
          char.id === activeCharacter.id 
            ? updatedCharacter
            : char
        )
      }));
    }
  },
  level: 1,
  setLevel: (level) => set({ level }),
}));