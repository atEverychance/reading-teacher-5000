import { FRENCH_PHONEMES, FRENCH_SYLLABLE_RULES } from '../data/phonics/french';
import { Phoneme } from '../data/phonics/types';
import { PHONEME_TYPES, VOWEL_SOUNDS } from '../data/phonics/constants';

export function breakIntoPhonemes(word: string, isFrench: boolean = false): Phoneme[] {
  const phonemes: Phoneme[] = [];
  let remaining = word.toLowerCase();

  while (remaining.length > 0) {
    let matched = false;

    // Check for digraphs and special sounds first
    const patterns = isFrench ? FRENCH_SYLLABLE_RULES : [
      { pattern: /^(ch|sh|th|wh|ph|gh|ck)/, type: PHONEME_TYPES.DIGRAPH },
      { pattern: /^(tr|dr)/, type: PHONEME_TYPES.BLEND },
      { pattern: /^([bcdfghjklmnpqrstvwxz][rlw]|[st][rlw]|[s][mnptkw])/, type: PHONEME_TYPES.BLEND },
      { pattern: /^([aeiou][aeiou])/, type: PHONEME_TYPES.VOWEL }
    ];

    for (const { pattern, type } of patterns) {
      const match = remaining.match(pattern);
      if (match && match.index === 0) {
        phonemes.push({
          sound: match[0],
          type: type as any,
          ...(type === PHONEME_TYPES.VOWEL && !isFrench && {
            vowelSound: getVowelSound(match[0])
          })
        });
        remaining = remaining.slice(match[0].length);
        matched = true;
        break;
      }
    }

    // If no special pattern matched, treat as single character
    if (!matched) {
      const char = remaining[0];
      const isVowel = /[aeiouéèêëïîôöûü]/i.test(char);
      
      phonemes.push({
        sound: char,
        type: isVowel ? PHONEME_TYPES.VOWEL : PHONEME_TYPES.CONSONANT,
        ...(isVowel && !isFrench && {
          vowelSound: getVowelSound(char)
        })
      });
      remaining = remaining.slice(1);
    }
  }

  return phonemes;
}

function getVowelSound(vowel: string): typeof VOWEL_SOUNDS[keyof typeof VOWEL_SOUNDS] {
  const vowelMap = {
    a: VOWEL_SOUNDS.SHORT_A,
    e: VOWEL_SOUNDS.SHORT_E,
    i: VOWEL_SOUNDS.SHORT_I,
    o: VOWEL_SOUNDS.SHORT_O,
    u: VOWEL_SOUNDS.SHORT_U,
    ai: VOWEL_SOUNDS.LONG_A,
    ee: VOWEL_SOUNDS.LONG_E,
    ea: VOWEL_SOUNDS.LONG_E,
    ie: VOWEL_SOUNDS.LONG_I,
    oa: VOWEL_SOUNDS.LONG_O,
    oo: VOWEL_SOUNDS.LONG_U
  };

  return vowelMap[vowel.toLowerCase()] || VOWEL_SOUNDS.SHORT_A;
}