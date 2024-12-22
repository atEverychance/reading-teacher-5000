import React from 'react';
import { useStore } from '../../store/useStore';
import { Sparkles, Star, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  show: boolean;
  message: string;
  type: 'word' | 'level';
}

export function Celebration({ show, message, type }: Props) {
  const activeCharacter = useStore((state) => state.activeCharacter);
  const characterType = activeCharacter?.type || 'unicorn';

  React.useEffect(() => {
    if (show && type === 'level') {
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff0000', '#00ff00', '#0000ff']
        });
        
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff0000', '#00ff00', '#0000ff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [show, type]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className={`
        p-8 rounded-xl shadow-2xl
        ${characterType === 'unicorn' ? 'bg-purple-900' : 'bg-cyan-900'}
        transform ${type === 'word' ? 'animate-bounce' : 'animate-pulse'}
      `}>
        <div className="flex gap-4 justify-center mb-4">
          {type === 'word' ? (
            <Star className="w-12 h-12 text-yellow-400 animate-spin" />
          ) : (
            <>
              <PartyPopper className="w-12 h-12 text-yellow-400" />
              <Sparkles className="w-12 h-12 text-purple-400" />
              <PartyPopper className="w-12 h-12 text-pink-400" />
            </>
          )}
        </div>
        
        <h3 className={`text-3xl font-bold text-center mb-4 ${
          characterType === 'unicorn' ? 'text-purple-200' : 'text-cyan-200'
        }`}>
          {message}
        </h3>
      </div>
    </div>
  );
}