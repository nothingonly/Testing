import React, { useState } from 'react';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login', 'intro', 'dashboard'

  return (
    <div className="relative w-full h-screen overflow-hidden">
      
      {/* 3D Canvas Layer will go here later */}
      <div className="fixed inset-0 z-0 bg-[#020005]">
        {/* <Scene /> */}
      </div>

      {/* UI Layer */}
      <div className="relative z-10 w-full h-full flex flex-col pointer-events-none">
        {/* We use pointer-events-auto on child elements so we can still click the 3D background if needed */}
        <div className="flex-1 w-full h-full pointer-events-auto flex items-center justify-center">
          
          <div className="text-center p-8 glass border-gray-800 backdrop-blur-md">
            <h1 className="text-neon font-orbitron text-2xl tracking-widest mb-4">
              /// SYSTEM INITIALIZED
            </h1>
            <p className="text-gray-400 font-mono text-sm">
              React Environment Ready.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default App;

