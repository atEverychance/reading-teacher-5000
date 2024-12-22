import React from 'react';
import { Sparkles, Waves } from 'lucide-react';
import type { CharacterType } from '../types';

interface Props {
  selected: CharacterType;
  onSelect: (type: CharacterType) => void;
}

export function CharacterTypeSelector({ selected, onSelect }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-heading font-bold text-gray-700
        [text-shadow:_1px_1px_0_rgb(255_255_255_/_50%)]">
        Choose Your Character
      </h2>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Unicorn Option */}
        <button
          type="button"
          onClick={() => onSelect('unicorn')}
          className={`
            relative p-6 rounded-xl backdrop-blur-sm transition-all
            hover:scale-105 hover:shadow-lg
            ${selected === 'unicorn'
              ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 ring-2 ring-purple-400'
              : 'bg-white/50 hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-pink-500/10'}
          `}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-purple-100">
              <Sparkles className="w-10 h-10 text-purple-500" />
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-display font-bold text-purple-700
                [text-shadow:_1px_1px_0_rgb(255_255_255_/_50%)]">
                Magical Unicorn
              </h3>
              <p className="text-lg font-body font-medium text-purple-600 mt-1">
                A sparkly friend who loves adventure
              </p>
            </div>
          </div>
        </button>

        {/* Mermaid Option */}
        <button
          type="button"
          onClick={() => onSelect('mermaid')}
          className={`
            relative p-6 rounded-xl backdrop-blur-sm transition-all
            hover:scale-105 hover:shadow-lg
            ${selected === 'mermaid'
              ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 ring-2 ring-cyan-400'
              : 'bg-white/50 hover:bg-gradient-to-br hover:from-cyan-500/10 hover:to-blue-500/10'}
          `}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-cyan-100">
              <Waves className="w-10 h-10 text-cyan-500" />
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-display font-bold text-cyan-700
                [text-shadow:_1px_1px_0_rgb(255_255_255_/_50%)]">
                Ocean Mermaid
              </h3>
              <p className="text-lg font-body font-medium text-cyan-600 mt-1">
                A wise friend from the deep blue sea
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}