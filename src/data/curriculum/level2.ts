import type { CurriculumLevel } from '../../types/curriculum.js';
import type { WordData } from '../../types/word.js';

const words: WordData[] = [
  {
    english: 'pig',
    translation: 'cochon',
    phonemes: ['p', 'ɪ', 'g'],
    translationPhonemes: ['k', 'ɔ', 'ʃ', 'ɔ̃'],
    examples: [
      'The pig is pink.',
      'I saw a big pig.',
      'The pig likes to play in the mud.'
    ]
  },
  {
    english: 'big',
    translation: 'grand',
    phonemes: ['b', 'ɪ', 'g'],
    translationPhonemes: ['g', 'ʁ', 'ɑ̃'],
    examples: [
      'Look at the big tree.',
      'The big dog is friendly.',
      'I have a big house.'
    ]
  },
  {
    english: 'dig',
    translation: 'creuser',
    phonemes: ['d', 'ɪ', 'g'],
    translationPhonemes: ['k', 'ʁ', 'ø', 'z', 'e'],
    examples: [
      'Dogs like to dig holes.',
      'We can dig in the sand.',
      "Let's dig for treasure!"
    ]
  }
];

export const level2: CurriculumLevel = {
  level: 2,
  title: 'Short I Words',
  description: 'Practice reading simple words with the short "i" sound.',
  wordFamilies: [
    {
      pattern: 'ig',
      words: words.filter(w => w.english.endsWith('ig'))
    }
  ],
  teachingStrategies: [
    'Compare short "i" with long "i" sounds',
    'Use word family patterns',
    'Practice with rhyming words',
    'Create simple sentences'
  ]
};