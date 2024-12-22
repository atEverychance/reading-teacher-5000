import React from 'react';
import { AuthProvider } from './components/auth/AuthProvider';
import { AppContent } from './components/AppContent';

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}