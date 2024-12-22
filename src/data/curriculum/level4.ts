import type { CurriculumLevel } from '../../types/curriculum.js';
import type { WordData } from '../../types/word.js';

const words: WordData[] = [
  {
    english: 'cup',
    translation: 'tasse',
    phonemes: ['k', 'ʌ', 'p'],
    translationPhonemes: ['t', 'a', 's'],
    examples: [
      'Drink from the cup.',
      'The cup is full.',
      'Put the cup on the table.'
    ]
  },
  {
    english: 'bug',
    translation: 'insecte',
    phonemes: ['b', 'ʌ', 'g'],
    translationPhonemes: ['ɛ̃', 'sɛkt'],
    examples: [
      'Look at the bug.',
      'The bug is small.',
      'I found a bug in the garden.'
    ]
  },
  {
    english: 'sun',
    translation: 'soleil',
    phonemes: ['s', 'ʌ', 'n'],
    translationPhonemes: ['s', 'ɔ', 'l', 'ɛj'],
    examples: [
      'The sun is bright.',
      'Look at the sun.',
      'The sun makes us warm.'
    ]
  }
];

export const level4: CurriculumLevel = {
  level: 4,
  title: 'Short U Words',
  description: 'Practice reading simple words with the short "u" sound.',
  wordFamilies: [
    {
      pattern: 'up',
      words: words.filter(w => w.english.endsWith('up'))
    },
    {
      pattern: 'ug',
      words: words.filter(w => w.english.endsWith('ug'))
    },
    {
      pattern: 'un',
      words: words.filter(w => w.english.endsWith('un'))
    }
  ],
  teachingStrategies: [
    'Focus on the short "u" sound',
    'Use word family patterns',
    'Practice with common objects',
    'Create movement activities'
  ]
};