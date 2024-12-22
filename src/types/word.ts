import { CharacterType } from './index';

export interface WordWithTranslation {
  english: string;
  french: string;
  englishSyllables: string[];
  frenchSyllables: string[];
  pattern: string;
}

export interface Word {
  english: string;
  french: string;
  pattern: string;
  phonemes: Array<{ sound: string }>;
  level: {
    words: Word[];
  };
}

export interface WordFamily {
  pattern: string;
  description: string;
  words: Word[];
  examples: string[];
  teachingStrategy: string;
}

export interface LevelTheme {
  characterType: CharacterType;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}