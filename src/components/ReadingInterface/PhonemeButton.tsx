import React from 'react';
import type { Phoneme } from '../../data/phonics/types';
import { PHONEME_TYPES } from '../../data/phonics/constants';

interface Props {
  phoneme: Phoneme;
  isPlayed: boolean;
  onClick: () => void;
  characterType: 'unicorn' | 'mermaid';
  isTranslation?: boolean;
}

export function PhonemeButton({ 
  phoneme, 
  isPlayed, 
  onClick, 
  characterType,
  isTranslation = false 
}: Props) {
  const getBackgroundColor = () => {
    const baseColor = characterType === 'unicorn'
      ? (isTranslation ? 'pink' : 'purple')
      : (isTranslation ? 'blue' : 'cyan');

    const intensity = isPlayed ? '200' : '100';
    return `bg-${baseColor}-${intensity}`;
  };

  const getTextColor = () => {
    const baseColor = characterType === 'unicorn'
      ? (isTranslation ? 'pink' : 'purple')
      : (isTranslation ? 'blue' : 'cyan');

    return `text-${baseColor}-800`;
  };

  const getSize = () => {
    switch (phoneme.type) {
      case PHONEME_TYPES.DIGRAPH:
        return 'p-5 text-3xl';
      case PHONEME_TYPES.BLEND:
        return 'p-5 text-3xl';
      default:
        return 'p-4 text-2xl';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`
        ${getSize()}
        font-bold rounded-xl shadow-lg
        transition-all duration-300 transform hover:scale-105
        ${getBackgroundColor()} ${getTextColor()}
      `}
    >
      {phoneme.sound}
    </button>
  );
}