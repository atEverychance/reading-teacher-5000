import React from 'react';
import { useStore } from '../../store/useStore';
import { Sparkles, Shell, Wand2, Waves } from 'lucide-react';

interface Props {
  currentLevel: number;
  wordsCompleted: number;
  totalWords: number;
  totalLevels: number;
}

export function LearningStage({ currentLevel, wordsCompleted, totalWords, totalLevels }: Props) {
  const activeCharacter = useStore((state) => state.activeCharacter);
  const characterType = activeCharacter?.type || 'unicorn';

  const ProgressIcon = characterType === 'unicorn' ? Wand2 : Shell;
  const backgroundClass = `bg-${characterType}-level-${currentLevel}`;
  
  return (
    <div className="space-y-6">
      {/* Level progress */}
      <div className="progress-container">
        {Array.from({ length: totalLevels }).map((_, index) => (
          <div
            key={index}
            className={`progress-item ${
              characterType === 'unicorn' ? 'progress-item-unicorn' : 'progress-item-mermaid'
            } ${index < currentLevel ? 'scale-110' : 'opacity-50'}`}
          >
            {characterType === 'unicorn' ? (
              <Sparkles className={`w-8 h-8 ${index < currentLevel ? 'animate-float' : ''}`} />
            ) : (
              <Waves className={`w-8 h-8 ${index < currentLevel ? 'animate-float' : ''}`} />
            )}
          </div>
        ))}
      </div>

      {/* Word progress */}
      <div className="flex justify-center items-center gap-4">
        {Array.from({ length: totalWords }).map((_, index) => (
          <div
            key={index}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              index < wordsCompleted
                ? characterType === 'unicorn'
                  ? 'bg-gradient-to-r from-purple-400 to-pink-400 scale-110'
                  : 'bg-gradient-to-r from-cyan-400 to-blue-400 scale-110'
                : 'bg-gray-200'
            }`}
          >
            <ProgressIcon 
              className={`w-6 h-6 ${
                index < wordsCompleted ? 'text-white animate-float' : 'text-gray-400'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}