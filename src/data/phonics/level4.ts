import { PHONEME_TYPES as P, VOWEL_SOUNDS as V } from './constants.js';
import type { WordPhonics } from './types.js';

export const LEVEL4_WORDS: Record<string, WordPhonics> = {
  'paper': {
    word: 'paper',
    phonemes: [
      { sound: 'p', type: P.CONSONANT },
      { sound: 'a', type: P.VOWEL, vowelSound: V.LONG_A },
      { sound: 'p', type: P.CONSONANT },
      { sound: 'er', type: P.BLEND }
    ],
    translation: 'papier',
    translationPhonemes: [
      { sound: 'pa', type: P.BLEND },
      { sound: 'pier', type: P.BLEND }
    ]
  },
  'tiger': {
    word: 'tiger',
    phonemes: [
      { sound: 't', type: P.CONSONANT },
      { sound: 'i', type: P.VOWEL, vowelSound: V.LONG_I },
      { sound: 'g', type: P.CONSONANT },
      { sound: 'er', type: P.BLEND }
    ],
    translation: 'tigre',
    translationPhonemes: [
      { sound: 'ti', type: P.BLEND },
      { sound: 'gre', type: P.BLEND }
    ]
  },
  'sister': {
    word: 'sister',
    phonemes: [
      { sound: 's', type: P.CONSONANT },
      { sound: 'i', type: P.VOWEL, vowelSound: V.SHORT_I },
      { sound: 's', type: P.CONSONANT },
      { sound: 't', type: P.CONSONANT },
      { sound: 'er', type: P.BLEND }
    ],
    translation: 'soeur',
    translationPhonemes: [
      { sound: 'soeur', type: P.BLEND }
    ]
  },
  'garden': {
    word: 'garden',
    phonemes: [
      { sound: 'g', type: P.CONSONANT },
      { sound: 'ar', type: P.BLEND },
      { sound: 'd', type: P.CONSONANT },
      { sound: 'en', type: P.BLEND }
    ],
    translation: 'jardin',
    translationPhonemes: [
      { sound: 'jar', type: P.BLEND },
      { sound: 'din', type: P.BLEND }
    ]
  },
  'sunshine': {
    word: 'sunshine',
    phonemes: [
      { sound: 's', type: P.CONSONANT },
      { sound: 'u', type: P.VOWEL, vowelSound: V.SHORT_U },
      { sound: 'n', type: P.CONSONANT },
      { sound: 'sh', type: P.DIGRAPH },
      { sound: 'i', type: P.VOWEL, vowelSound: V.LONG_I },
      { sound: 'ne', type: P.BLEND }
    ],
    translation: 'soleil',
    translationPhonemes: [
      { sound: 'so', type: P.BLEND },
      { sound: 'leil', type: P.BLEND }
    ]
  },
  'rainbow': {
    word: 'rainbow',
    phonemes: [
      { sound: 'r', type: P.CONSONANT },
      { sound: 'ai', type: P.VOWEL, vowelSound: V.LONG_A },
      { sound: 'n', type: P.CONSONANT },
      { sound: 'b', type: P.CONSONANT },
      { sound: 'ow', type: P.VOWEL, vowelSound: V.LONG_O }
    ],
    translation: 'arc-en-ciel',
    translationPhonemes: [
      { sound: 'arc', type: P.BLEND },
      { sound: 'en', type: P.BLEND },
      { sound: 'ciel', type: P.BLEND }
    ]
  }
};