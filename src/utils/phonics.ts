import { PhonemeType } from '../data/phonics/types.js';
import { getPhonemeInfo } from '../data/phonics/phonemeConfig.js';

const FRENCH_PHONEMES = new Set(['é', 'è', 'ê', 'ë', 'à', 'â', 'î', 'ï', 'ô', 'û', 'ù', 'ç']);

export function breakIntoPhonemes(word: string): string[] {
  const phonemes: string[] = [];
  let remaining = word;
  let isFrench = false;

  while (remaining.length > 0) {
    // Check for French phonemes
    if (FRENCH_PHONEMES.has(remaining[0])) {
      phonemes.push(remaining[0]);
      remaining = remaining.slice(1);
      isFrench = true;
      continue;
    }

    // Try to match phoneme patterns
    const patterns = [
      { pattern: /^(ch|sh|th|wh|ph|gh|ck)/, type: 'digraph' as PhonemeType },
      { pattern: /^(tr|dr)/, type: 'blend' as PhonemeType },
      { pattern: /^([bcdfghjklmnpqrstvwxz][rlw]|[st][rlw]|[s][mnptkw])/, type: 'blend' as PhonemeType },
      { pattern: /^([aeiou][aeiou])/, type: 'vowel' as PhonemeType }
    ];

    let matched = false;
    for (const { pattern } of patterns) {
      const match = remaining.match(pattern);
      if (match) {
        const [phoneme] = match;
        if (getPhonemeInfo(phoneme)) {
          phonemes.push(phoneme);
          remaining = remaining.slice(phoneme.length);
          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      // Single character phoneme
      phonemes.push(remaining[0]);
      remaining = remaining.slice(1);
    }
  }

  return phonemes;
}