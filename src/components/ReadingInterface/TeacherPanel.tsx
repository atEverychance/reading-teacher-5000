import React from 'react';
import { X } from 'lucide-react';
import type { WordWithTranslation } from '../../types/word';

interface Props {
  currentWord: WordWithTranslation;
  levelContent: {
    level: number;
    content: {
      title: string;
      description: string;
      wordFamilies: Array<{
        pattern: string;
        words: string[];
      }>;
      teachingStrategies: string[];
    };
  };
  isOpen: boolean;
  onClose: () => void;
}

export function TeacherPanel({ currentWord, levelContent, isOpen, onClose }: Props) {
  if (!isOpen) return null;

  // Early return if data isn't loaded yet
  if (!currentWord || !levelContent?.content?.wordFamilies) {
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

  // Group words by pattern from the level content
  const wordsByPattern = levelContent.content.wordFamilies.reduce((acc: Record<string, string[]>, family) => {
    if (family && family.pattern && family.words) {
      acc[family.pattern] = family.words;
    }
    return acc;
  }, {});

  // Ensure current word's pattern is first
  const patterns = Object.keys(wordsByPattern);
  const currentPattern = currentWord.pattern;
  patterns.sort((a, b) => {
    if (a === currentPattern) return -1;
    if (b === currentPattern) return 1;
    return 0;
  });

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
                  {wordsByPattern[pattern]?.map((w: string, i: number) => (
                    <div
                      key={i}
                      className={`p-4 rounded-xl text-center font-reading text-2xl
                                ${w === currentWord.english 
                                  ? 'bg-blue-100 text-blue-700 font-bold' 
                                  : 'bg-gray-100 text-gray-700'}`}
                    >
                      {w}
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
                  {currentWord.englishSyllables?.map((syllable: string, i: number) => (
                    <span key={i} className="px-3 py-1 rounded bg-amber-100 text-amber-700">
                      {syllable}
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
                  The "{currentWord.pattern}" pattern appears in many words. Help your child:
                </p>
                <ul className="list-disc list-inside text-amber-700 space-y-1 pl-2 text-sm">
                  <li>Look for this pattern in other words they know</li>
                  <li>Circle or highlight the pattern in written words</li>
                  <li>Make connections between similar words</li>
                  <li>Create their own words using this pattern</li>
                </ul>
              </div>

              {/* Multi-Sensory Learning */}
              <div className="space-y-2">
                <h4 className="font-heading font-semibold text-amber-800 text-sm">
                  3. Multi-Sensory Activities
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
                  4. If Your Child is Struggling
                </h4>
                <ul className="list-disc list-inside text-amber-700 space-y-1 pl-2 text-sm">
                  <li>Break the word into smaller chunks</li>
                  <li>Practice each part until it's comfortable</li>
                  <li>Use rhythm or clapping to emphasize syllables</li>
                  <li>Take breaks if needed - learning should be fun!</li>
                  <li>Celebrate small victories along the way</li>
                </ul>
              </div>

              {/* Encouragement */}
              <div className="space-y-2">
                <h4 className="font-heading font-semibold text-amber-800 text-sm">
                  5. Positive Reinforcement
                </h4>
                <ul className="list-disc list-inside text-amber-700 space-y-1 pl-2 text-sm">
                  <li>Praise effort and progress, not just correct answers</li>
                  <li>Use specific praise: "Great job sounding out that tricky part!"</li>
                  <li>Keep the learning environment relaxed and supportive</li>
                  <li>Let your child be the teacher sometimes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}