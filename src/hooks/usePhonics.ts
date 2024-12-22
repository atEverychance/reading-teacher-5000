import { useState, useCallback } from 'react';
import { WORD_DATA } from '../data/phonics/wordData';
import { breakIntoPhonemes } from '../utils/phonics';
import type { Phoneme } from '../data/phonics/types';
import { PHONEME_TYPES } from '../data/phonics/constants';

interface UsePhonicsReturn {
  phonemes: Phoneme[];
  translationPhonemes: Phoneme[];
  playPhoneme: (phoneme: Phoneme, isTranslation: boolean) => void;
  playWord: (isTranslation: boolean) => void;
}

// Special cases for common words where the pronunciation differs from standard rules
const SPECIAL_CASES: Record<string, string[]> = {
  // Level 2 Sight Words
  'were': ['w', 'er'],
  'are': ['ar'],
  'said': ['s', 'ed'],
  'they': ['th', 'ay'],
  'went': ['w', 'ent'],
  'into': ['in', 't', 'oo'],
  'away': ['uh', 'way'],
  'came': ['k', 'aim'],
  'over': ['oh', 'ver'],
  'under': ['un', 'der'],
  'once': ['w', 'un', 's'],
  'upon': ['uh', 'p', 'on'],
  'time': ['t', 'ime'],

  // Level 2 Magic E Words
  'tale': ['t', 'ale'],
  'gate': ['g', 'ate'],
  'make': ['m', 'ake'],
  'take': ['t', 'ake'],
  'wake': ['w', 'ake'],
  'line': ['l', 'ine'],
  'fine': ['f', 'ine'],
  'mine': ['m', 'ine'],
  'pine': ['p', 'ine'],

  // Level 3 Words
  'dragon': ['dra', 'gon'],
  'dream': ['dr', 'eam'],
  'dress': ['dr', 'ess'],
  'troll': ['tr', 'oll'],
  'tree': ['tr', 'ee'],
  'trust': ['tr', 'ust'],
  'forest': ['for', 'est'],
  'beast': ['b', 'east'],

  // Level 4 Words
  'paper': ['pay', 'per'],
  'tiger': ['tie', 'ger'],
  'baby': ['bay', 'bee'],
  'fairy': ['fair', 'ee'],
  'story': ['stor', 'ee'],
  'sister': ['sis', 'ter'],
  'monster': ['mon', 'ster'],
  'garden': ['gar', 'den'],
  'winter': ['win', 'ter'],
  'puppet': ['pup', 'pet'],
  'sunshine': ['sun', 'shine'],
  'rainbow': ['rain', 'bow'],
  'butterfly': ['but', 'ter', 'fly'],
  'moonbeam': ['moon', 'beam'],
  'starlight': ['star', 'light']
};

// Phoneme sounds that better match actual pronunciation
const PHONEME_SOUNDS: Record<string, string> = {
  // Single consonants - use explicit phonetic sounds
  'b': 'buh',
  'c': 'kuh',
  'd': 'duh',
  'f': 'fuh',
  'g': 'guh',
  'h': 'huh',
  'j': 'juh',
  'k': 'kuh',
  'l': 'el',
  'm': 'em',
  'n': 'en',
  'p': 'puh',
  'q': 'kuh',
  'r': 'er',
  's': 'es',
  't': 'tuh',
  'v': 'vuh',
  'w': 'wuh',
  'x': 'eks',
  'y': 'yuh',
  'z': 'zuh',
  
  // Common blends - use phonetic spellings
  'tr': 'truh',
  'dr': 'druh',
  'br': 'bruh',
  'cr': 'kruh',
  'fr': 'fruh',
  'gr': 'gruh',
  'pr': 'pruh',
  'sr': 'sruh',
  'thr': 'thruh',
  'bl': 'bluh',
  'cl': 'kluh',
  'fl': 'fluh',
  'gl': 'gluh',
  'pl': 'pluh',
  'sl': 'sluh',
  'sw': 'swuh',
  'tw': 'twuh',
  'dw': 'dwuh',
  'qu': 'kwuh',
  'sp': 'spuh',
  'st': 'stuh',
  'sk': 'skuh',
  'sm': 'smuh',
  'sn': 'snuh',
  'sc': 'skuh',
  'scr': 'skruh',
  'spr': 'spruh',
  'str': 'struh',
  'spl': 'spluh',
  
  // Digraphs - use distinct sounds
  'th': 'the',
  'sh': 'she',
  'ch': 'che',
  'wh': 'whe',
  'ph': 'fuh',
  'gh': 'guh',
  'ng': 'eng',
  'nk': 'enk',
  
  // Common vowel sounds and patterns
  'a': 'ah',
  'e': 'eh',
  'i': 'ih',
  'o': 'oh',
  'u': 'uh',
  'oo': 'oo',
  'ee': 'ee',
  'ea': 'ee',
  'ai': 'ay',
  'ay': 'ay',
  'oa': 'oh',
  'ow': 'oh',
  'ar': 'ar',
  'or': 'or',
  'air': 'air',
  'ear': 'ear',
  'eer': 'ear',
  'igh': 'eye',
  
  // Common endings
  'ed': 'ed',
  'ing': 'ing',
  'er': 'er',
  'est': 'est',
  'ly': 'lee',
  'ies': 'eez',
  'es': 'ez'
};

export function usePhonics(word: string): UsePhonicsReturn {
  const [playedPhonemes, setPlayedPhonemes] = useState<Set<string>>(new Set());
  
  const wordData = WORD_DATA[word.toLowerCase()] || {
    phonemes: breakIntoPhonemes(word, false),
    translationPhonemes: []
  };

  const playPhoneme = useCallback((phoneme: Phoneme, isTranslation: boolean) => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = isTranslation ? 'fr-FR' : 'en-US';
    utterance.rate = 0.8;

    // Handle special cases for English words
    if (!isTranslation) {
      const lowerWord = word.toLowerCase();
      
      // Get the mapped sound for this phoneme
      let soundToPlay = PHONEME_SOUNDS[phoneme.sound];
      
      // For blends and digraphs, always use the mapped sound if available
      if ((phoneme.type === PHONEME_TYPES.BLEND || phoneme.type === PHONEME_TYPES.DIGRAPH) && soundToPlay) {
        utterance.text = soundToPlay;
        utterance.rate = 1.2; // Speed up blends slightly
      } 
      // Then check special cases
      else if (SPECIAL_CASES[lowerWord]) {
        const specialCaseIndex = SPECIAL_CASES[lowerWord].indexOf(phoneme.sound);
        if (specialCaseIndex !== -1) {
          utterance.text = SPECIAL_CASES[lowerWord][specialCaseIndex];
        } else {
          utterance.text = soundToPlay || phoneme.sound;
        }
      }
      // Finally fall back to the mapped sound or original
      else {
        utterance.text = soundToPlay || phoneme.sound;
      }
    } else {
      utterance.text = phoneme.sound;
    }

    window.speechSynthesis.speak(utterance);
    setPlayedPhonemes(prev => new Set([...prev, phoneme.sound]));
  }, [word]);

  const playWord = useCallback((isTranslation: boolean) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = isTranslation ? 'fr-FR' : 'en-US';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  }, [word]);

  return {
    phonemes: wordData.phonemes,
    translationPhonemes: wordData.translationPhonemes,
    playPhoneme,
    playWord
  };
}