import { useState, useEffect } from 'react';

interface VoiceOption {
  voice: SpeechSynthesisVoice;
  name: string;
  lang: string;
}

export function useVoiceOptions() {
  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<VoiceOption | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      const voiceOptions = availableVoices
        .filter(voice => voice.lang.startsWith('en') || voice.lang.startsWith('fr'))
        .map(voice => ({
          voice,
          name: voice.name,
          lang: voice.lang
        }));
      
      setVoices(voiceOptions);
      
      // Set default voices
      const defaultEnglish = voiceOptions.find(v => v.lang.startsWith('en')) || voiceOptions[0];
      setSelectedVoice(defaultEnglish);
    };

    // Load voices immediately if available
    loadVoices();

    // Also handle async loading
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speakWord = (text: string, isEnglish: boolean = true) => {
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (selectedVoice) {
      utterance.voice = selectedVoice.voice;
    }
    
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.lang = isEnglish ? 'en-US' : 'fr-FR';
    
    window.speechSynthesis.speak(utterance);
  };

  return {
    voices,
    selectedVoice,
    setSelectedVoice,
    speakWord
  };
}