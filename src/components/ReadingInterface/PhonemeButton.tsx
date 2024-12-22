import React from 'react';
import { PhonemeType, BlendInfo } from '../../data/phonics/types.js';
import { getPhonemeInfo } from '../../data/phonics/phonemeConfig.js';

interface PhonemeButtonProps {
  phoneme: string;
  onClick: () => void;
  isCompleted: boolean;
  isPlaying: boolean;
}

export function PhonemeButton({ phoneme, onClick, isCompleted, isPlaying }: PhonemeButtonProps) {
  const info = getPhonemeInfo(phoneme);
  const type = (info as BlendInfo)?.components ? 'blend' : 'vowel';

  return (
    <button
      onClick={onClick}
      disabled={isPlaying}
      className={`
        text-4xl font-display font-bold px-6 py-3 rounded-xl
        transition-all transform hover:scale-105
        disabled:opacity-50
        ${isCompleted
          ? 'bg-green-500 text-white shadow-lg'
          : 'bg-white/75 text-gray-700 hover:bg-white shadow'}
      `}
      title={info?.description}
    >
      {phoneme}
    </button>
  );
}