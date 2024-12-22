import { CurriculumLevel } from '../../types/curriculum';

export const level1: CurriculumLevel = {
  level: 1,
  content: {
    title: "CVC Words & Word Families",
    description: "Introduction to basic word patterns through fairy tales",
    wordFamilies: [
      {
        pattern: "-at",
        words: ["cat", "hat", "rat", "mat", "pat", "sat"],
        examples: ["The cat in the hat", "A rat on the mat"],
        teachingStrategy: "Use visual cues and sound blending",
        troubleshooting: [
          "If student struggles with blending: Stretch out sounds slowly",
          "For letter confusion: Use tactile letters to feel shapes",
          "When guessing: Cover part of word and reveal slowly"
        ]
      },
      {
        pattern: "-ig/-in",
        words: ["pig", "big", "dig", "pin", "win", "tin"],
        examples: ["The big pig", "I can win"],
        teachingStrategy: "Focus on short 'i' sound consistency",
        troubleshooting: [
          "If mixing up sounds: Compare with long 'i' words",
          "For ending confusion: Practice '-ig' and '-in' separately",
          "When reading too fast: Use sliding motion with finger"
        ]
      },
      {
        pattern: "short a",
        words: ["cat", "map", "tap", "bag", "fan", "pan"],
        examples: ["The cat has a map", "Tap on the pan"],
        teachingStrategy: "Emphasize short 'a' sound pattern",
        troubleshooting: [
          "If confusing with long 'a': Use picture cues",
          "For blending difficulty: Break into individual sounds",
          "When hesitating: Practice with word families"
        ]
      }
    ],
    teachingStrategies: [
      "Use sound tapping for each phoneme",
      "Create word family charts",
      "Practice with rhyming pairs",
      "Use manipulatives for letter sounds"
    ],
    troubleshootingGuide: {
      common: [
        "Difficulty blending sounds",
        "Letter reversals",
        "Guessing from first letter"
      ],
      solutions: [
        "Use sound boxes for each phoneme",
        "Practice with magnetic letters",
        "Create word slides",
        "Use picture support initially"
      ],
      prevention: [
        "Regular phonemic awareness practice",
        "Systematic phonics instruction",
        "Frequent review of learned patterns"
      ]
    }
  },
  assessmentCriteria: [
    "Can identify and read CVC words",
    "Recognizes common word families",
    "Demonstrates understanding of short vowel sounds",
    "Can blend sounds to form words"
  ]
};