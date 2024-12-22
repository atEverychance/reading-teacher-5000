import { CurriculumLevel } from '../../types/curriculum';

export const level3: CurriculumLevel = {
  level: 3,
  content: {
    title: "Blends & Digraphs",
    description: "Learning common sound combinations through fairy tales",
    wordFamilies: [
      {
        pattern: "dr-",
        words: ["dragon", "dream", "dress"],
        examples: ["The dragon dreams", "Draw a dress"],
        teachingStrategy: "Demonstrate how 'd' and 'r' blend together smoothly",
        troubleshooting: [
          "If student separates sounds: Practice saying 'dr' quickly together",
          "For pronunciation issues: Show mouth position for 'd' then 'r'",
          "When blending is choppy: Use hand motion flowing forward"
        ]
      },
      {
        pattern: "tr-",
        words: ["troll", "tree", "trust"],
        examples: ["The troll under the tree", "Trust the trip"],
        teachingStrategy: "Use tongue twisters to practice 'tr' blend",
        troubleshooting: [
          "If student struggles with 'r': Practice 'r' sound in isolation",
          "For blend confusion: Compare 'tr' with 'dr' sounds",
          "When speed is an issue: Start slow, then gradually increase speed"
        ]
      },
      {
        pattern: "-st",
        words: ["forest", "beast"],
        examples: ["The forest beast", "A dusty nest"],
        teachingStrategy: "Show how 's' and 't' combine at word endings",
        troubleshooting: [
          "If final 't' is dropped: Emphasize complete ending sound",
          "For unclear pronunciation: Practice 'st' in isolation",
          "When blending is difficult: Break into 's' then 't', then combine"
        ]
      }
    ],
    teachingStrategies: [
      "Use hand motions to represent blending sounds together",
      "Practice with alliterative phrases",
      "Create visual cards showing letter combinations",
      "Use movement activities for blend practice"
    ],
    troubleshootingGuide: {
      common: [
        "Student separates blend sounds",
        "Difficulty transitioning between sounds",
        "Inconsistent blend recognition"
      ],
      solutions: [
        "Use sliding motion with finger to show blending",
        "Practice with familiar words first",
        "Create blend families and practice patterns",
        "Use multisensory approaches (visual, auditory, kinesthetic)"
      ],
      prevention: [
        "Regular review of common blends",
        "Consistent practice with new patterns",
        "Building awareness of sounds in speech"
      ]
    }
  },
  assessmentCriteria: [
    "Can identify and read words with blends",
    "Recognizes common digraphs",
    "Uses blends in simple sentences",
    "Demonstrates phonemic awareness"
  ]
};