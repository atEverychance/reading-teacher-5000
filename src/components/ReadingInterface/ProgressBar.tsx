import React from 'react';
import { useStore } from '../../store/useStore';
import { getThemeColors } from '../../utils/theme';

export function ProgressBar() {
  const activeCharacter = useStore((state) => state.activeCharacter);
  const themeColors = getThemeColors(activeCharacter?.type || 'unicorn');
  const progress = activeCharacter?.progress || 0;

  return (
    <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
      <div
        className={`h-full ${themeColors.primary.replace('text-', 'bg-')} transition-all`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}