export type CharacterType = 'unicorn' | 'mermaid';

export interface Character {
  id: string;
  name: string;
  type: CharacterType;
  created_at: string;
  last_played: string;
  progress: number;
  user_id?: string;
}

export interface WordData {
  en: {
    word: string;
    syllables: string[];
  };
  fr: {
    word: string;
    syllables: string[];
  };
}