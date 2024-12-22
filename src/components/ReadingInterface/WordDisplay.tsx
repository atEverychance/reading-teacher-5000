import React from 'react';
import { PhonemeButton } from './PhonemeButton';
import type { Phoneme } from '../../data/phonics/types';
import type { CharacterType } from '../../types';

interface Props {
  word: string;
  phonemes: Phoneme[];
  playedPhonemes: Set<string>;
  onPhonemeClick: (sound: string) => void;
  onWordClick: () => void;
  characterType: CharacterType;
}

export function WordDisplay({
  word,
  phonemes,
  playedPhonemes,
  onPhonemeClick,
  onWordClick,
  characterType
}: Props) {
  return (
    <div className="space-y-4">
      <button
        onClick={onWordClick}
        className={`
          p-12 text-8xl font-bold rounded-3xl shadow-xl
          transition-all duration-300 transform hover:scale-105 active:scale-95
          ${characterType === 'unicorn' 
            ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700' 
            : 'bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700'}
          animate-bounce-gentle
        `}
      >
        {word}
      </button>

      <div className="flex gap-4 justify-center">
        {phonemes.map((phoneme, index) => (
          <PhonemeButton
            key={`${phoneme.sound}-${index}`}
            phoneme={phoneme}
            isPlayed={playedPhonemes.has(phoneme.sound)}
            onClick={() => onPhonemeClick(phoneme.sound)}
            characterType={characterType}
          />
        ))}
      </div>
    </div>
  );
}