import { PHONEME_TYPES as P, VOWEL_SOUNDS as V } from './constants.js';
import type { WordPhonics } from './types.js';

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
  },
  'dig': {
    word: 'dig',
    phonemes: [
      { sound: 'd', type: P.CONSONANT },
      { sound: 'i', type: P.VOWEL, vowelSound: V.SHORT_I },
      { sound: 'g', type: P.CONSONANT }
    ],
    translation: 'creuser',
    translationPhonemes: [
      { sound: 'creu', type: P.BLEND },
      { sound: 'ser', type: P.BLEND }
    ]
  },
  'pin': {
    word: 'pin',
    phonemes: [
      { sound: 'p', type: P.CONSONANT },
      { sound: 'i', type: P.VOWEL, vowelSound: V.SHORT_I },
      { sound: 'n', type: P.CONSONANT }
    ],
    translation: 'épingle',
    translationPhonemes: [
      { sound: 'é', type: P.VOWEL },
      { sound: 'pin', type: P.BLEND },
      { sound: 'gle', type: P.BLEND }
    ]
  },
  'win': {
    word: 'win',
    phonemes: [
      { sound: 'w', type: P.CONSONANT },
      { sound: 'i', type: P.VOWEL, vowelSound: V.SHORT_I },
      { sound: 'n', type: P.CONSONANT }
    ],
    translation: 'gagner',
    translationPhonemes: [
      { sound: 'ga', type: P.BLEND },
      { sound: 'gner', type: P.BLEND }
    ]
  },
  'tin': {
    word: 'tin',
    phonemes: [
      { sound: 't', type: P.CONSONANT },
      { sound: 'i', type: P.VOWEL, vowelSound: V.SHORT_I },
      { sound: 'n', type: P.CONSONANT }
    ],
    translation: 'étain',
    translationPhonemes: [
      { sound: 'é', type: P.VOWEL },
      { sound: 'tain', type: P.BLEND }
    ]
  },
  'map': {
    word: 'map',
    phonemes: [
      { sound: 'm', type: P.CONSONANT },
      { sound: 'a', type: P.VOWEL, vowelSound: V.SHORT_A },
      { sound: 'p', type: P.CONSONANT }
    ],
    translation: 'carte',
    translationPhonemes: [
      { sound: 'car', type: P.BLEND },
      { sound: 'te', type: P.BLEND }
    ]
  },
  'tap': {
    word: 'tap',
    phonemes: [
      { sound: 't', type: P.CONSONANT },
      { sound: 'a', type: P.VOWEL, vowelSound: V.SHORT_A },
      { sound: 'p', type: P.CONSONANT }
    ],
    translation: 'robinet',
    translationPhonemes: [
      { sound: 'ro', type: P.BLEND },
      { sound: 'bi', type: P.BLEND },
      { sound: 'net', type: P.BLEND }
    ]
  },
  'bag': {
    word: 'bag',
    phonemes: [
      { sound: 'b', type: P.CONSONANT },
      { sound: 'a', type: P.VOWEL, vowelSound: V.SHORT_A },
      { sound: 'g', type: P.CONSONANT }
    ],
    translation: 'sac',
    translationPhonemes: [
      { sound: 's', type: P.CONSONANT },
      { sound: 'ac', type: P.BLEND }
    ]
  },
  'fan': {
    word: 'fan',
    phonemes: [
      { sound: 'f', type: P.CONSONANT },
      { sound: 'a', type: P.VOWEL, vowelSound: V.SHORT_A },
      { sound: 'n', type: P.CONSONANT }
    ],
    translation: 'ventilateur',
    translationPhonemes: [
      { sound: 'ven', type: P.BLEND },
      { sound: 'ti', type: P.BLEND },
      { sound: 'la', type: P.BLEND },
      { sound: 'teur', type: P.BLEND }
    ]
  },
  'pan': {
    word: 'pan',
    phonemes: [
      { sound: 'p', type: P.CONSONANT },
      { sound: 'a', type: P.VOWEL, vowelSound: V.SHORT_A },
      { sound: 'n', type: P.CONSONANT }
    ],
    translation: 'poêle',
    translationPhonemes: [
      { sound: 'poê', type: P.BLEND },
      { sound: 'le', type: P.BLEND }
    ]
  },
  'van': {
    word: 'van',
    phonemes: [
      { sound: 'v', type: P.CONSONANT },
      { sound: 'a', type: P.VOWEL, vowelSound: V.SHORT_A },
      { sound: 'n', type: P.CONSONANT }
    ],
    translation: 'camionnette',
    translationPhonemes: [
      { sound: 'cam', type: P.BLEND },
      { sound: 'i', type: P.VOWEL },
      { sound: 'on', type: P.BLEND },
      { sound: 'nette', type: P.BLEND }
    ]
  },
  'hot': {
    word: 'hot',
    phonemes: [
      { sound: 'h', type: P.CONSONANT },
      { sound: 'o', type: P.VOWEL, vowelSound: V.SHORT_O },
      { sound: 't', type: P.CONSONANT }
    ],
    translation: 'chaud',
    translationPhonemes: [
      { sound: 'ch', type: P.DIGRAPH },
      { sound: 'aud', type: P.BLEND }
    ]
  },
  'not': {
    word: 'not',
    phonemes: [
      { sound: 'n', type: P.CONSONANT },
      { sound: 'o', type: P.VOWEL, vowelSound: V.SHORT_O },
      { sound: 't', type: P.CONSONANT }
    ],
    translation: 'pas',
    translationPhonemes: [
      { sound: 'p', type: P.CONSONANT },
      { sound: 'as', type: P.BLEND }
    ]
  },
  'sun': {
    word: 'sun',
    phonemes: [
      { sound: 's', type: P.CONSONANT },
      { sound: 'u', type: P.VOWEL, vowelSound: V.SHORT_U },
      { sound: 'n', type: P.CONSONANT }
    ],
    translation: 'soleil',
    translationPhonemes: [
      { sound: 'so', type: P.BLEND },
      { sound: 'leil', type: P.BLEND }
    ]
  },
  'fun': {
    word: 'fun',
    phonemes: [
      { sound: 'f', type: P.CONSONANT },
      { sound: 'u', type: P.VOWEL, vowelSound: V.SHORT_U },
      { sound: 'n', type: P.CONSONANT }
    ],
    translation: 'amusement',
    translationPhonemes: [
      { sound: 'a', type: P.VOWEL },
      { sound: 'mu', type: P.BLEND },
      { sound: 'se', type: P.BLEND },
      { sound: 'ment', type: P.BLEND }
    ]
  },
  'sit': {
    word: 'sit',
    phonemes: [
      { sound: 's', type: P.CONSONANT },
      { sound: 'i', type: P.VOWEL, vowelSound: V.SHORT_I },
      { sound: 't', type: P.CONSONANT }
    ],
    translation: "s'asseoir",
    translationPhonemes: [
      { sound: 's', type: P.CONSONANT },
      { sound: 'as', type: P.BLEND },
      { sound: 'se', type: P.BLEND },
      { sound: 'oir', type: P.BLEND }
    ]
  },
  'hit': {
    word: 'hit',
    phonemes: [
      { sound: 'h', type: P.CONSONANT },
      { sound: 'i', type: P.VOWEL, vowelSound: V.SHORT_I },
      { sound: 't', type: P.CONSONANT }
    ],
    translation: 'frapper',
    translationPhonemes: [
      { sound: 'fra', type: P.BLEND },
      { sound: 'ppe', type: P.BLEND },
      { sound: 'r', type: P.CONSONANT }
    ]
  },
  'get': {
    word: 'get',
    phonemes: [
      { sound: 'g', type: P.CONSONANT },
      { sound: 'e', type: P.VOWEL, vowelSound: V.SHORT_E },
      { sound: 't', type: P.CONSONANT }
    ],
    translation: 'obtenir',
    translationPhonemes: [
      { sound: 'ob', type: P.BLEND },
      { sound: 'te', type: P.BLEND },
      { sound: 'nir', type: P.BLEND }
    ]
  },
  'set': {
    word: 'set',
    phonemes: [
      { sound: 's', type: P.CONSONANT },
      { sound: 'e', type: P.VOWEL, vowelSound: V.SHORT_E },
      { sound: 't', type: P.CONSONANT }
    ],
    translation: 'ensemble',
    translationPhonemes: [
      { sound: 'en', type: P.BLEND },
      { sound: 'sem', type: P.BLEND },
      { sound: 'ble', type: P.BLEND }
    ]
  },
  'lip': {
    word: 'lip',
    phonemes: [
      { sound: 'l', type: P.CONSONANT },
      { sound: 'i', type: P.VOWEL, vowelSound: V.SHORT_I },
      { sound: 'p', type: P.CONSONANT }
    ],
    translation: 'lèvre',
    translationPhonemes: [
      { sound: 'le', type: P.BLEND },
      { sound: 'v', type: P.CONSONANT },
      { sound: 're', type: P.BLEND }
    ]
  },
  'rip': {
    word: 'rip',
    phonemes: [
      { sound: 'r', type: P.CONSONANT },
      { sound: 'i', type: P.VOWEL, vowelSound: V.SHORT_I },
      { sound: 'p', type: P.CONSONANT }
    ],
    translation: 'déchirer',
    translationPhonemes: [
      { sound: 'de', type: P.BLEND },
      { sound: 'chi', type: P.BLEND },
      { sound: 'rer', type: P.BLEND }
    ]
  },
  'cop': {
    word: 'cop',
    phonemes: [
      { sound: 'c', type: P.CONSONANT },
      { sound: 'o', type: P.VOWEL, vowelSound: V.SHORT_O },
      { sound: 'p', type: P.CONSONANT }
    ],
    translation: 'policier',
    translationPhonemes: [
      { sound: 'po', type: P.BLEND },
      { sound: 'li', type: P.BLEND },
      { sound: 'cie', type: P.BLEND },
      { sound: 'r', type: P.CONSONANT }
    ]
  },
  'hop': {
    word: 'hop',
    phonemes: [
      { sound: 'h', type: P.CONSONANT },
      { sound: 'o', type: P.VOWEL, vowelSound: V.SHORT_O },
      { sound: 'p', type: P.CONSONANT }
    ],
    translation: 'sauter',
    translationPhonemes: [
      { sound: 'sau', type: P.BLEND },
      { sound: 'te', type: P.BLEND },
      { sound: 'r', type: P.CONSONANT }
    ]
  },
  'cup': {
    word: 'cup',
    phonemes: [
      { sound: 'c', type: P.CONSONANT },
      { sound: 'u', type: P.VOWEL, vowelSound: V.SHORT_U },
      { sound: 'p', type: P.CONSONANT }
    ],
    translation: 'tasse',
    translationPhonemes: [
      { sound: 'ta', type: P.BLEND },
      { sound: 'sse', type: P.BLEND }
    ]
  },
  'up': {
    word: 'up',
    phonemes: [
      { sound: 'u', type: P.VOWEL, vowelSound: V.SHORT_U },
      { sound: 'p', type: P.CONSONANT }
    ],
    translation: 'haut',
    translationPhonemes: [
      { sound: 'hau', type: P.BLEND },
      { sound: 't', type: P.CONSONANT }
    ]
  }
};