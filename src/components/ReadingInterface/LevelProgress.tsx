import React from 'react';
import { useStore } from '../../store/useStore';
import { Book, Crown, Star } from 'lucide-react';
import { getCurrentLevelContent } from '../../data/curriculum';

interface Props {
  currentLevel: number;
  wordsCompleted: number;
}

export function LevelProgress({ currentLevel, wordsCompleted }: Props) {
  const activeCharacter = useStore((state) => state.activeCharacter);
  const characterType = activeCharacter?.type || 'unicorn';
  const levelContent = getCurrentLevelContent(currentLevel);
  const totalWords = levelContent.content.wordFamilies.reduce(
    (sum, family) => sum + family.words.length, 
    0
  );

  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-white/20 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Crown className={`w-6 h-6 ${
          characterType === 'unicorn' ? 'text-purple-400' : 'text-cyan-400'
        }`} />
        <span className="text-white font-bold">Level {currentLevel}</span>
      </div>

      <div className="flex items-center gap-2">
        <Book className={`w-6 h-6 ${
          characterType === 'unicorn' ? 'text-pink-400' : 'text-teal-400'
        }`} />
        <div className="flex gap-1">
          {Array.from({ length: totalWords }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 transition-all duration-300 ${
                i < wordsCompleted
                  ? characterType === 'unicorn' 
                    ? 'text-pink-400 scale-110' 
                    : 'text-teal-400 scale-110'
                  : 'text-white/30'
              }`}
              fill={i < wordsCompleted ? 'currentColor' : 'none'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}