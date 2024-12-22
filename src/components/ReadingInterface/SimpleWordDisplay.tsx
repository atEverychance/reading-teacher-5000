import React, { useState, useEffect } from 'react';
import { Star, Shuffle } from 'lucide-react';
import { usePhonics } from '../../hooks/usePhonics.js';
import { initAudio } from '../../data/phonics/sounds.js';

interface SimpleWordDisplayProps {
  word: string;
  phonemes: string[];
  onComplete: (success: boolean) => void;
  onTeacherClick: () => void;
}

export function SimpleWordDisplay({ word, phonemes, onComplete, onTeacherClick }: SimpleWordDisplayProps) {
  const [completedPhonemes, setCompletedPhonemes] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const { speak, speakPhoneme, isPlaying } = usePhonics();

  // Initialize audio on mount
  useEffect(() => {
    initAudio();
  }, []);

  // Reset states when word changes
  useEffect(() => {
    setCompletedPhonemes([]);
    setShowSuccess(false);
  }, [word]);

  const handleWordClick = () => {
    speak(word, []);
    setShowSuccess(true);
  };

  const handlePhonemeClick = (index: number) => {
    if (!completedPhonemes.includes(index)) {
      speakPhoneme(phonemes[index]);
      const newCompleted = [...completedPhonemes, index];
      setCompletedPhonemes(newCompleted);
    }
  };

  const handleComplete = () => {
    onComplete(true);
  };

  const handleSkipWord = () => {
    setCompletedPhonemes([]);
    setShowSuccess(false);
    onComplete(false);
  };

  return (
    <div className="relative flex flex-col items-center gap-8 pt-24">
      {/* Main Word Button */}
      <button
        onClick={handleWordClick}
        disabled={isPlaying}
        className={`
          text-7xl font-heading font-extrabold
          px-12 py-6 rounded-2xl
          bg-white/75 text-gray-700
          [text-shadow:_2px_2px_0_rgb(255_255_255_/_50%)]
          hover:scale-105 transition-transform
          shadow-lg hover:shadow-xl
          disabled:opacity-50
          ${completedPhonemes.length === phonemes.length ? 'text-green-600' : ''}
        `}
      >
        {word}
      </button>

      {/* Phoneme Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mt-8">
        {phonemes.map((phoneme, index) => (
          <button
            key={index}
            onClick={() => handlePhonemeClick(index)}
            disabled={isPlaying}
            className={`
              text-4xl font-display font-bold px-6 py-3 rounded-xl
              transition-all transform hover:scale-105
              disabled:opacity-50
              ${completedPhonemes.includes(index)
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-white/75 text-gray-700 hover:bg-white shadow'}
            `}
          >
            {phoneme}
          </button>
        ))}
      </div>

      {/* Success Button */}
      {showSuccess && (
        <button
          onClick={handleComplete}
          disabled={isPlaying}
          className={`
            fixed bottom-32 right-8
            px-8 py-4 rounded-2xl
            bg-gradient-to-br from-yellow-400 to-orange-500
            text-white text-4xl font-heading font-extrabold tracking-wider
            flex items-center gap-3
            shadow-lg hover:shadow-xl
            transform hover:scale-105
            transition-all duration-300
            animate-bigBounce
            hover:from-yellow-500 hover:to-orange-600
            disabled:opacity-50
          `}
        >
          <Star className="w-8 h-8 animate-spin" />
          <span>AGAIN!</span>
        </button>
      )}

      {/* New Word Button */}
      <button
        onClick={handleSkipWord}
        disabled={isPlaying}
        className={`
          mt-8 p-4 rounded-xl
          text-xl font-display font-semibold
          bg-gray-100 text-gray-600
          hover:bg-gray-200 hover:text-gray-700
          transition-all transform hover:scale-105
          disabled:opacity-50
        `}
        aria-label="New Word"
      >
        <Shuffle className="w-6 h-6" />
      </button>
    </div>
  );
}