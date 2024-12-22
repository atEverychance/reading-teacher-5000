import { WordFamily } from '../types/curriculum';

export const calculateWordProgress = (
  wordFamilies: WordFamily[],
  completedWords: string[]
) => {
  const totalWords = wordFamilies.reduce(
    (sum, family) => sum + family.words.length,
    0
  );
  
  return {
    completed: completedWords.length,
    total: totalWords,
    percentage: Math.round((completedWords.length / totalWords) * 100)
  };
};