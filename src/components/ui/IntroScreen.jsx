import React from 'react';

export default function IntroScreen({ user, onInitSystem }) {
  // Fallbacks in case user data is missing for any reason
  const userName = user?.name || 'UNKNOWN AGENT';
  const userRole = user?.role || 'UNIDENTIFIED ROLE';

  // Dynamic styling based on the agent's role
  let roleColorClass = "text-gray-400";
  let roleShadowClass = "";

  if (userRole.includes('ARCHITECT')) {
    roleColorClass = "text-yellow-400";
    roleShadowClass = "drop-shadow-[0_0_10px_#ffd700]";
  } else if (userRole.includes('REP') || userRole.includes('CR')) {
    roleColorClass = "text-[#ff003c]";
    roleShadowClass = "drop-shadow-[0_0_10px_#ff003c]";
  }

  return (
    <section className="absolute inset-0 z-10 w-full h-full flex flex-col items-center justify-center p-6 pointer-events-none">
      <div className="text-center relative z-20 pointer-events-auto">
        
        {/* Blinking Access Text */}
        <div className="text-neon font-mono text-xs mb-4 tracking-[0.4em] animate-pulse">
          ACCESS GRANTED
        </div>
        
        {/* Main Welcome Heading */}
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-2 drop-shadow-[0_0_15px_rgba(0,243,255,0.8)] tracking-wider">
          WELCOME
        </h1>
        
        {/* Dynamic User Name */}
        <h2 className="text-2xl md:text-4xl font-mono text-neon tracking-widest border-b border-neon inline-block pb-2 uppercase">
          {userName}
        </h2>
        
        {/* Dynamic Role / Title */}
        <div className={`text-sm md:text-base font-mono mt-3 tracking-[0.3em] uppercase transition-all duration-500 ${roleColorClass} ${roleShadowClass}`}>
          /// {userRole}
        </div>
        
        {/* Action Button */}
        <button 
          onClick={onInitSystem} 
          className="mt-16 px-10 py-4 border-2 border-neon text-neon font-bold font-mono tracking-[0.2em] hover:bg-neon hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,243,255,0.4)] hover:shadow-[0_0_30px_rgba(0,243,255,0.8)]"
        >
          INITIALIZE SYSTEM
        </button>

      </div>
    </section>
  );
}
