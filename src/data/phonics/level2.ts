import { breakIntoPhonemes } from '../../utils/phonics.js';
import type { WordPhonics } from './types.js';

const words: WordPhonics[] = [
  {
    word: 'play',
    phonemes: breakIntoPhonemes('play'),
    translation: 'jouer',
    translationPhonemes: breakIntoPhonemes('jouer')
  },
  {
    word: 'stay',
    phonemes: breakIntoPhonemes('stay'),
    translation: 'rester',
    translationPhonemes: breakIntoPhonemes('rester')
  },
  // Add more words as needed
];

export default words;