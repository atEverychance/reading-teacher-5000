import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { SuccessButton } from './SuccessButton';

interface Props {
  word: string;
  syllables: string[];
  onRead: (text: string) => void;
  onComplete: () => void;
}

export function SyllableWord({ word, syllables, onRead, onComplete }: Props) {
  const [selectedSyllables, setSelectedSyllables] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const activeCharacter = useStore((state) => state.activeCharacter);
  const characterType = activeCharacter?.type || 'unicorn';
  
  useEffect(() => {
    setSelectedSyllables([]);
    setShowSuccess(false);
  }, [word]);

  const handleWordClick = () => {
    onRead(word);
    setShowSuccess(true);
  };

  const handleSyllableClick = (syllable: string) => {
    onRead(syllable);
    const newSelected = [...selectedSyllables, syllable.toLowerCase()];
    setSelectedSyllables(newSelected);
    if (newSelected.join('') === word.toLowerCase()) {
      setShowSuccess(true);
    }
  };

  return (
    <div className="relative flex flex-col items-center gap-6">
      {/* Full word button */}
      <button
        onClick={handleWordClick}
        className={`
          p-8 text-6xl font-word rounded-xl shadow-lg w-full
          transition-all duration-300 transform hover:scale-105
          ${characterType === 'unicorn' 
            ? 'bg-purple-100 hover:bg-purple-200' 
            : 'bg-cyan-100 hover:bg-cyan-200'}
          ${characterType === 'unicorn' ? 'text-purple-800' : 'text-cyan-800'}
          animate-neon
        `}
      >
        {word}
      </button>

      {/* Syllable buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        {syllables.map((syllable, index) => (
          <button
            key={index}
            onClick={() => handleSyllableClick(syllable)}
            disabled={selectedSyllables.includes(syllable.toLowerCase())}
            className={`
              p-6 text-4xl font-word rounded-xl shadow-lg
              transition-all duration-300 transform
              ${selectedSyllables.includes(syllable.toLowerCase()) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
              ${characterType === 'unicorn' 
                ? 'bg-pink-100 hover:bg-pink-200' 
                : 'bg-blue-100 hover:bg-blue-200'}
            `}
          >
            {syllable}
          </button>
        ))}
      </div>

      {/* Success button */}
      {showSuccess && (
        <div className="mt-8">
          <SuccessButton onClick={onComplete} />
        </div>
      )}
    </div>
  );
}