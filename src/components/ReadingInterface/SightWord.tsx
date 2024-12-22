import React from 'react';
import { useStore } from '../../store/useStore';

interface Props {
  word: string;
  translation: string;
  onRead: (text: string, isFrench: boolean) => void;
}

export function SightWord({ word, translation, onRead }: Props) {
  const activeCharacter = useStore((state) => state.activeCharacter);
  const characterType = activeCharacter?.type || 'unicorn';
  
  return (
    <div className="flex flex-col gap-6 items-center">
      <button
        onClick={() => onRead(word, false)}
        className={`
          p-8 text-7xl font-bold rounded-xl shadow-lg w-96 h-40
          flex items-center justify-center
          transition-all duration-300 transform hover:scale-105 active:scale-95
          ${characterType === 'unicorn' 
            ? 'bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200' 
            : 'bg-gradient-to-r from-cyan-100 to-blue-100 hover:from-cyan-200 hover:to-blue-200'}
          ${characterType === 'unicorn' ? 'text-purple-800' : 'text-cyan-800'}
        `}
      >
        {word}
      </button>

      <button
        onClick={() => onRead(translation, true)}
        className={`
          p-8 text-6xl font-bold rounded-xl shadow-lg w-80 h-32
          flex items-center justify-center
          transition-all duration-300 transform hover:scale-105 active:scale-95
          ${characterType === 'unicorn' 
            ? 'bg-gradient-to-r from-pink-100 to-fuchsia-100 hover:from-pink-200 hover:to-fuchsia-200' 
            : 'bg-gradient-to-r from-teal-100 to-blue-100 hover:from-teal-200 hover:to-blue-200'}
          ${characterType === 'unicorn' ? 'text-pink-800' : 'text-teal-800'}
        `}
      >
        {translation}
      </button>
    </div>
  );
}