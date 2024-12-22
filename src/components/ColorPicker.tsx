import React from 'react';
import { CharacterType } from '../types';
import { getColorPalette } from '../utils/theme';

interface Props {
  selected: string;
  onSelect: (color: string) => void;
  characterType: CharacterType;
}

export function ColorPicker({ selected, onSelect, characterType }: Props) {
  const colors = getColorPalette(characterType);

  return (
    <div>
      <label className="block text-lg font-medium text-pink-400 mb-2">
        Choose Your Color
      </label>
      <div className="flex justify-center gap-4">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onSelect(color)}
            className={`w-12 h-12 rounded-full ${color} ${
              selected === color
                ? 'ring-4 ring-pink-500 ring-offset-2 ring-offset-gray-800'
                : ''
            } transition-transform hover:scale-110`}
          />
        ))}
      </div>
    </div>
  );
}