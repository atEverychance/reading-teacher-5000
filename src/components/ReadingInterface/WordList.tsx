import React from 'react';
import { useStore } from '../../store/useStore';
import { getThemeColors } from '../../utils/theme';

export function WordList() {
  const activeCharacter = useStore((state) => state.activeCharacter);
  const themeColors = getThemeColors(activeCharacter?.type || 'unicorn');

  return (
    <div className={`p-6 rounded-xl ${themeColors.background} shadow-xl`}>
      <h3 className={`text-xl font-punk mb-4 ${themeColors.primary}`}>
        Today's Words
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {['rock', 'star', 'punk', 'cool'].map((word) => (
          <button
            key={word}
            className="bg-gray-800 p-3 rounded-lg text-gray-200 hover:scale-105 transition-transform"
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
}