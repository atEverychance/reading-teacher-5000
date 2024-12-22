import React, { useState } from 'react';
import { useStore } from '../../store/useStore';

interface Props {
  word: string;
  syllables: string[];
  onRead: (text: string) => void;
  onComplete: () => void;
}

export function SyllableDisplay({ word, syllables, onRead, onComplete }: Props) {
  const [selectedSyllables, setSelectedSyllables] = useState<string[]>([]);
  const activeCharacter = useStore((state) => state.activeCharacter);
  const characterType = activeCharacter?.type || 'unicorn';

  const handleSyllableClick = (syllable: string) => {
    onRead(syllable);
    const newSelected = [...selectedSyllables, syllable];
    setSelectedSyllables(newSelected);
    
    if (newSelected.length === syllables.length) {
      onRead(word);
      setTimeout(onComplete, 1000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <button
          onClick={() => onRead(word)}
          className={`
            text-6xl font-bold p-6 rounded-xl
            transition-all duration-300 transform hover:scale-105
            ${characterType === 'unicorn' 
              ? 'text-purple-800 bg-purple-100 hover:bg-purple-200' 
              : 'text-cyan-800 bg-cyan-100 hover:bg-cyan-200'}
          `}
        >
          {word}
        </button>
      </div>

      <div className="flex justify-center gap-4">
        {syllables.map((syllable, index) => (
          <button
            key={index}
            onClick={() => handleSyllableClick(syllable)}
            disabled={selectedSyllables.includes(syllable)}
            className={`
              text-4xl font-bold p-4 rounded-lg
              transition-all duration-300 transform
              ${selectedSyllables.includes(syllable) 
                ? 'opacity-50 cursor-not-allowed scale-95'
                : 'hover:scale-105'}
              ${characterType === 'unicorn'
                ? 'bg-pink-100 hover:bg-pink-200 text-pink-800'
                : 'bg-teal-100 hover:bg-teal-200 text-teal-800'}
            `}
          >
            {syllable}
          </button>
        ))}
      </div>
    </div>
  );
}