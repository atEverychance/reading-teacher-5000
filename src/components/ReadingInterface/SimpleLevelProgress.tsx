import React from 'react';
import { useStore } from '../../store/useStore';
import { Star, Crown } from 'lucide-react';

interface Props {
  starsEarned: number;
  totalStars: number;
  currentLevel: number;
}

export function SimpleLevelProgress({ starsEarned, totalStars, currentLevel }: Props) {
  const activeCharacter = useStore(state => state.activeCharacter);
  const characterType = activeCharacter?.type || 'unicorn';

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <Crown className={`w-8 h-8 ${
          characterType === 'unicorn' ? 'text-purple-400' : 'text-cyan-400'
        }`} />
        <span className={`text-2xl font-bold ${
          characterType === 'unicorn' ? 'text-purple-800' : 'text-cyan-800'
        }`}>
          {activeCharacter?.name}'s Level {currentLevel}
        </span>
      </div>

      <div className="flex justify-center gap-4 p-4">
        {Array.from({ length: totalStars }).map((_, i) => (
          <Star
            key={i}
            className={`w-12 h-12 transition-all duration-300 ${
              i < starsEarned
                ? `${characterType === 'unicorn' ? 'text-yellow-400' : 'text-yellow-400'} 
                   scale-110 animate-pulse`
                : 'text-gray-300'
            }`}
            fill={i < starsEarned ? 'currentColor' : 'none'}
          />
        ))}
      </div>
    </div>
  );
}