import { breakIntoPhonemes } from '../../utils/phonics.js';
import type { CurriculumLevel } from '../../types/curriculum.js';

const level3: CurriculumLevel = {
  level: 3,
  title: "Consonant Blends",
  description: "Learn to read words with consonant blends at the beginning and end.",
  teachingStrategies: [
    "Practice common blends like 'st', 'bl', 'tr'",
    "Break words into parts",
    "Use visual aids to show blend patterns",
    "Create word families with blends"
  ],
  wordFamilies: [
    {
      pattern: "tr",
      words: [
        {
          english: "tree",
          french: "arbre",
          phonemes: breakIntoPhonemes('tree'),
          translationPhonemes: breakIntoPhonemes('arbre'),
          examples: [
            "Climb the tree.",
            "A tall tree."
          ]
        },
        {
          english: "train",
          french: "train",
          phonemes: breakIntoPhonemes('train'),
          translationPhonemes: breakIntoPhonemes('train'),
          examples: [
            "Take the train.",
            "The train is fast."
          ]
        }
      ]
    }
  ]
};

export default level3;