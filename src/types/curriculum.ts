export interface WordFamily {
  pattern: string;
  words: string[];
  examples: string[];
}

export interface LevelContent {
  title: string;
  description: string;
  wordFamilies: WordFamily[];
  activities: string[];
  teachingStrategies: string[];
}

export interface CurriculumLevel {
  level: number;
  content: LevelContent;
  assessmentCriteria: string[];
}