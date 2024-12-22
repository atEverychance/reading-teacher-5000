import { useState, useCallback } from 'react';
import { WordFamily } from '../types/curriculum';
import { WORD_DATA } from '../data/phonics/wordData';

interface WordWithTranslation {
  english: string;
  french: string;
  pattern: string;
  englishSyllables: string[];
  frenchSyllables: string[];
}

export function useRandomWord(wordFamilies: WordFamily[]) {
  const [currentWord, setCurrentWord] = useState<WordWithTranslation>(() => {
    const allWords = wordFamilies.flatMap(family => 
      family.words.map(word => {
        const wordData = WORD_DATA[word.toLowerCase()];
        if (!wordData) {
          console.warn(`Missing word data for: ${word}`);
          return {
            english: word,
            french: word, // Use the English word as fallback
            pattern: family.pattern,
            englishSyllables: [word],
            frenchSyllables: [word]
          };
        }
        return {
          english: word,
          french: wordData.translation,
          pattern: family.pattern,
          englishSyllables: wordData.phonemes.map(p => p.sound),
          frenchSyllables: wordData.translationPhonemes.map(p => p.sound)
        };
      })
    );
    return allWords[Math.floor(Math.random() * allWords.length)];
  });

  const getNewWord = useCallback(() => {
    const allWords = wordFamilies.flatMap(family => 
      family.words.map(word => {
        const wordData = WORD_DATA[word.toLowerCase()];
        if (!wordData) {
          console.warn(`Missing word data for: ${word}`);
          return {
            english: word,
            french: word, // Use the English word as fallback
            pattern: family.pattern,
            englishSyllables: [word],
            frenchSyllables: [word]
          };
        }
        return {
          english: word,
          french: wordData.translation,
          pattern: family.pattern,
          englishSyllables: wordData.phonemes.map(p => p.sound),
          frenchSyllables: wordData.translationPhonemes.map(p => p.sound)
        };
      })
    );
    const availableWords = allWords.filter(w => w.english !== currentWord.english);
    const newWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    setCurrentWord(newWord);
  }, [wordFamilies, currentWord]);

  return {
    currentWord,
    getNewWord
  };
}