import React, { useState } from 'react';
import { Sparkles, Waves } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CharacterType } from '../types';
import { CharacterTypeSelector } from './CharacterTypeSelector';
import { useSupabase } from '../hooks/useSupabase';

export function CharacterCreation() {
  const [name, setName] = useState('');
  const [characterType, setCharacterType] = useState<CharacterType>('unicorn');
  const { setActiveCharacter } = useStore();
  const { saveCharacter } = useSupabase();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const character = {
      name: name.trim(),
      type: characterType,
      created_at: new Date().toISOString(),
      last_played: new Date().toISOString(),
      progress: 0
    };

    const savedCharacter = await saveCharacter(character);
    if (savedCharacter) {
      setActiveCharacter(savedCharacter);
    }
  };

  return (
    <div className={`
      min-h-screen p-8
      ${characterType === 'unicorn' 
        ? 'bg-gradient-to-br from-purple-200 via-pink-200 to-purple-300' 
        : 'bg-gradient-to-br from-cyan-200 via-blue-200 to-cyan-300'}
    `}>
      <div className="max-w-xl mx-auto">
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-8">
            <CharacterTypeSelector
              selected={characterType}
              onSelect={setCharacterType}
            />

            <div className="space-y-4">
              <label className="block text-3xl font-heading font-bold text-gray-700
                [text-shadow:_1px_1px_0_rgb(255_255_255_/_50%)]">
                What's your name?
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-6 py-4 text-2xl font-display font-medium rounded-xl 
                  bg-white/75 border-2 border-gray-200 
                  text-gray-700 placeholder-gray-400
                  focus:border-blue-400 focus:ring focus:ring-blue-400/30
                  transition-all"
                placeholder="Enter your name here..."
              />
            </div>

            <button
              type="submit"
              disabled={!name.trim()}
              className={`
                w-full py-4 px-6 rounded-xl text-white
                text-2xl font-heading font-extrabold tracking-wide
                transform transition-all
                flex items-center justify-center gap-3
                ${characterType === 'unicorn'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600'}
                ${name.trim() 
                  ? 'hover:scale-105 hover:shadow-lg' 
                  : 'opacity-50 cursor-not-allowed'}
              `}
            >
              {characterType === 'unicorn' ? (
                <Sparkles className="w-8 h-8" />
              ) : (
                <Waves className="w-8 h-8" />
              )}
              <span>Start Your Adventure!</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}