import React from 'react';
import { useStore } from '../../store/useStore';
import { getCurrentLevelContent } from '../../data/curriculum';
import { BookOpen } from 'lucide-react';

interface Props {
  level: number;
}

export function LevelInfo({ level }: Props) {
  const activeCharacter = useStore((state) => state.activeCharacter);
  const characterType = activeCharacter?.type || 'unicorn';
  const levelContent = getCurrentLevelContent(level);

  return (
    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className={
          characterType === 'unicorn' ? 'text-purple-200' : 'text-cyan-200'
        } />
        <h2 className="text-xl font-bold text-white">
          {levelContent.content.title}
        </h2>
      </div>
      <p className="text-white/80">
        {levelContent.content.description}
      </p>
    </div>
  );
}