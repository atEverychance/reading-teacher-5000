import { CharacterType } from '../types';

export const getThemeColors = (characterType: CharacterType) => ({
  primary: characterType === 'unicorn' ? 'text-purple-400' : 'text-cyan-400',
  background: characterType === 'unicorn' 
    ? 'bg-purple-900' 
    : 'bg-cyan-900',
  gradient: characterType === 'unicorn'
    ? 'from-purple-950 to-pink-950'
    : 'from-cyan-950 to-blue-950',
});

export const getColorPalette = (characterType: CharacterType) => 
  characterType === 'unicorn'
    ? [
        'bg-purple-400',
        'bg-pink-400',
        'bg-fuchsia-400',
        'bg-violet-400',
        'bg-indigo-400'
      ]
    : [
        'bg-cyan-400',
        'bg-teal-400',
        'bg-sky-400',
        'bg-blue-400',
        'bg-emerald-400'
      ];