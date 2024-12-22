import { breakIntoPhonemes } from '../../utils/phonics.js';
import type { WordPhonics } from './types.js';

const words: WordPhonics[] = [
  {
    word: 'cat',
    phonemes: breakIntoPhonemes('cat'),
    translation: 'chat',
    translationPhonemes: breakIntoPhonemes('chat')
  },
  {
    word: 'dog',
    phonemes: breakIntoPhonemes('dog'),
    translation: 'chien',
    translationPhonemes: breakIntoPhonemes('chien')
  },
  // Add more words as needed
];

export default words;