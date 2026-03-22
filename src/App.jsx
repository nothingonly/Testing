import React, { useState } from 'react';
import LoginScreen from './components/ui/LoginScreen.jsx';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login', 'intro', 'dashboard'
  const [activeUser, setActiveUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setActiveUser(userData);
    setCurrentScreen('intro'); // Move to the next screen!
    console.log("Logged in as:", userData);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#020005]">
      
      {/* 3D Canvas Layer will go here later */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* <Scene /> */}
      </div>

      {/* UI Routing Layer */}
      {currentScreen === 'login' && (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      )}

      {currentScreen === 'intro' && (
        <div className="relative z-10 flex items-center justify-center w-full h-full">
           <h1 className="text-neon font-orbitron text-2xl tracking-widest">
             WELCOME, {activeUser?.name.toUpperCase()}
           </h1>
        </div>
      )}

    </div>
  );
}

export default App;
