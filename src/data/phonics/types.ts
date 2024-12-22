import { PHONEME_TYPES, VOWEL_SOUNDS } from './constants.js';

export type PhonemeType = typeof PHONEME_TYPES[keyof typeof PHONEME_TYPES];
export type VowelSound = typeof VOWEL_SOUNDS[keyof typeof VOWEL_SOUNDS];

export interface Phoneme {
  sound: string;
  type: PhonemeType;
  vowelSound?: VowelSound;
}

export interface WordPhonics {
  word: string;
  phonemes: Phoneme[];
  translation: string;
  translationPhonemes: Phoneme[];
}