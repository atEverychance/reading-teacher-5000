import config from './phonemeConfig.js';

export type PhonemeType = 'vowel' | 'consonant' | 'blend' | 'digraph';

export type VowelType = 'short' | 'long';

export interface BasePhonemeInfo {
  sound: string;
  examples: string[];
  description: string;
}

export interface PhonemeWithIPA extends BasePhonemeInfo {
  ipa: string;
}

export interface BlendInfo extends BasePhonemeInfo {
  components: string[];
  ipa?: string;
}

export interface WordPhonics {
  word: string;
  phonemes: string[];
  translation: string;
  translationPhonemes: string[];
}

export type PhonemeConfig = typeof config;