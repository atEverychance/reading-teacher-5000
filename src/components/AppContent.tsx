import React, { useState, useEffect } from 'react';
import { useAuth } from './auth/AuthProvider';
import { AuthForm } from './auth/AuthForm';
import { CharacterCreation } from './CharacterCreation';
import { ReadingInterface } from './ReadingInterface';
import { UserProfile } from './profile/UserProfile';
import { useStore } from '../store/useStore';
import { Sparkles } from 'lucide-react';

export function AppContent() {
  const { loading, user } = useAuth();
  const activeCharacter = useStore((state) => state.activeCharacter);
  const [showProfile, setShowProfile] = useState(false);
  const [showTeacherGuide, setShowTeacherGuide] = useState(false);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle shortcuts when we have an active character
      if (!activeCharacter) return;

      if (e.key === 'Escape') {
        if (showProfile) {
          setShowProfile(false);
        } else if (showTeacherGuide) {
          setShowTeacherGuide(false);
        }
      } else if (e.key === '?' || e.key === '/') {
        // Prevent the '?' from being typed if we're not in an input
        if (!(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
          e.preventDefault();
          setShowTeacherGuide(prev => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeCharacter, showProfile, showTeacherGuide]);

  const toggleTeacherGuide = () => {
    console.log('Toggling teacher guide from:', showTeacherGuide);
    setShowTeacherGuide(prev => !prev);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-pink-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  if (showProfile) {
    return <UserProfile onClose={() => setShowProfile(false)} />;
  }

  if (!activeCharacter) {
    return <CharacterCreation />;
  }

  return (
    <ReadingInterface 
      showTeacherGuide={showTeacherGuide}
      onTeacherGuideClose={toggleTeacherGuide}
      onShowProfile={() => setShowProfile(true)}
    />
  );
}