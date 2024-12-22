import { LEVEL1_WORDS } from './level1';
import { LEVEL2_WORDS } from './level2';
import { LEVEL3_WORDS } from './level3';
import { LEVEL4_WORDS } from './level4';
import type { WordPhonics } from './types';

export const WORD_DATA: Record<string, WordPhonics> = {
  ...LEVEL1_WORDS,
  ...LEVEL2_WORDS,
  ...LEVEL3_WORDS,
  ...LEVEL4_WORDS
};