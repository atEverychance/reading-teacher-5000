// Initialize speech synthesis
let synth: SpeechSynthesis | null = null;

// Initialize on first user interaction
export function initAudio() {
  if (!synth && window.speechSynthesis) {
    synth = window.speechSynthesis;
  }
}

// Play a single phoneme sound
export async function playPhoneme(phoneme: string): Promise<void> {
  if (!synth) return;
  
  const sound = phoneme.toLowerCase();
  const utterance = new SpeechSynthesisUtterance(sound);
  utterance.lang = 'en-US';
  utterance.rate = 0.6;  // Slower for better sound formation
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
