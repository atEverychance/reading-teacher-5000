import type { WordFamily } from './word.js';

export interface CurriculumLevel {
  level: number;
  title: string;
  description: string;
  wordFamilies: WordFamily[];
  teachingStrategies: string[];
}