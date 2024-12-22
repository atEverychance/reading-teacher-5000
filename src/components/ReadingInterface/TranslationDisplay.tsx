import React from 'react';
import { PhonemeButton } from './PhonemeButton';
import type { Phoneme } from '../../data/phonics/types';
import type { CharacterType } from '../../types';

interface Props {
  translation: string;
  phonemes: Phoneme[];
  playedPhonemes: Set<string>;
  onPhonemeClick: (sound: string) => void;
  onTranslationClick: () => void;
  characterType: CharacterType;
}

export function TranslationDisplay({
  translation,
  phonemes,
  playedPhonemes,
  onPhonemeClick,
  onTranslationClick,
  characterType
}: Props) {
  return (
    <div className="space-y-4">
      <button
        onClick={onTranslationClick}
        className={`
          p-8 text-5xl font-bold rounded-2xl shadow-lg
          transition-all duration-300 transform hover:scale-105
          ${characterType === 'unicorn'
            ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700'
            : 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700'}
        `}
      >
        {translation}
      </button>

      <div className="flex gap-4 justify-center">
        {phonemes.map((phoneme, index) => (
          <PhonemeButton
            key={`${phoneme.sound}-${index}`}
            phoneme={phoneme}
            isPlayed={playedPhonemes.has(phoneme.sound)}
            onClick={() => onPhonemeClick(phoneme.sound)}
            characterType={characterType}
            isTranslation
          />
        ))}
      </div>
    </div>
  );
}