import { PHONEME_TYPES as P, VOWEL_SOUNDS as V } from './constants.js';
import type { WordPhonics } from './types.js';

export const LEVEL2_WORDS: Record<string, WordPhonics> = {
  'once': {
    word: 'once',
    phonemes: [
      { sound: 'o', type: P.VOWEL, vowelSound: V.SHORT_U },
      { sound: 'n', type: P.CONSONANT },
      { sound: 'ce', type: P.BLEND }
    ],
    translation: 'une fois',
    translationPhonemes: [
      { sound: 'une', type: P.BLEND },
      { sound: 'fois', type: P.BLEND }
    ]
  },
  'upon': {
    word: 'upon',
    phonemes: [
      { sound: 'u', type: P.VOWEL, vowelSound: V.SHORT_U },
      { sound: 'p', type: P.CONSONANT },
      { sound: 'o', type: P.VOWEL, vowelSound: V.SHORT_O },
      { sound: 'n', type: P.CONSONANT }
    ],
    translation: 'sur',
    translationPhonemes: [
      { sound: 'sur', type: P.BLEND }
    ]
  },
  'time': {
    word: 'time',
    phonemes: [
      { sound: 't', type: P.CONSONANT },
      { sound: 'i', type: P.VOWEL, vowelSound: V.LONG_I },
      { sound: 'me', type: P.BLEND }
    ],
    translation: 'temps',
    translationPhonemes: [
      { sound: 'temps', type: P.BLEND }
    ]
  },
  'tale': {
    word: 'tale',
    phonemes: [
      { sound: 't', type: P.CONSONANT },
      { sound: 'a', type: P.VOWEL, vowelSound: V.LONG_A },
      { sound: 'le', type: P.BLEND }
    ],
    translation: 'conte',
    translationPhonemes: [
      { sound: 'con', type: P.BLEND },
      { sound: 'te', type: P.BLEND }
    ]
  },
  'gate': {
    word: 'gate',
    phonemes: [
      { sound: 'g', type: P.CONSONANT },
      { sound: 'a', type: P.VOWEL, vowelSound: V.LONG_A },
      { sound: 'te', type: P.BLEND }
    ],
    translation: 'portail',
    translationPhonemes: [
      { sound: 'por', type: P.BLEND },
      { sound: 'tail', type: P.BLEND }
    ]
  }
};