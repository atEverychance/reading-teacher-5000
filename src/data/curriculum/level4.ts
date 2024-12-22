import { breakIntoPhonemes } from '../../utils/phonics.js';
import type { CurriculumLevel } from '../../types/curriculum.js';

const level4: CurriculumLevel = {
  level: 4,
  title: "Advanced Words",
  description: "Practice with more complex words and sounds.",
  teachingStrategies: [
    "Focus on complex letter combinations",
    "Practice silent letters",
    "Learn common word patterns",
    "Build vocabulary through context"
  ],
  wordFamilies: [
    {
      pattern: "ight",
      words: [
        {
          english: "knight",
          french: "chevalier",
          phonemes: breakIntoPhonemes('knight'),
          translationPhonemes: breakIntoPhonemes('chevalier'),
          examples: [
            "The brave knight.",
            "A knight in shining armor."
          ]
        },
        {
          english: "light",
          french: "lumière",
          phonemes: breakIntoPhonemes('light'),
          translationPhonemes: breakIntoPhonemes('lumière'),
          examples: [
            "Turn on the light.",
            "The light is bright."
          ]
        }
      ]
    }
  ]
};

export default level4;