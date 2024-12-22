import React from 'react';
import { Check } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface Props {
  onClick: () => void;
}

export function SuccessButton({ onClick }: Props) {
  const activeCharacter = useStore((state) => state.activeCharacter);
  const characterType = activeCharacter?.type || 'unicorn';

  return (
    <button
      onClick={onClick}
      className={`
        p-6 rounded-full shadow-lg
        transition-all duration-300 transform hover:scale-110 active:scale-95
        ${characterType === 'unicorn' 
          ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-400' 
          : 'bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400'}
      `}
    >
      <Check className="w-16 h-16 text-white animate-bounce" />
    </button>
  );
}