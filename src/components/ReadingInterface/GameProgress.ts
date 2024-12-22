import { create } from 'zustand';

interface GameProgress {
  wordsCompleted: number;
  levelScore: number;
  setWordsCompleted: (count: number) => void;
  incrementWordsCompleted: () => void;
  resetWordsCompleted: () => void;
  setLevelScore: (score: number) => void;
  incrementLevelScore: () => void;
}

export const useGameProgress = create<GameProgress>((set) => ({
  wordsCompleted: 0,
  levelScore: 0,
  setWordsCompleted: (count) => set({ wordsCompleted: count }),
  incrementWordsCompleted: () => set((state) => ({ wordsCompleted: state.wordsCompleted + 1 })),
  resetWordsCompleted: () => set({ wordsCompleted: 0 }),
  setLevelScore: (score) => set({ levelScore: score }),
  incrementLevelScore: () => set((state) => ({ levelScore: state.levelScore + 1 })),
}));