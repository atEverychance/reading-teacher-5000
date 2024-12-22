import type { CurriculumLevel } from '../../types/curriculum.js';
import type { WordData } from '../../types/word.js';

const words: WordData[] = [
  {
    english: 'hop',
    translation: 'sauter',
    phonemes: ['h', 'ɒ', 'p'],
    translationPhonemes: ['s', 'o', 't', 'e'],
    examples: [
      'The rabbit can hop.',
      'Hop on one foot.',
      'Watch the frog hop.'
    ]
  },
  {
    english: 'top',
    translation: 'haut',
    phonemes: ['t', 'ɒ', 'p'],
    translationPhonemes: ['o'],
    examples: [
      'The top of the tree.',
      'Spin the top.',
      'Climb to the top.'
    ]
  },
  {
    english: 'pop',
    translation: 'éclater',
    phonemes: ['p', 'ɒ', 'p'],
    translationPhonemes: ['e', 'k', 'l', 'a', 't', 'e'],
    examples: [
      'Pop the bubble.',
      'The balloon will pop.',
      'Listen to the popcorn pop.'
    ]
  }
];

export const level3: CurriculumLevel = {
  level: 3,
  title: 'Short O Words',
  description: 'Practice reading simple words with the short "o" sound.',
  wordFamilies: [
    {
      pattern: 'op',
      words: words.filter(w => w.english.endsWith('op'))
    }
  ],
  teachingStrategies: [
    'Focus on the short "o" sound',
    'Use word family patterns',
    'Practice with action words',
    'Create movement activities'
  ]
};