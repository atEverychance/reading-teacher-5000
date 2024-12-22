import { breakIntoPhonemes } from '../../utils/phonics.js';
import type { WordPhonics } from './types.js';

const words: WordPhonics[] = [
  {
    word: 'tree',
    phonemes: breakIntoPhonemes('tree'),
    translation: 'arbre',
    translationPhonemes: breakIntoPhonemes('arbre')
  },
  {
    word: 'green',
    phonemes: breakIntoPhonemes('green'),
    translation: 'vert',
    translationPhonemes: breakIntoPhonemes('vert')
  },
  // Add more words as needed
];

export default words;