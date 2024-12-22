import React from 'react';
import { useStore } from '../../store/useStore';

interface Props {
  level: number;
}

export function Title({ level }: Props) {
  const { activeCharacter } = useStore();

  // Create arrays of stars based on the current level
  const stars = Array(level).fill('✨');

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50">
      <div className="flex items-center gap-1">
        {stars.map((_, i) => (
          <span key={i} className="text-white text-xl animate-pulse">✨</span>
        ))}
      </div>
      <h1 className="text-2xl font-heading font-bold text-white">
        {activeCharacter?.name}
      </h1>
      <div className="flex items-center gap-1">
        {stars.map((_, i) => (
          <span key={i} className="text-white text-xl animate-pulse">✨</span>
        ))}
      </div>
    </div>
  );
}