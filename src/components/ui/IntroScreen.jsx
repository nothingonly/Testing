import React from 'react';

export default function IntroScreen({ user, onInitSystem }) {
  // Check if the user is a special admin to give them gold text
  const isArchitect = user.role.includes('ARCHITECT');

  return (
    <section className="absolute inset-0 z-10 w-full h-full flex flex-col pointer-events-none items-center justify-center p-6">
      <div className="text-center relative pointer-events-auto">
        <div className="text-neon font-mono text-xs mb-4 tracking-[0.4em]">
          ACCESS GRANTED
        </div>
        
        <h1 className="text-5xl font-display font-bold text-white mb-2 holo-text">
          WELCOME
        </h1>
        
        <h2 className="text-xl md:text-3xl font-mono text-neon tracking-widest border-b border-neon inline-block pb-2">
          {user.name.toUpperCase()}
        </h2>
        
        <div className={`text-sm font-mono mt-2 tracking-[0.3em] ${isArchitect ? 'text-yellow-400 drop-shadow-[0_0_8px_#ffd700]' : 'text-gray-400'}`}>
          /// {user.role}
        </div>
        
        <button 
          onClick={onInitSystem} 
          className="mt-12 px-10 py-4 border-2 border-neon text-neon font-bold font-mono tracking-widest hover:bg-neon hover:text-black transition-all shadow-[0_0_20px_#00f3ff]"
        >
          INITIALIZE SYSTEM
        </button>
      </div>
    </section>
  );
}
