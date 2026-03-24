import React, { useState } from 'react';
import LoginScreen from './components/ui/LoginScreen.jsx';
import IntroScreen from './components/ui/IntroScreen.jsx';
import Dashboard from './components/ui/Dashboard.jsx';
import Scene from './components/canvas/Scene.jsx';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login', 'intro', 'dashboard'
  const [activeUser, setActiveUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setActiveUser(userData);
    setCurrentScreen('intro'); 
  };

  const handleInitSystem = () => {
    setCurrentScreen('dashboard');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#020005]">
      
      {/* 3D Canvas Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene currentScreen={currentScreen} />
      </div>

      {/* UI Routing Layer */}
      {currentScreen === 'login' && (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      )}
      
      {currentScreen === 'intro' && (
        <IntroScreen user={activeUser} onInitSystem={handleInitSystem} />
      )}
      
      {currentScreen === 'dashboard' && (
        <Dashboard user={activeUser} />
      )}

    </div>
  );
}
