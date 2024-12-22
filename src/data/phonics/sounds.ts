// Initialize speech synthesis
let synth: SpeechSynthesis | null = null;

// Initialize on first user interaction
export function initAudio() {
  if (!synth && window.speechSynthesis) {
    synth = window.speechSynthesis;
  }
}

// Map of phonemes to their actual sounds
const PHONEME_SOUNDS: { [key: string]: string } = {
  // Single letter sounds
  'a': 'aa',      // as in "cat"
  'e': 'eh',      // as in "bed"
  'i': 'ih',      // as in "sit"
  'o': 'aw',      // as in "hot"
  'u': 'uh',      // as in "cup"
  
  // Long vowels
  'ay': 'ayee',   // as in "say"
  'ee': 'eee',    // as in "see"
  'ie': 'aiy',    // as in "pie"
  'oa': 'ouu',    // as in "boat"
  'oo': 'ooo',    // as in "moon"
  
  // Consonants (using creative combinations)
  'b': 'bih',     // quick 'b' sound
  'c': 'kuh',     // hard 'c' sound
  'd': 'dih',     // quick 'd' sound
  'f': 'fih',     // sustained 'f'
  'g': 'gih',     // hard 'g'
  'h': 'hih',     // breathy 'h'
  'j': 'jih',     // soft 'j'
  'k': 'kih',     // sharp 'k'
  'l': 'el',      // liquid 'l'
  'm': 'em',      // humming 'm'
  'n': 'en',      // nasal 'n'
  'p': 'pih',     // popped 'p'
  'r': 'er',      // curved 'r'
  's': 'sih',     // hissing 's'
  't': 'tih',     // tapped 't'
  'v': 'vih',     // voiced 'v'
  'w': 'wih',     // rounded 'w'
  'x': 'eks',     // 'x' sound
  'y': 'yih',     // curved 'y'
  'z': 'zih',     // buzzing 'z'
  
  // Blends and digraphs (using phonetic approximations)
  'th': 'thih',   // as in "this"
  'sh': 'shih',   // as in "ship"
  'ch': 'chih',   // as in "chip"
  'ph': 'fih',    // as in "phone"
  'wh': 'wih',    // as in "what"
  'ng': 'ing',    // as in "ring"
  'qu': 'kwih',   // as in "quick"
  
  // Common blends (using natural combinations)
  'bl': 'bul',    // blended 'bl'
  'br': 'bur',    // blended 'br'
  'cl': 'kul',    // blended 'cl'
  'cr': 'kur',    // blended 'cr'
  'dr': 'dur',    // blended 'dr'
  'fl': 'ful',    // blended 'fl'
  'fr': 'fur',    // blended 'fr'
  'gl': 'gul',    // blended 'gl'
  'gr': 'gur',    // blended 'gr'
  'pl': 'pul',    // blended 'pl'
  'pr': 'pur',    // blended 'pr'
  'sc': 'suk',    // blended 'sc'
  'sk': 'suk',    // blended 'sk'
  'sl': 'sul',    // blended 'sl'
  'sm': 'sum',    // blended 'sm'
  'sn': 'sun',    // blended 'sn'
  'sp': 'sup',    // blended 'sp'
  'st': 'sut',    // blended 'st'
  'sw': 'suw',    // blended 'sw'
  'tr': 'tur'     // blended 'tr'
};

// Play a single phoneme sound
export async function playPhoneme(phoneme: string): Promise<void> {
  if (!synth) return;
  
  const sound = PHONEME_SOUNDS[phoneme.toLowerCase()] || phoneme;
  const utterance = new SpeechSynthesisUtterance(sound);
  utterance.lang = 'en-US';
  utterance.rate = 0.6;  // Even slower for better sound formation
  utterance.pitch = 1.0; // Natural pitch
  utterance.volume = 1.0; // Full volume
  
  return new Promise((resolve) => {
    utterance.onend = () => resolve();
    synth!.speak(utterance);
  });
}

// Read a complete word naturally
export async function readWord(word: string): Promise<void> {
  if (!synth) return;
  
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US';
  utterance.rate = 0.8;
  
  return new Promise((resolve) => {
    utterance.onend = () => resolve();
    synth!.speak(utterance);
  });
}

// Play a sequence of phonemes with timing
export async function playPhonemeSequence(phonemes: string[]): Promise<void> {
  for (const phoneme of phonemes) {
    await playPhoneme(phoneme);
    // Small pause between phonemes
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}
