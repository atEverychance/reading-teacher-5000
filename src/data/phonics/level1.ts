import { PHONEME_TYPES as P, VOWEL_SOUNDS as V } from './constants';
import type { WordPhonics } from './types';

export const LEVEL1_WORDS: Record<string, WordPhonics> = {
  'cat': {
    word: 'cat',
    phonemes: [
      { sound: 'c', type: P.CONSONANT },
      { sound: 'a', type: P.VOWEL, vowelSound: V.SHORT_A },
      { sound: 't', type: P.CONSONANT }
    ],
    translation: 'chat',
    translationPhonemes: [
      { sound: 'ch', type: P.DIGRAPH },
      { sound: 'at', type: P.BLEND }
    ]
  },
  'hat': {
    word: 'hat',
    phonemes: [
      { sound: 'h', type: P.CONSONANT },
      { sound: 'a', type: P.VOWEL, vowelSound: V.SHORT_A },
      { sound: 't', type: P.CONSONANT }
    ],
    translation: 'chapeau',
    translationPhonemes: [
      { sound: 'cha', type: P.BLEND },
      { sound: 'peau', type: P.BLEND }
    ]
  },
  'rat': {
    word: 'rat',
    phonemes: [
      { sound: 'r', type: P.CONSONANT },
      { sound: 'a', type: P.VOWEL, vowelSound: V.SHORT_A },
      { sound: 't', type: P.CONSONANT }
    ],
    translation: 'rat',
    translationPhonemes: [
      { sound: 'r', type: P.CONSONANT },
      { sound: 'at', type: P.BLEND }
    ]
  },
  'mat': {
    word: 'mat',
    phonemes: [
      { sound: 'm', type: P.CONSONANT },
      { sound: 'a', type: P.VOWEL, vowelSound: V.SHORT_A },
      { sound: 't', type: P.CONSONANT }
    ],
    translation: 'tapis',
    translationPhonemes: [
      { sound: 'ta', type: P.BLEND },
      { sound: 'pis', type: P.BLEND }
    ]
  },
  'pat': {
    word: 'pat',
    phonemes: [
      { sound: 'p', type: P.CONSONANT },
      { sound: 'a', type: P.VOWEL, vowelSound: V.SHORT_A },
      { sound: 't', type: P.CONSONANT }
    ],
    translation: 'tapoter',
    translationPhonemes: [
      { sound: 'ta', type: P.BLEND },
      { sound: 'po', type: P.BLEND },
      { sound: 'ter', type: P.BLEND }
    ]
  },
  'sat': {
    word: 'sat',
    phonemes: [
      { sound: 's', type: P.CONSONANT },
      { sound: 'a', type: P.VOWEL, vowelSound: V.SHORT_A },
      { sound: 't', type: P.CONSONANT }
    ],
    translation: 'assis',
    translationPhonemes: [
      { sound: 'a', type: P.VOWEL },
      { sound: 'ssis', type: P.BLEND }
    ]
  },
  'pig': {
    word: 'pig',
    phonemes: [
      { sound: 'p', type: P.CONSONANT },
      { sound: 'i', type: P.VOWEL, vowelSound: V.SHORT_I },
      { sound: 'g', type: P.CONSONANT }
    ],
    translation: 'cochon',
    translationPhonemes: [
      { sound: 'co', type: P.BLEND },
      { sound: 'chon', type: P.BLEND }
    ]
  },
  'big': {
    word: 'big',
    phonemes: [
      { sound: 'b', type: P.CONSONANT },
      { sound: 'i', type: P.VOWEL, vowelSound: V.SHORT_I },
      { sound: 'g', type: P.CONSONANT }
    ],
    translation: 'grand',
    translationPhonemes: [
      { sound: 'gr', type: P.BLEND },
      { sound: 'and', type: P.BLEND }
    ]
  }
};