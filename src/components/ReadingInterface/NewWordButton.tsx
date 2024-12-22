import React from 'react';
import { Shuffle } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface Props {
  onClick: () => void;
}

export function NewWordButton({ onClick }: Props) {
  const activeCharacter = useStore((state) => state.activeCharacter);
  const characterType = activeCharacter?.type || 'unicorn';

  return (
    <button
      onClick={onClick}
      className={`
        fixed left-4 top-1/2 -translate-y-1/2
        p-4 rounded-full shadow-lg
        transition-all duration-300 transform hover:scale-110
        ${characterType === 'unicorn' 
          ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600' 
          : 'bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-600'}
      `}
      aria-label="Try a different word"
    >
      <Shuffle className="w-8 h-8" />
    </button>
  );
}