import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from './auth/AuthProvider.js';
import { AuthForm } from './auth/AuthForm.js';
import { CharacterCreation } from './CharacterCreation.js';
import { ReadingInterface } from './ReadingInterface/index.js';
import { UserProfile } from './profile/UserProfile.js';
import { useStore } from '../store/useStore.js';
import type { StoreState } from '../store/useStore.js';

function AppRoutes() {
  const { loading, user } = useAuth();
  const activeCharacter = useStore((state: StoreState) => state.activeCharacter);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/auth');
      } else if (!activeCharacter) {
        navigate('/create-character');
      }
    }
  }, [loading, user, activeCharacter, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-pink-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/auth" element={<AuthForm />} />
      <Route path="/create-character" element={<CharacterCreation />} />
      <Route path="/profile" element={<UserProfile onClose={() => navigate('/')} />} />
      <Route path="/" element={<ReadingInterface />} />
    </Routes>
  );
}

export function AppContent() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}