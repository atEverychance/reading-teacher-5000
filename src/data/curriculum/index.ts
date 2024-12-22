import { level1 } from './level1';
import { level2 } from './level2';
import { level3 } from './level3';
import { level4 } from './level4';
import type { CurriculumLevel } from '../../types/curriculum';

export const curriculum: CurriculumLevel[] = [
  level1,
  level2,
  level3,
  level4
];

export const getCurrentLevelContent = (level: number): CurriculumLevel => {
  return curriculum.find(l => l.level === level) || level1;
};

export const getWordFamilyByPattern = (level: number, pattern: string) => {
  const levelContent = getCurrentLevelContent(level);
  return levelContent.content.wordFamilies.find(family => family.pattern === pattern);
};