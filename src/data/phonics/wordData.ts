import { LEVEL1_WORDS } from './level1.js';
import { LEVEL2_WORDS } from './level2.js';
import { LEVEL3_WORDS } from './level3.js';
import { LEVEL4_WORDS } from './level4.js';
import type { WordPhonics } from './types.js';

export const WORD_DATA: Record<string, WordPhonics> = {
  ...LEVEL1_WORDS,
  ...LEVEL2_WORDS,
  ...LEVEL3_WORDS,
  ...LEVEL4_WORDS
};