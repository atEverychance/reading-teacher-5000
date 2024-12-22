import React from 'react';
import { Mic } from 'lucide-react';
import { useStore } from '../../store/useStore';
import type { VoiceOption } from '../../types/voice';

interface Props {
  voices: VoiceOption[];
  selectedVoice: VoiceOption | null;
  onVoiceSelect: (voice: VoiceOption) => void;
}

export function VoiceSelector({ voices, selectedVoice, onVoiceSelect }: Props) {
  const activeCharacter = useStore((state) => state.activeCharacter);
  const characterType = activeCharacter?.type || 'unicorn';

  return (
    <div className="fixed left-4 bottom-4 flex items-center gap-2">
      <Mic className={`w-5 h-5 ${
        characterType === 'unicorn' ? 'text-purple-600' : 'text-cyan-600'
      }`} />
      <select
        value={selectedVoice?.name || ''}
        onChange={(e) => {
          const voice = voices.find(v => v.name === e.target.value);
          if (voice) onVoiceSelect(voice);
        }}
        className={`
          px-3 py-1 rounded-lg text-sm
          border-2 focus:outline-none focus:ring-2
          ${characterType === 'unicorn'
            ? 'border-purple-200 focus:border-purple-400 focus:ring-purple-200'
            : 'border-cyan-200 focus:border-cyan-400 focus:ring-cyan-200'}
        `}
      >
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name}
          </option>
        ))}
      </select>
    </div>
  );
}