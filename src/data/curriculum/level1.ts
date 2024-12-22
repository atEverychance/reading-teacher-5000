import { breakIntoPhonemes } from '../../utils/phonics.js';
import type { CurriculumLevel } from '../../types/curriculum.js';

const level1: CurriculumLevel = {
  level: 1,
  title: "First Steps",
  description: "Start with simple three-letter words using short vowel sounds.",
  teachingStrategies: [
    "Break down each word into individual sounds",
    "Practice blending sounds together",
    "Use visual aids to reinforce letter-sound connections",
    "Encourage repetition and practice"
  ],
  wordFamilies: [
    {
      pattern: "at",
      words: [
        {
          english: "cat",
          french: "chat",
          phonemes: breakIntoPhonemes('cat'),
          translationPhonemes: breakIntoPhonemes('chat'),
          examples: [
            "The cat is sleeping.",
            "I saw a black cat."
          ]
        },
        {
          english: "hat",
          french: "chapeau",
          phonemes: breakIntoPhonemes('hat'),
          translationPhonemes: breakIntoPhonemes('chapeau'),
          examples: [
            "Put on your hat.",
            "The hat is red."
          ]
        }
      ]
    }
  ]
};

export default level1;