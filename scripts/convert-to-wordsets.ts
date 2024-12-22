import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import current data
import { level1 } from '../src/data/curriculum/level1.js';
import { level2 } from '../src/data/curriculum/level2.js';
import { level3 } from '../src/data/curriculum/level3.js';
import { level4 } from '../src/data/curriculum/level4.js';
import { LEVEL1_WORDS } from '../src/data/phonics/level1.js';
import { LEVEL2_WORDS } from '../src/data/phonics/level2.js';
import { LEVEL3_WORDS } from '../src/data/phonics/level3.js';
import { LEVEL4_WORDS } from '../src/data/phonics/level4.js';

const levels = [level1, level2, level3, level4];
const phonicsWords = [LEVEL1_WORDS, LEVEL2_WORDS, LEVEL3_WORDS, LEVEL4_WORDS];

async function convertToWordSets() {
  const baseDir = path.join(dirname(__dirname), 'src', 'data', 'wordsets', 'default');
  const levelsDir = path.join(baseDir, 'levels');

  // Ensure directories exist
  await fs.mkdir(baseDir, { recursive: true });
  await fs.mkdir(levelsDir, { recursive: true });

  // Convert each level
  for (let i = 0; i < levels.length; i++) {
    const level = levels[i];
    const phonics = phonicsWords[i];
    
    const levelContent = {
      wordFamilies: level.content.wordFamilies.map(family => ({
        pattern: family.pattern,
        words: family.words.map(word => {
          const phonicsData = phonics[word.toLowerCase()];
          return {
            english: word,
            translation: phonicsData?.translation || '',
            phonemes: phonicsData?.phonemes || [],
            translationPhonemes: phonicsData?.translationPhonemes || [],
            examples: family.examples || []
          };
        })
      }))
    };

    // Write level file
    await fs.writeFile(
      path.join(levelsDir, `level${level.level}.json`),
      JSON.stringify(levelContent, null, 2)
    );

    // Validate the output matches our schema
    console.log(`Validating level ${level.level}...`);
    validateLevel(levelContent);
  }

  // Create metadata file
  const metadata = {
    name: "Reading Teacher 5000 - Core Word Set",
    description: "A progressive phonics-based curriculum for early readers",
    version: "1.0.0",
    language: "english",
    targetAge: {
      min: 4,
      max: 8
    },
    levels: levels.map(level => ({
      id: level.level,
      title: level.content.title,
      description: level.content.description
    }))
  };

  await fs.writeFile(
    path.join(baseDir, 'metadata.json'),
    JSON.stringify(metadata, null, 2)
  );

  // Create teaching file
  const teaching = {
    strategies: Object.fromEntries(
      levels.map(level => [
        `level${level.level}`,
        level.content.teachingStrategies
      ])
    ),
    assessmentCriteria: Object.fromEntries(
      levels.map(level => [
        `level${level.level}`,
        level.assessmentCriteria
      ])
    )
  };

  await fs.writeFile(
    path.join(baseDir, 'teaching.json'),
    JSON.stringify(teaching, null, 2)
  );

  console.log('Conversion complete! Files written to:');
  console.log(`- ${path.join(baseDir, 'metadata.json')}`);
  console.log(`- ${path.join(baseDir, 'teaching.json')}`);
  console.log(`- ${levelsDir}/level[1-4].json`);
}

// Validation functions
function validateLevel(level: any) {
  if (!level.wordFamilies || !Array.isArray(level.wordFamilies)) {
    throw new Error('Level must have wordFamilies array');
  }

  level.wordFamilies.forEach((family: any, index: number) => {
    if (!family.pattern) {
      throw new Error(`Word family ${index} must have a pattern`);
    }
    if (!family.words || !Array.isArray(family.words)) {
      throw new Error(`Word family ${family.pattern} must have words array`);
    }

    family.words.forEach((word: any, wordIndex: number) => {
      if (!word.english) {
        throw new Error(`Word ${wordIndex} in family ${family.pattern} must have english word`);
      }
      if (!word.phonemes || !Array.isArray(word.phonemes)) {
        throw new Error(`Word ${word.english} must have phonemes array`);
      }
      word.phonemes.forEach((phoneme: any, phonemeIndex: number) => {
        if (!phoneme.sound) {
          throw new Error(`Phoneme ${phonemeIndex} in word ${word.english} must have sound`);
        }
        if (!phoneme.type) {
          throw new Error(`Phoneme ${phonemeIndex} in word ${word.english} must have type`);
        }
      });
    });
  });
}

// Run the conversion
convertToWordSets().catch(console.error);
