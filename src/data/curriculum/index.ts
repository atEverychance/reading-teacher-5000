import type { CurriculumLevel } from '../../types/curriculum.js';
import type { WordFamily } from '../../types/word.js';

export async function getCurrentLevelContent(level: number): Promise<CurriculumLevel> {
  try {
    const response = await fetch(`/src/data/wordsets/default/levels/level${level}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load level ${level}`);
    }
    const data = await response.json();
    return {
      level,
      title: `Level ${level}`,
      description: `Practice reading words from level ${level}`,
      wordFamilies: data.wordFamilies,
      teachingStrategies: [
        'Start with individual letter sounds',
        'Practice blending sounds together',
        'Use visual aids and hand motions',
        'Make connections to familiar objects'
      ]
    };
  } catch (error) {
    console.error('Error loading level:', error);
    throw error;
  }
}

export async function getWordFamilyByPattern(level: number, pattern: string): Promise<WordFamily | undefined> {
  const levelContent = await getCurrentLevelContent(level);
  return levelContent.wordFamilies.find(family => family.pattern === pattern);
}