import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { CurriculumLevel } from '../src/types/curriculum.js';
import { WordPhonics } from '../src/types/phonics.js';

interface WordSetMetadata {
  name: string;
  description: string;
  version: string;
  language: string;
  targetAge: {
    min: number;
    max: number;
  };
  levels: {
    id: number;
    title: string;
    description: string;
  }[];
}

interface TeachingData {
  strategies: {
    [key: string]: string[];
  };
  assessmentCriteria: {
    [key: string]: string[];
  };
}

interface WordData {
  english: string;
  translation: string;
  phonemes: string[];
  translationPhonemes: string[];
  examples: string[];
}

interface WordFamily {
  pattern: string;
  words: WordData[];
}

interface LevelContent {
  wordFamilies: WordFamily[];
}

interface Phoneme {
  sound: string;
  type: string;
  vowelSound?: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function debugLog(message: string, data?: any) {
  console.log('\n' + message);
  if (data !== undefined) {
    console.log(JSON.stringify(data, null, 2));
  }
}

function parseCurriculumFile(content: string): CurriculumLevel {
  try {
    debugLog('Parsing curriculum file...');
    
    // Remove imports and type annotations
    content = content.replace(/import.*?;(\r?\n|\r)/g, '');
    content = content.replace(/: CurriculumLevel/g, '');
    
    // Extract the object literal
    const match = content.match(/export const level\d+ = ({[\s\S]*});?\s*$/);
    if (!match) {
      throw new Error('Could not find exported object');
    }

    // Parse the object literal
    const objectLiteral = match[1];
    debugLog('Found object literal:', objectLiteral);

    // Extract level number
    const levelMatch = objectLiteral.match(/level:\s*(\d+)/);
    if (!levelMatch) {
      throw new Error('Could not find level number');
    }
    const level = parseInt(levelMatch[1], 10);
    debugLog('Found level:', level);

    // Extract content section
    const contentMatch = objectLiteral.match(/content:\s*({[\s\S]*?}),\s*assessmentCriteria/);
    if (!contentMatch) {
      throw new Error('Could not find content section');
    }
    const contentStr = contentMatch[1];
    debugLog('Found content:', contentStr);

    // Extract title
    const titleMatch = contentStr.match(/title:\s*"([^"]+)"/);
    if (!titleMatch) {
      throw new Error('Could not find title');
    }
    const title = titleMatch[1];
    debugLog('Found title:', title);

    // Extract description
    const descMatch = contentStr.match(/description:\s*"([^"]+)"/);
    if (!descMatch) {
      throw new Error('Could not find description');
    }
    const description = descMatch[1];
    debugLog('Found description:', description);

    // Extract word families
    const wordFamiliesMatch = contentStr.match(/wordFamilies:\s*\[([\s\S]*?)\s*\],\s*teachingStrategies/);
    if (!wordFamiliesMatch) {
      throw new Error('Could not find word families');
    }
    const wordFamiliesStr = wordFamiliesMatch[1];
    debugLog('Found word families string:', wordFamiliesStr);

    // Parse individual word families
    const wordFamilies: any[] = [];
    const familyMatches = wordFamiliesStr.match(/{\s*pattern:[\s\S]*?},?/g) || [];
    debugLog('Found family matches:', familyMatches);

    for (const familyStr of familyMatches) {
      const family: any = {};
      
      const patternMatch = familyStr.match(/pattern:\s*"([^"]+)"/);
      if (patternMatch) {
        family.pattern = patternMatch[1];
      }

