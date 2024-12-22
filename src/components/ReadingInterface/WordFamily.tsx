import React from 'react';
import { useStore } from '../../store/useStore';
import type { WordFamily as WordFamilyType } from '../../types/curriculum';

interface Props {
  wordFamily: WordFamilyType;
  onWordSelect: (word: string) => void;
}

export function WordFamily({ wordFamily, onWordSelect }: Props) {
  const activeCharacter = useStore((state) => state.activeCharacter);
  const characterType = activeCharacter?.type || 'unicorn';

  return (
    <div className="space-y-4">
      <h3 className={`text-2xl font-bold ${
        characterType === 'unicorn' ? 'text-purple-800' : 'text-cyan-800'
      }`}>
        {wordFamily.pattern} family
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {wordFamily.words.map((word) => (
          <button
            key={word}
            onClick={() => onWordSelect(word)}
            className={`
              p-4 text-xl font-bold rounded-lg shadow-md
              transition-all duration-300 transform hover:scale-105
              ${characterType === 'unicorn'
                ? 'bg-purple-100 hover:bg-purple-200 text-purple-800'
                : 'bg-cyan-100 hover:bg-cyan-200 text-cyan-800'}
            `}
          >
            {word}
          </button>
        ))}
      </div>

      <div className="mt-4 p-4 rounded-lg bg-white/50">
        <p className="text-lg italic">Examples:</p>
        {wordFamily.examples.map((example, index) => (
          <p key={index} className="text-gray-700">{example}</p>
        ))}
      </div>
    </div>
  );
}