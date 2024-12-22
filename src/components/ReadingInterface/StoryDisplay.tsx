import React from 'react';
import { useStore } from '../../store/useStore';
import { SightWord } from './SightWord';
import { SuccessButton } from './SuccessButton';

interface Props {
  word: string;
  translation: string;
  onWordRead: (text: string, isFrench: boolean) => void;
  wordCompleted: boolean;
  onComplete: () => void;
}

export function StoryDisplay({ 
  word, 
  translation, 
  onWordRead, 
  wordCompleted, 
  onComplete 
}: Props) {
  return (
    <div className="grid grid-cols-[1fr,auto] gap-8 items-center">
      <SightWord 
        word={word}
        translation={translation}
        onRead={onWordRead}
      />

      <div className={`self-center transition-opacity duration-300 ${wordCompleted ? 'opacity-100' : 'opacity-0'}`}>
        <SuccessButton onClick={onComplete} />
      </div>
    </div>
  );
}