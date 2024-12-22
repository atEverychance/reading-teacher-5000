import { CurriculumLevel } from '../../types/curriculum';

export const level2: CurriculumLevel = {
  level: 2,
  content: {
    title: "Sight Words & Short Vowels",
    description: "Common fairy tale words and magic 'e' patterns",
    wordFamilies: [
      {
        pattern: "sight words",
        words: ["once", "upon", "time", "said", "were", "they", "went", "into", "away", "came", "over", "under"],
        examples: ["Once upon a time", "They went away"],
        teachingStrategy: "Use repetition and visual cues. Create word walls with these common words.",
        troubleshooting: [
          "If a student struggles with recognition: Try the 'look, say, cover, write, check' method",
          "For memory issues: Create memorable sentences or stories using the word",
          "When mixing up similar words: Use different colors or highlight distinctive features"
        ]
      },
      {
        pattern: "magic e",
        words: ["tale", "gate", "make", "take", "wake", "time", "line", "fine", "mine", "pine"],
        examples: ["Tell a tale", "Open the gate"],
        teachingStrategy: "Demonstrate how 'e' changes the vowel sound. Use hand signals for short and long vowels.",
        troubleshooting: [
          "If student forgets the rule: Use the phrase 'When two vowels go walking, the first one does the talking'",
          "For pronunciation issues: Exaggerate the long vowel sound",
          "When confusing with short vowels: Create word pairs (tap/tape, pin/pine)"
        ]
      }
    ],
    teachingStrategies: [
      "Use multisensory approaches - visual, auditory, and kinesthetic",
      "Practice with word families and patterns",
      "Create engaging stories using target words",
      "Use movement and gestures to reinforce learning"
    ],
    troubleshootingGuide: {
      common: [
        "Student reads too quickly and makes mistakes",
        "Student gets frustrated and gives up",
        "Student confuses similar-looking words"
      ],
      solutions: [
        "Use a reading guide or finger to track words",
        "Break practice into shorter, more frequent sessions",
        "Create word cards with visual cues",
        "Use positive reinforcement and celebrate small wins",
        "Practice words in context with simple sentences"
      ],
      prevention: [
        "Regular review of learned words",
        "Consistent practice schedule",
        "Building confidence through success"
      ]
    }
  },
  assessmentCriteria: [
    "Recognizes and reads common sight words",
    "Understands magic 'e' pattern",
    "Can identify and read short vowel words",
    "Uses sight words in simple sentences"
  ]
};