import { CharacterType } from './index.js';

export interface WordData {
  english: string;
  translation: string;
  phonemes: string[];
  translationPhonemes: string[];
  examples: string[];
}

export interface WordWithTranslation {
  english: string;
  translation: string;
  englishSyllables: string[];
  translationSyllables: string[];
  pattern: string;
  characterType: CharacterType;
}

export interface WordFamily {
  pattern: string;
  words: WordData[];
}

export interface LevelTheme {
  characterType: CharacterType;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}