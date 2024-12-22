import { breakIntoPhonemes } from '../../utils/phonics.js';
import type { WordPhonics } from './types.js';

const words: WordPhonics[] = [
  {
    word: 'knight',
    phonemes: breakIntoPhonemes('knight'),
    translation: 'chevalier',
    translationPhonemes: breakIntoPhonemes('chevalier')
  },
  {
    word: 'castle',
    phonemes: breakIntoPhonemes('castle'),
    translation: 'château',
    translationPhonemes: breakIntoPhonemes('château')
  },
  // Add more words as needed
];

export default words;