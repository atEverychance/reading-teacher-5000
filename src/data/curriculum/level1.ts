import type { CurriculumLevel } from '../../types/curriculum.js';
import type { WordData } from '../../types/word.js';

const words: WordData[] = [
  {
    english: 'cat',
    translation: 'chat',
    phonemes: ['k', 'æ', 't'],
    translationPhonemes: ['ʃ', 'a'],
    examples: [
      'The cat sat on the mat.',
      'I saw a black cat.',
      'The cat likes to play.'
    ]
  },
  {
    english: 'hat',
    translation: 'chapeau',
    phonemes: ['h', 'æ', 't'],
    translationPhonemes: ['ʃ', 'a', 'p', 'o'],
    examples: [
      'Put on your hat.',
      'The hat is red.',
      'She has a new hat.'
    ]
  },
  {
    english: 'mat',
    translation: 'tapis',
    phonemes: ['m', 'æ', 't'],
    translationPhonemes: ['t', 'a', 'p', 'i'],
    examples: [
      'Sit on the mat.',
      'The mat is clean.',
      'We have a new mat.'
    ]
  }
];

export const level1: CurriculumLevel = {
  level: 1,
  title: 'Short A Words',
  description: 'Practice reading simple words with the short "a" sound.',
  wordFamilies: [
    {
      pattern: 'at',
      words: words.filter(w => w.english.endsWith('at'))
    }
  ],
  teachingStrategies: [
    'Start with individual letter sounds',
    'Practice blending sounds together',
    'Use visual aids and hand motions',
    'Make connections to familiar objects'
  ]
};