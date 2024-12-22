import { PHONEME_TYPES as P, VOWEL_SOUNDS as V } from './constants';
import type { WordPhonics } from './types';

export const LEVEL3_WORDS: Record<string, WordPhonics> = {
  'dragon': {
    word: 'dragon',
    phonemes: [
      { sound: 'dr', type: P.BLEND },
      { sound: 'a', type: P.VOWEL, vowelSound: V.SHORT_A },
      { sound: 'g', type: P.CONSONANT },
      { sound: 'on', type: P.BLEND }
    ],
    translation: 'dragon',
    translationPhonemes: [
      { sound: 'dra', type: P.BLEND },
      { sound: 'gon', type: P.BLEND }
    ]
  },
  'dream': {
    word: 'dream',
    phonemes: [
      { sound: 'dr', type: P.BLEND },
      { sound: 'ea', type: P.VOWEL, vowelSound: V.LONG_E },
      { sound: 'm', type: P.CONSONANT }
    ],
    translation: 'rêve',
    translationPhonemes: [
      { sound: 'rê', type: P.BLEND },
      { sound: 've', type: P.BLEND }
    ]
  },
  'tree': {
    word: 'tree',
    phonemes: [
      { sound: 'tr', type: P.BLEND },
      { sound: 'ee', type: P.VOWEL, vowelSound: V.LONG_E }
    ],
    translation: 'arbre',
    translationPhonemes: [
      { sound: 'ar', type: P.BLEND },
      { sound: 'bre', type: P.BLEND }
    ]
  },
  'troll': {
    word: 'troll',
    phonemes: [
      { sound: 'tr', type: P.BLEND },
      { sound: 'o', type: P.VOWEL, vowelSound: V.SHORT_O },
      { sound: 'll', type: P.DIGRAPH }
    ],
    translation: 'troll',
    translationPhonemes: [
      { sound: 'tr', type: P.BLEND },
      { sound: 'oll', type: P.BLEND }
    ]
  },
  'forest': {
    word: 'forest',
    phonemes: [
      { sound: 'f', type: P.CONSONANT },
      { sound: 'or', type: P.BLEND },
      { sound: 'est', type: P.BLEND }
    ],
    translation: 'forêt',
    translationPhonemes: [
      { sound: 'fo', type: P.BLEND },
      { sound: 'rêt', type: P.BLEND }
    ]
  }
};