import React, { useState, useEffect } from 'react';
import { SimpleWordDisplay } from './SimpleWordDisplay.js';
import { TeacherPanel } from './TeacherPanel.js';
import { Title } from './Title.js';
import { useStore } from '../../store/useStore.js';
import { getCurrentLevelContent } from '../../data/curriculum/index.js';
import { useRandomWord } from '../../hooks/useRandomWord.js';
import type { WordData } from '../../types/word.js';
import type { CurriculumLevel } from '../../types/curriculum.js';
import confetti from 'canvas-confetti';
import { User, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ReadingInterface() {
  const navigate = useNavigate();
  const [isTeacherPanelOpen, setIsTeacherPanelOpen] = useState(false);
  const [successCount, setSuccessCount] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelData, setLevelData] = useState<CurriculumLevel | null>(null);
  const { level, setLevel, activeCharacter, updateCharacterProgress } = useStore();
  const { currentWord, getNewWord } = useRandomWord(levelData?.wordFamilies || []);

  // Load level data
  useEffect(() => {
    const loadLevelData = async () => {
      try {
        const data = await getCurrentLevelContent(level);
        setLevelData(data);
      } catch (error) {
        console.error('Error loading level data:', error);
      }
    };
    loadLevelData();
  }, [level]);

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle shortcuts if not in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (!isTeacherPanelOpen) {
        if (e.key === 't' || e.key === 'T') {
          setIsTeacherPanelOpen(true);
        } else if (e.key === 'a' || e.key === 'A' || e.key === 'd' || e.key === 'D') {
          navigate('/profile');
        }
      } else if (e.key === 'Escape') {
        setIsTeacherPanelOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isTeacherPanelOpen, navigate]);

  // Calculate gradient intensity based on success count
  const getGradientColors = () => {
    const colorScale = {
      0: 'pink',
      1: 'red',
      2: 'orange',
      3: 'yellow'
    };
    const intensity = colorScale[Math.min(successCount, 3) as keyof typeof colorScale];
    const type = activeCharacter?.type || 'unicorn';
    
    if (type === 'unicorn') {
      return `bg-gradient-to-br from-pink-200 to-${intensity}-500`;
    } else {
      return `bg-gradient-to-br from-blue-200 to-${intensity}-500`;
    }
  };

  const handleWordComplete = (success: boolean) => {
    if (success) {
      setSuccessCount(prev => prev + 1);
      
      // Level up after 4 successful words
      if (successCount + 1 >= 4 && level < 4) {
        // Show level up message
        setShowLevelUp(true);
        
        // Trigger level up celebration
        setTimeout(() => {
          // First burst of confetti
          confetti({
            particleCount: 300,
            spread: 100,
            origin: { y: 0.3 },
            colors: ['#FFD700', '#FFA500', '#FF69B4', '#4B0082']
          });

          // Second burst slightly delayed
          setTimeout(() => {
            confetti({
              particleCount: 200,
              angle: 60,
              spread: 80,
              origin: { x: 0, y: 0.5 }
            });
          }, 200);

          // Third burst from the other side
          setTimeout(() => {
            confetti({
              particleCount: 200,
              angle: 120,
              spread: 80,
              origin: { x: 1, y: 0.5 }
            });
          }, 400);
        }, 100);

        // Hide level up message after a delay
        setTimeout(() => {
          setShowLevelUp(false);
        }, 3000);

        const newLevel = level + 1;
        setLevel(newLevel);
        const progress = Math.min((newLevel * 25), 100);
        updateCharacterProgress(progress);
      }
      
      getNewWord();
    } else {
      getNewWord();
    }
  };

  // Get celebration message
  const getCelebrationMessage = () => {
    const messages = [
      "You're amazing! 🌟",
      "Super reading! ⭐",
      "Fantastic job! 🎯",
      "You're a star! 💫"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  if (!levelData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-pink-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${getGradientColors()} transition-colors duration-1000`}>
      {/* Account Icon (Left) */}
      <button
        onClick={() => navigate('/profile')}
        className="fixed top-4 left-4 p-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-colors z-50"
        aria-label="Open profile"
      >
        <User className="w-6 h-6" />
      </button>

      {/* Teacher's Guide Icon (Right) */}
      <div className="fixed top-4 right-4">
        <button
          onClick={() => setIsTeacherPanelOpen(prev => !prev)}
          className="p-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-colors group"
          aria-label="Toggle teacher's guide"
        >
          <GraduationCap className={`w-6 h-6 transition-transform ${isTeacherPanelOpen ? 'rotate-12' : ''} group-hover:scale-110`} />
        </button>
      </div>

      <div className="container mx-auto px-4">
        <Title level={level} />
        
        <div className="flex-1 flex flex-col items-center justify-center">
          {currentWord && (
            <SimpleWordDisplay
              word={currentWord.english}
              phonemes={currentWord.phonemes}
              translationPhonemes={currentWord.translationPhonemes}
              onComplete={handleWordComplete}
              onTeacherClick={() => setIsTeacherPanelOpen(true)}
            />
          )}
        </div>

        <TeacherPanel
          currentWord={currentWord}
          levelData={levelData}
          isOpen={isTeacherPanelOpen}
          onClose={() => setIsTeacherPanelOpen(false)}
        />

        {/* Level Up Celebration */}
        {showLevelUp && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
            <div className="animate-bounce-gentle">
              <div className="text-center">
                <h2 className="text-8xl font-heading font-extrabold mb-4
                  bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 
                  text-transparent bg-clip-text
                  [text-shadow:_4px_4px_0_rgb(255_255_255_/_30%)]">
                  Level {level}!
                </h2>
                <p className="text-4xl font-display font-bold text-purple-600
                  [text-shadow:_2px_2px_0_rgb(255_255_255_/_50%)]">
                  {getCelebrationMessage()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}