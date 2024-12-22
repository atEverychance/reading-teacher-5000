import { FRENCH_PHONEMES } from '../data/phonics/french';

// Basic French character validation
const FRENCH_CHARS = new Set([
  ...Object.keys(FRENCH_PHONEMES.VOWELS),
  ...Object.keys(FRENCH_PHONEMES.CONSONANTS),
  'à', 'â', 'ç', 'é', 'è', 'ê', 'ë', 'î', 'ï', 'ô', 'û', 'ù', 'ü', 'ÿ',
  '-', "'", ' '
]);

export function validateTranslation(translation: string): boolean {
  // Convert to lowercase for checking
  const chars = translation.toLowerCase().split('');
  
  // Check if all characters are valid French characters
  return chars.every(char => FRENCH_CHARS.has(char));
}

export function validatePhonemes(phonemes: string[]): boolean {
  return phonemes.every(phoneme => {
    return (
      Object.keys(FRENCH_PHONEMES.VOWELS).includes(phoneme) ||
      Object.keys(FRENCH_PHONEMES.CONSONANTS).includes(phoneme)
    );
  });
}