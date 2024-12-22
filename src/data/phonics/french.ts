// French phoneme patterns and rules
export const FRENCH_PHONEMES = {
  VOWELS: {
    'a': 'a',
    'e': 'ə',
    'é': 'e',
    'è': 'ɛ',
    'i': 'i',
    'o': 'o',
    'u': 'y',
    'ou': 'u',
    'ai': 'ɛ',
    'ei': 'ɛ',
    'au': 'o',
    'eau': 'o',
    'eu': 'ø',
    'œu': 'œ',
  },
  CONSONANTS: {
    'b': 'b',
    'c': 'k',
    'ch': 'ʃ',
    'd': 'd',
    'f': 'f',
    'g': 'g',
    'gn': 'ɲ',
    'j': 'ʒ',
    'l': 'l',
    'm': 'm',
    'n': 'n',
    'p': 'p',
    'ph': 'f',
    'qu': 'k',
    'r': 'ʁ',
    's': 's',
    't': 't',
    'v': 'v',
    'z': 'z'
  }
};

export const FRENCH_SYLLABLE_RULES = [
  // Common French syllable patterns
  {
    pattern: /^(ch|ph|th|gn|qu)/,
    type: 'digraph'
  },
  {
    pattern: /^([bcdfgjklmnpqrstvwxz][rl])/,
    type: 'blend'
  },
  {
    pattern: /^([aeiouéèêëïîôöûü])/,
    type: 'vowel'
  }
];