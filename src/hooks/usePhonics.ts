import { useState, useCallback } from 'react';
import { readWord, playPhoneme } from '../data/phonics/sounds.js';
import { getPhonemeSound } from '../data/phonics/phonemeConfig.js';

interface UsePhonicsReturn {
  speak: (word: string, phonemes: string[]) => void;
  speakPhoneme: (phoneme: string) => void;
  isPlaying: boolean;
}

export function usePhonics(): UsePhonicsReturn {
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = useCallback(async (word: string, phonemes: string[] = []) => {
    if (isPlaying) return;
    setIsPlaying(true);
    
    try {
      await readWord(word);
    } catch (error) {
      console.error('Error playing word:', error);
    } finally {
      setIsPlaying(false);
    }
  }, [isPlaying]);

  const speakPhoneme = useCallback(async (phoneme: string) => {
    if (isPlaying) return;
    setIsPlaying(true);
    
    try {
      const sound = getPhonemeSound(phoneme);
      await playPhoneme(sound);
    } catch (error) {
      console.error('Error playing phoneme:', error);
    } finally {
      setIsPlaying(false);
    }
  }, [isPlaying]);

  return { speak, speakPhoneme, isPlaying };
}