import { CurriculumLevel } from '../../types/curriculum';

export const level4: CurriculumLevel = {
  level: 4,
  content: {
    title: "Multi-Syllabic Words",
    description: "Learning to read longer words through syllable patterns",
    wordFamilies: [
      {
        pattern: "CV/CV",
        words: ["paper", "tiger", "baby", "fairy", "story"],
        examples: ["The paper tiger", "A baby fairy"],
        teachingStrategy: "Break words into syllables using the vowel-consonant pattern",
        troubleshooting: [
          "If student rushes: Draw vertical lines between syllables",
          "For pronunciation issues: Clap out each syllable",
          "When blending is difficult: Practice each syllable separately before combining"
        ]
      },
      {
        pattern: "VC/CV",
        words: ["sister", "monster", "garden", "winter", "puppet"],
        examples: ["Sister in the garden", "Winter monster"],
        teachingStrategy: "Identify the consonant pair in the middle and split between them",
        troubleshooting: [
          "If splitting incorrectly: Mark vowels first, then find splitting point",
          "For stress confusion: Emphasize natural word stress",
          "When reading choppily: Practice smooth transitions between syllables"
        ]
      },
      {
        pattern: "Compound",
        words: ["sunshine", "rainbow", "butterfly", "moonbeam", "starlight"],
        examples: ["Butterfly in the sunshine", "Moonbeam and starlight"],
        teachingStrategy: "Identify the two complete words that make up the compound",
        troubleshooting: [
          "If not recognizing parts: Cover one part at a time",
          "For meaning confusion: Explain each part's meaning",
          "When overwhelmed: Break into familiar words first"
        ]
      }
    ],
    teachingStrategies: [
      "Use syllable division rules consistently",
      "Practice with word building cards",
      "Create visual syllable charts",
      "Use movement to mark syllables"
    ],
    troubleshootingGuide: {
      common: [
        "Rushing through longer words",
        "Skipping syllables",
        "Misplacing stress in words"
      ],
      solutions: [
        "Use syllable scooping with finger",
        "Create syllable cards for manipulation",
        "Practice rhythm and stress patterns",
        "Build confidence with familiar syllables first"
      ],
      prevention: [
        "Regular syllable pattern practice",
        "Systematic word building",
        "Frequent review of learned patterns"
      ]
    }
  },
  assessmentCriteria: [
    "Can break words into syllables",
    "Reads multi-syllabic words fluently",
    "Understands compound words",
    "Uses longer words in sentences"
  ]
};