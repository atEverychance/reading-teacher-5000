import { useState, useCallback, useEffect } from 'react';
import type { WordData, WordFamily } from '../types/word.js';

export function useRandomWord(wordFamilies: WordFamily[]) {
  const [currentWord, setCurrentWord] = useState<WordData | null>(null);

  const getNewWord = useCallback(() => {
    if (!wordFamilies?.length) {
      setCurrentWord(null);
      return;
    }

    // Get a random word family
    const familyIndex = Math.floor(Math.random() * wordFamilies.length);
    const family = wordFamilies[familyIndex];

    // Get a random word from the family
    const wordIndex = Math.floor(Math.random() * family.words.length);
    const word = family.words[wordIndex];

    setCurrentWord(word);
  }, [wordFamilies]);

  // Initialize with a random word
  useEffect(() => {
    getNewWord();
  }, [getNewWord]);

  return { currentWord, getNewWord };
}