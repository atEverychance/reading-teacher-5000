import { useState, useCallback } from 'react';

interface CelebrationConfig {
  duration?: number;
  onComplete?: () => void;
}

export function useCelebration({ duration = 1500, onComplete }: CelebrationConfig = {}) {
  const [isShowing, setIsShowing] = useState(false);
  const [type, setType] = useState<'word' | 'level'>('word');
  
  const show = useCallback((celebrationType: 'word' | 'level' = 'word') => {
    setType(celebrationType);
    setIsShowing(true);
    
    setTimeout(() => {
      setIsShowing(false);
      onComplete?.();
    }, duration);
  }, [duration, onComplete]);

  return {
    isShowing,
    type,
    show
  };
}