      const wordsMatch = familyStr.match(/words:\s*\[(.*?)\]/);
      if (wordsMatch) {
        family.words = wordsMatch[1]
          .split(',')
          .map(w => w.trim().replace(/["\[\]]/g, ''))
          .filter(w => w);
      }

      const examplesMatch = familyStr.match(/examples:\s*\[(.*?)\]/);
      if (examplesMatch) {
        family.examples = examplesMatch[1]
          .split(',')
          .map(e => e.trim().replace(/["\[\]]/g, ''))
          .filter(e => e);
      }

      if (family.pattern && family.words) {
        wordFamilies.push(family);
      }
    }
    debugLog('Parsed word families:', wordFamilies);

    // Extract teaching strategies
    const strategiesMatch = contentStr.match(/teachingStrategies:\s*\[([\s\S]*?)\],\s*troubleshootingGuide/);
    if (!strategiesMatch) {
      throw new Error('Could not find teaching strategies');
    }
    const strategies = strategiesMatch[1]
      .split(',')
      .map(s => s.trim().replace(/["\[\]]/g, ''))
      .filter(s => s);
    debugLog('Found strategies:', strategies);

    // Extract assessment criteria
    const criteriaMatch = objectLiteral.match(/assessmentCriteria:\s*\[([\s\S]*?)\]\s*}/);
    if (!criteriaMatch) {
      throw new Error('Could not find assessment criteria');
    }
    const criteria = criteriaMatch[1]
      .split(',')
      .map(s => s.trim().replace(/["\[\]]/g, ''))
      .filter(s => s);
    debugLog('Found criteria:', criteria);

    return {
      level,
      content: {
        title,
        description,
        wordFamilies,
        teachingStrategies: strategies,
        troubleshootingGuide: {
          common: [],
          solutions: [],
          prevention: []
        }
      },
      assessmentCriteria: criteria
    };
  } catch (error) {
    console.error('Error parsing curriculum file:', error);
    throw error;
  }
}

function parsePhonicsFile(content: string): Record<string, {
  word: string;
  phonemes: Phoneme[];
  translation: string;
  translationPhonemes: Phoneme[];
}> {
  try {
    debugLog('Parsing phonics file...');
    
    // Remove imports and type annotations
    content = content.replace(/import.*?;(\r?\n|\r)/g, '');
    content = content.replace(/: Record<string, WordPhonics>/g, '');
    
    // Extract the object literal
    const match = content.match(/export const LEVEL\d+_WORDS = ({[\s\S]*});?\s*$/);
    if (!match) {
      throw new Error('Could not find exported object');
    }

    // Parse the object literal
    const objectLiteral = match[1];
    debugLog('Found object literal:', objectLiteral);

    const result: Record<string, any> = {};

    // Extract word entries
    const wordEntries = objectLiteral.match(/'[^']+'\s*:\s*{[\s\S]*?},?\s*(?='|$)/g) || [];
    debugLog('Found word entries:', wordEntries);

    for (const entry of wordEntries) {
      const wordMatch = entry.match(/'([^']+)'/);
      if (!wordMatch) continue;

      const word = wordMatch[1];
      const wordData: any = { word };

      // Extract translation
      const translationMatch = entry.match(/translation:\s*'([^']+)'/);
      if (translationMatch) {
        wordData.translation = translationMatch[1];
      }

      // Extract phonemes
      const phonemesMatch = entry.match(/phonemes:\s*\[([\s\S]*?)\],\s*translation/);
      if (phonemesMatch) {
        wordData.phonemes = phonemesMatch[1]
          .split('},')
          .map(p => {
            const soundMatch = p.match(/sound:\s*'([^']+)'/);
            return soundMatch ? { sound: soundMatch[1] } : null;
          })
          .filter(p => p);
      }

      // Extract translation phonemes
      const transPhonMatch = entry.match(/translationPhonemes:\s*\[([\s\S]*?)\]\s*}/);
      if (transPhonMatch) {
        wordData.translationPhonemes = transPhonMatch[1]
          .split('},')
          .map(p => {
            const soundMatch = p.match(/sound:\s*'([^']+)'/);
            return soundMatch ? { sound: soundMatch[1] } : null;
          })
          .filter(p => p);
      }

      if (wordData.translation && wordData.phonemes) {
        result[word] = wordData;
      }
    }
    debugLog('Parsed phonics data:', result);

    return result;
  } catch (error) {
    console.error('Error parsing phonics file:', error);
    throw error;
  }
}

function convertWordsets() {
  const srcDir = path.join(__dirname, '../src');
  const curriculumDir = path.join(srcDir, 'data/curriculum');
  const phonicsDir = path.join(srcDir, 'data/phonics');
  const wordSetsDir = path.join(srcDir, 'data/wordsets/default');
  const levelsDir = path.join(wordSetsDir, 'levels');

  debugLog('Directories:');
  debugLog('srcDir:', srcDir);
  debugLog('curriculumDir:', curriculumDir);
  debugLog('phonicsDir:', phonicsDir);
  debugLog('wordSetsDir:', wordSetsDir);
  debugLog('levelsDir:', levelsDir);

  // Create output directories
  if (!fs.existsSync(wordSetsDir)) {
    fs.mkdirSync(wordSetsDir, { recursive: true });
    debugLog('Created wordSetsDir');
  }
  if (!fs.existsSync(levelsDir)) {
    fs.mkdirSync(levelsDir, { recursive: true });
    debugLog('Created levelsDir');
  }

  // Process each level
  const levelsData: WordSetMetadata['levels'] = [];
  const teachingStrategies: TeachingData['strategies'] = {};
  const assessmentCriteria: TeachingData['assessmentCriteria'] = {};

  for (let i = 1; i <= 4; i++) {
    try {
      debugLog(`\nProcessing level ${i}...`);
      
      // Import curriculum data
      const curriculumPath = path.join(curriculumDir, `level${i}.ts`);
      const phonicsPath = path.join(phonicsDir, `level${i}.ts`);

      debugLog(`Checking file existence:`);
      debugLog(`Curriculum path (${fs.existsSync(curriculumPath) ? 'exists' : 'missing'}):`, curriculumPath);
      debugLog(`Phonics path (${fs.existsSync(phonicsPath) ? 'exists' : 'missing'}):`, phonicsPath);

      // Read and parse curriculum file
      debugLog('\nReading curriculum file...');
      const curriculumContent = fs.readFileSync(curriculumPath, 'utf-8');
      debugLog('Curriculum file content:', curriculumContent);

      const curriculumData = parseCurriculumFile(curriculumContent);
      debugLog('\nCurriculum data loaded:', curriculumData);

      // Read and parse phonics file
      debugLog('\nReading phonics file...');
      const phonicsContent = fs.readFileSync(phonicsPath, 'utf-8');
      debugLog('Phonics file content:', phonicsContent);

      const phonicsData = parsePhonicsFile(phonicsContent);
      debugLog('\nPhonics data loaded:', phonicsData);

      // Extract level information
      levelsData.push({
        id: i,
        title: curriculumData.content.title,
        description: curriculumData.content.description.replace('magic ', 'magic e')
      });

      // Extract teaching strategies and assessment criteria
      teachingStrategies[`level${i}`] = curriculumData.content.teachingStrategies;
      assessmentCriteria[`level${i}`] = curriculumData.assessmentCriteria.map(criterion => 
        criterion.startsWith('Understands magic ') ? criterion.replace('magic ', 'magic e') : criterion
      );

      // Create level content
      debugLog('\nCreating level content...');
      const levelContent: LevelContent = {
        wordFamilies: curriculumData.content.wordFamilies.map(family => {
          debugLog('\nProcessing word family:', family);
          return {
            pattern: family.pattern,
            words: family.words.map(word => {
              const phonicsWord = phonicsData[word.toLowerCase()];
              debugLog('\nProcessing word:', { word, phonicsWord });
              return {
                english: word,
                translation: phonicsWord?.translation || '',
                phonemes: phonicsWord?.phonemes?.map(p => p.sound) || [],
                translationPhonemes: phonicsWord?.translationPhonemes?.map(p => p.sound) || [],
                examples: family.examples || []
              };
            })
          };
        })
      };

      debugLog('\nWriting level file...');
      const levelPath = path.join(levelsDir, `level${i}.json`);
      debugLog('Level file path:', levelPath);
      fs.writeFileSync(levelPath, JSON.stringify(levelContent, null, 2));
      debugLog(`Created level${i}.json`);

    } catch (error) {
      console.error(`\nError processing level ${i}:`, error);
      if (error instanceof Error) {
        console.error('Stack trace:', error.stack);
      }
      continue;
    }
  }

  // Create metadata.json
  debugLog('\nCreating metadata.json...');
  const metadata: WordSetMetadata = {
    name: "Reading Teacher 5000 - Core Word Set",
    description: "A progressive phonics-based curriculum for early readers",
    version: "1.0.0",
    language: "english",
    targetAge: {
      min: 4,
      max: 8
    },
    levels: levelsData
  };

  const metadataPath = path.join(wordSetsDir, 'metadata.json');
  debugLog('Metadata file path:', metadataPath);
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  debugLog('Created metadata.json');

  // Create teaching.json
  debugLog('\nCreating teaching.json...');
  const teaching: TeachingData = {
    strategies: teachingStrategies,
    assessmentCriteria: assessmentCriteria
  };

  const teachingPath = path.join(wordSetsDir, 'teaching.json');
  debugLog('Teaching file path:', teachingPath);
  fs.writeFileSync(teachingPath, JSON.stringify(teaching, null, 2));
  debugLog('Created teaching.json');
}

// Run the script
console.log('Script starting...');
try {
  convertWordsets();
  debugLog('\nConversion complete!');
} catch (error) {
  console.error('\nError during conversion:', error);
  if (error instanceof Error) {
    console.error('Stack trace:', error.stack);
  }
  process.exit(1);
}
