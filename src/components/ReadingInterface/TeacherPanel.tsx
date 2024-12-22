import React from 'react';
import { X } from 'lucide-react';
import type { WordData, WordFamily } from '../../types/word.js';
import type { CurriculumLevel } from '../../types/curriculum.js';

interface Props {
  currentWord: WordData | null;
  levelData: CurriculumLevel;
  isOpen: boolean;
  onClose: () => void;
}

export function TeacherPanel({ currentWord, levelData, isOpen, onClose }: Props) {
  if (!isOpen) return null;

  // Early return if data isn't loaded yet
  if (!currentWord || !levelData?.wordFamilies) {
    return (
      <div className="fixed inset-y-0 right-0 w-[800px] bg-white shadow-2xl 
                    flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-heading font-bold text-gray-800">
            Teacher's Guide
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close guide"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl font-heading text-gray-500">Loading content...</p>
        </div>
      </div>
    );
  }

  // Find the current word's family
  const currentFamily = levelData.wordFamilies.find(family => 
    family.words.some(w => w.english === currentWord.english)
  );

  // Group words by pattern
  const wordsByPattern = levelData.wordFamilies.reduce((acc: Record<string, WordData[]>, family) => {
    acc[family.pattern] = family.words;
    return acc;
  }, {});

  // Ensure current word's pattern is first
  const patterns = Object.keys(wordsByPattern);
  if (currentFamily) {
    patterns.sort((a, b) => {
      if (a === currentFamily.pattern) return -1;
      if (b === currentFamily.pattern) return 1;
      return 0;
    });
  }

  return (
    <div className="fixed inset-y-0 right-0 w-[800px] bg-white shadow-2xl 
                    flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-2xl font-heading font-bold text-gray-800">
          Teacher's Guide
        </h2>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Close guide"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 grid grid-cols-2 gap-8">
          {/* Left Column - Word Patterns */}
          <div className="space-y-8">
            {patterns.map(pattern => (
              <div key={pattern} className="space-y-4">
                <h3 className="text-xl font-heading font-semibold text-gray-700 
                             border-b pb-2">
                  {pattern} Pattern
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {wordsByPattern[pattern]?.map((w: WordData, i: number) => (
                    <div
                      key={i}
                      className={`p-4 rounded-xl text-center font-reading text-2xl
                                ${w.english === currentWord.english 
                                  ? 'bg-blue-100 text-blue-700 font-bold' 
                                  : 'bg-gray-100 text-gray-700'}`}
                    >
                      {w.english}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Teaching Tips */}
          <div className="space-y-8">
            {/* Teaching Tips */}
            <div className="bg-amber-50 rounded-xl p-6 space-y-6">
              <h3 className="text-lg font-heading font-semibold text-amber-800">
                Teaching Tips
              </h3>
              
              {/* Sound Breakdown */}
              <div className="space-y-2">
                <h4 className="font-heading font-semibold text-amber-800 text-sm">
                  1. Sound Breakdown
                </h4>
                <p className="text-amber-700 text-sm">
                  Break down "{currentWord.english}" into its sounds:
                </p>
                <div className="flex gap-2 font-reading text-base">
                  {currentWord.phonemes.map((phoneme: string, i: number) => (
                    <span key={i} className="px-3 py-1 rounded bg-amber-100 text-amber-700">
                      {phoneme}
                    </span>
                  ))}
                </div>
                <ul className="list-disc list-inside text-amber-700 space-y-1 pl-2 text-sm">
                  <li>Start with each sound individually</li>
                  <li>Practice the sounds slowly, then speed up</li>
                  <li>Use hand motions to represent each sound</li>
                </ul>
              </div>

              {/* Pattern Recognition */}
              <div className="space-y-2">
                <h4 className="font-heading font-semibold text-amber-800 text-sm">
                  2. Pattern Recognition
                </h4>
                <p className="text-amber-700 text-sm">
                  The "{currentFamily?.pattern}" pattern appears in many words. Help your child:
                </p>
                <ul className="list-disc list-inside text-amber-700 space-y-1 pl-2 text-sm">
                  <li>Look for this pattern in other words they know</li>
                  <li>Circle or highlight the pattern in written words</li>
                  <li>Make connections between similar words</li>
                  <li>Create their own words using this pattern</li>
                </ul>
              </div>

              {/* Examples */}
              {currentWord.examples.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-heading font-semibold text-amber-800 text-sm">
                    3. Example Sentences
                  </h4>
                  <ul className="list-disc list-inside text-amber-700 space-y-1 pl-2 text-sm">
                    {currentWord.examples.map((example, i) => (
                      <li key={i}>{example}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Multi-Sensory Learning */}
              <div className="space-y-2">
                <h4 className="font-heading font-semibold text-amber-800 text-sm">
                  4. Multi-Sensory Activities
                </h4>
                <ul className="list-disc list-inside text-amber-700 space-y-1 pl-2 text-sm">
                  <li>Write the word in the air while saying it</li>
                  <li>Tap out each sound with fingers or blocks</li>
                  <li>Draw the word with different colors for each sound</li>
                  <li>Use magnetic letters to build the word</li>
                </ul>
              </div>

              {/* Troubleshooting */}
              <div className="space-y-2">
                <h4 className="font-heading font-semibold text-amber-800 text-sm">
                  5. If Your Child is Struggling
                </h4>
                <ul className="list-disc list-inside text-amber-700 space-y-1 pl-2 text-sm">
                  <li>Break the word into smaller chunks</li>
                  <li>Practice each part until it's comfortable</li>
                  <li>Use rhythm or clapping to emphasize syllables</li>
                  <li>Take breaks if needed - learning should be fun!</li>
                  <li>Celebrate small victories along the way</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}