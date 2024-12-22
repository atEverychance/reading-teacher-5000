import React from 'react';
import { useStore } from '../../store/useStore';
import { Sparkles, Waves, Star, Plus, X } from 'lucide-react';
import type { Character } from '../../types';
import { useSupabase } from '../../hooks/useSupabase';

interface Props {
  characters: Character[];
  onClose: () => void;
}

export function CharacterList({ characters, onClose }: Props) {
  const { setActiveCharacter } = useStore();
  const { deleteCharacter } = useSupabase();

  const getLevel = (progress: number) => {
    if (progress < 25) return 1;
    if (progress < 50) return 2;
    if (progress < 75) return 3;
    return 4;
  };

  const handleDelete = async (character: Character, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the character selection
    if (window.confirm(`Are you sure you want to delete ${character.name}?`)) {
      const success = await deleteCharacter(character.id);
      if (!success) {
        alert('Failed to delete character. Please try again.');
      }
    }
  };

  const handleSelectCharacter = (character: Character) => {
    console.log('Selecting character:', character);
    setActiveCharacter(character);
    onClose();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Your Characters</h2>
      <div className="grid grid-cols-2 gap-6">
        <button
          onClick={() => {
            setActiveCharacter(null);
            onClose();
          }}
          className="p-6 rounded-xl backdrop-blur-sm transition-all
            hover:scale-105 hover:shadow-lg
            bg-gradient-to-br from-white/10 to-white/5 hover:from-white/15 hover:to-white/10
            border-2 border-white/10 hover:border-white/20
            group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
              <Plus className="w-12 h-12 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-white">Create New Character</h3>
              <p className="text-gray-300 mt-2">Add a new reading companion</p>
            </div>
          </div>
        </button>

        {characters?.map((character) => {
          const level = getLevel(character.progress);
          const stars = Math.floor(character.progress / 25);
          
          return (
            <button
              key={character.id}
              onClick={() => handleSelectCharacter(character)}
              className={`
                relative p-6 rounded-xl backdrop-blur-sm transition-all
                hover:scale-105 hover:shadow-lg
                ${character.type === 'unicorn'
                  ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30'
                  : 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30'}
              `}
            >
              {/* Delete button */}
              <button
                onClick={(e) => handleDelete(character, e)}
                className="absolute top-2 right-2 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label={`Delete ${character.name}`}
              >
                <X className="w-4 h-4 text-white" />
              </button>

              <div className="flex items-center gap-4">
                {character.type === 'unicorn' ? (
                  <Sparkles className="w-12 h-12 text-purple-400" />
                ) : (
                  <Waves className="w-12 h-12 text-cyan-400" />
                )}
                <div className="text-left flex-1">
                  <h3 className="text-xl font-bold text-white">{character.name}</h3>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <div className="text-sm">
                      <p className="text-gray-300">Level {level}</p>
                      <div className="flex gap-1 mt-1">
                        {[...Array(4)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < stars
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-sm ml-auto">
                      <p className="text-gray-300">Last Played</p>
                      <p className="text-white">
                        {new Date(character.last_played).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}