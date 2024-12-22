import level1 from './level1.js';
import level2 from './level2.js';
import level3 from './level3.js';
import level4 from './level4.js';
import type { WordPhonics } from './types.js';

const WORD_DATA: WordPhonics[] = [
  ...level1,
  ...level2,
  ...level3,
  ...level4
];

export { WORD_DATA };