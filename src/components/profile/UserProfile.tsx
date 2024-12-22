import React, { useEffect } from 'react';
import { CharacterList } from './CharacterList';
import { useStore } from '../../store/useStore';
import { Settings, Star, Crown, BookOpen, Mail } from 'lucide-react';
import { useSupabase } from '../../hooks/useSupabase';
import { useAuth } from '../auth/AuthProvider';

interface Props {
  onClose: () => void;
}

export function UserProfile({ onClose }: Props) {
  const { characters } = useStore();
  const { supabase } = useSupabase();
  const { user } = useAuth();

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleEmailChange = async () => {
    const newEmail = prompt('Enter your new email address:');
    if (newEmail && newEmail.includes('@')) {
      const { error } = await supabase.auth.updateUser({ email: newEmail });
      if (error) {
        alert('Failed to update email: ' + error.message);
      } else {
        alert('Email update request sent! Please check your new email to confirm the change.');
      }
    } else if (newEmail) {
      alert('Please enter a valid email address.');
    }
  };

  // Calculate total stats
  const totalStars = characters?.reduce((sum, char) => sum + Math.floor(char.progress / 25), 0) || 0;
  const highestLevel = characters?.length ? Math.max(...characters.map(char => Math.floor(char.progress / 25) + 1), 0) : 0;
  const totalWords = characters?.reduce((sum, char) => sum + Math.floor(char.progress * 3 / 25), 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-pink-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-pink-300" />
                <h2 className="text-xl font-bold">{user?.email}</h2>
              </div>
              <p className="text-pink-200">Reading Teacher 5000 Member</p>
            </div>
            <button
              onClick={handleEmailChange}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors group"
              aria-label="Settings"
            >
              <Settings className="w-6 h-6 text-white group-hover:rotate-45 transition-transform" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-300" />
              <h3 className="font-bold">Total Stars</h3>
            </div>
            <p className="text-2xl font-bold text-yellow-300">{totalStars}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-purple-300" />
              <h3 className="font-bold">Highest Level</h3>
            </div>
            <p className="text-2xl font-bold text-purple-300">{highestLevel}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-cyan-300" />
              <h3 className="font-bold">Words Read</h3>
            </div>
            <p className="text-2xl font-bold text-cyan-300">{totalWords}</p>
          </div>
        </div>

        {/* Character List */}
        <CharacterList characters={characters} onClose={onClose} />
      </div>
    </div>
  );
}