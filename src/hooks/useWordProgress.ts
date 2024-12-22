import { useState, useCallback } from 'react';
import { Word } from '../types/word';
import { useSupabase } from './useSupabase';

export function useWordProgress(level: number) {
  const [completedWords, setCompletedWords] = useState<Set<string>>(new Set());
  const { updateCharacterProgress } = useSupabase();

  const markWordComplete = useCallback((word: Word) => {
    setCompletedWords(prev => {
      const next = new Set(prev);
      next.add(word.id);
      return next;
    });
  }, []);

  const isWordComplete = useCallback((wordId: string) => {
    return completedWords.has(wordId);
  }, [completedWords]);

  const resetProgress = useCallback(() => {
    setCompletedWords(new Set());
  }, []);

  const getProgressPercentage = useCallback(() => {
    return Math.round((completedWords.size / 7) * 100);
  }, [completedWords]);

  return {
    completedWords,
    markWordComplete,
    isWordComplete,
    resetProgress,
    getProgressPercentage
  };
}