import { breakIntoPhonemes } from '../../utils/phonics.js';
import type { CurriculumLevel } from '../../types/curriculum.js';

const level2: CurriculumLevel = {
  level: 2,
  title: "Long Vowels",
  description: "Practice words with long vowel sounds and silent 'e'.",
  teachingStrategies: [
    "Introduce the magic 'e' rule",
    "Compare short and long vowel sounds",
    "Practice sight words",
    "Use word families to build confidence"
  ],
  wordFamilies: [
    {
      pattern: "ake",
      words: [
        {
          english: "cake",
          french: "gâteau",
          phonemes: breakIntoPhonemes('cake'),
          translationPhonemes: breakIntoPhonemes('gâteau'),
          examples: [
            "The birthday cake.",
            "Let's bake a cake."
          ]
        },
        {
          english: "make",
          french: "faire",
          phonemes: breakIntoPhonemes('make'),
          translationPhonemes: breakIntoPhonemes('faire'),
          examples: [
            "Make a wish.",
            "Let's make something."
          ]
        }
      ]
    }
  ]
};

export default level2;