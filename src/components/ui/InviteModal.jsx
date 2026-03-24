import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

const THEMES = {
  nebula: {
    bg: 'linear-gradient(to bottom, #05020a, #120524, #05020a)',
    pillarLeft: 'linear-gradient(to right, #d900ff, #8000ff, transparent)',
    pillarRight: 'linear-gradient(to left, #00f3ff, #0088ff, transparent)',
    pri: '#00f3ff', sec: '#bd00ff',
    grad1: 'linear-gradient(180deg, #ffffff 30%, #a5f3fc 70%, #00f3ff 100%)',
    grad2: 'linear-gradient(180deg, #e9d5ff 30%, #bd00ff 70%, #4c1d95 100%)',
  },
  matrix: {
    bg: 'linear-gradient(to bottom, #020a02, #052405, #020a02)',
    pillarLeft: 'linear-gradient(to right, #00ff41, #008f11, transparent)',
    pillarRight: 'linear-gradient(to left, #00ff41, #003b00, transparent)',
    pri: '#00ff41', sec: '#008f11',
    grad1: 'linear-gradient(180deg, #ffffff 30%, #a5f3fc 70%, #00ff41 100%)',
    grad2: 'linear-gradient(180deg, #ccffcc 30%, #00ff41 70%, #003300 100%)',
  },
  synthwave: {
    bg: 'linear-gradient(to bottom, #1a0b2e, #2d0036, #1a0b2e)',
    pillarLeft: 'linear-gradient(to right, #ff00ff, #aa00ff, transparent)',
    pillarRight: 'linear-gradient(to left, #00ffff, #0088ff, transparent)',
    pri: '#00ffff', sec: '#ff00ff',
    grad1: 'linear-gradient(180deg, #ffffff 30%, #ff88d9 70%, #ff00ff 100%)',
    grad2: 'linear-gradient(180deg, #e0f2fe 30%, #00ffff 70%, #0099ff 100%)',
  },
  gold: {
    bg: 'linear-gradient(to bottom, #1a1200, #422d00, #1a1200)',
    pillarLeft: 'linear-gradient(to right, #ffd700, #ffaa00, transparent)',
    pillarRight: 'linear-gradient(to left, #ffd700, #e6b800, transparent)',
    pri: '#ffd700', sec: '#ffcc00',
    grad1: 'linear-gradient(180deg, #ffffff 30%, #fffacd 70%, #ffd700 100%)',
    grad2: 'linear-gradient(180deg, #ffedd5 30%, #ffc300 70%, #b45309 100%)',
  }
};

export default function InviteModal({ user, onClose }) {
  const [themeName, setThemeName] = useState('nebula');
  const cardRef = useRef(null);
  const t = THEMES[themeName];

  // Split name for the cool stacked text effect
  const names = user?.name ? user.name.split(' ') : ['GUEST', 'AGENT'];
  const firstName = names[0];
  const lastName = names.length > 1 ? names.slice(1).join(' ') : 'HONOR';

  const downloadInvite = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        backgroundColor: "#020005",
        useCORS: true,
        logging: false
      });
      const link = document.createElement('a');
      link.download = `Udbhav_${themeName}_Pass.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      alert("Download failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center overflow-y-auto py-10 pointer-events-auto backdrop-blur-md">
      
      <h3 className="text-xs font-mono text-gray-400 mb-2 tracking-widest uppercase">SELECT THEME</h3>
      
      {/* Theme Selector */}
      <div className="flex gap-4 mb-8">
        <button onClick={() => setThemeName('nebula')} className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-[#00f3ff] to-[#bd00ff] shadow-[0_0_15px_#00f3ff] hover:scale-110 transition-transform"></button>
        <button onClick={() => setThemeName('matrix')} className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-[#00ff41] to-[#008f11] shadow-[0_0_15px_#00ff41] hover:scale-110 transition-transform"></button>
        <button onClick={() => setThemeName('synthwave')} className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-[#ff00ff] to-[#00ffff] shadow-[0_0_15px_#ff00ff] hover:scale-110 transition-transform"></button>
        <button onClick={() => setThemeName('gold')} className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-[#ffd700] to-[#ffaa00] shadow-[0_0_15px_#ffd700] hover:scale-110 transition-transform"></button>
      </div>

      {/* The Downloadable Card */}
      <div 
        ref={cardRef}
        className="relative w-[340px] h-[680px] bg-[#020005] flex flex-col items-center overflow-hidden rounded-2xl border transition-colors duration-500 shrink-0"
        style={{ borderColor: t.pri, boxShadow: `0 0 40px rgba(0,0,0,0.9)` }}
      >
        {/* Animated Backgrounds */}
        <div className="absolute inset-0 z-0 transition-colors duration-500" style={{ background: t.bg }}></div>
        <div className="absolute -left-5 top-[10%] bottom-[10%] w-[80px] z-10 opacity-80 mix-blend-screen blur-[40px] transition-colors duration-500" style={{ background: t.pillarLeft }}></div>
        <div className="absolute -right-5 top-[15%] bottom-[20%] w-[100px] z-10 opacity-80 mix-blend-screen blur-[45px] transition-colors duration-500" style={{ background: t.pillarRight }}></div>
        
        {/* SVG Borders */}
        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 340 680">
          <path d="M 40 20 L 300 20 L 320 40 L 320 640 L 300 660 L 40 660 L 20 640 L 20 40 L 40 20 Z" fill="none" stroke={t.pri} strokeWidth="2" style={{ filter: `drop-shadow(0 0 4px ${t.pri})` }} />
          <path d="M 20 180 L 20 60 L 60 20 L 120 20" fill="none" stroke={t.pri} strokeWidth="1.5" opacity="0.6" />
          <path d="M 320 220 L 320 620 L 280 660" fill="none" stroke={t.sec} strokeWidth="1.5" opacity="0.6" />
        </svg>

        {/* Card Content */}
        <div className="relative z-20 flex flex-col items-center w-full h-full pt-12 pb-6 px-4 text-center">
          
          <h1 className="font-orbitron font-black text-[3.2rem] leading-none tracking-wide text-white mb-8" style={{ textShadow: `0 0 20px ${t.pri}` }}>
            UDBHAV <br/><span className="text-[2.5rem]">'26</span>
          </h1>
          
          <h2 className="font-display font-bold text-[1.2rem] text-white tracking-[0.2em] mb-8">THE BEGINNING</h2>
          <p className="font-display text-[0.7rem] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: t.pri }}>EXCLUSIVE ACCESS FOR</p>
          
          {/* User Name */}
          <div className="flex flex-col items-center leading-[0.9] mb-8 w-full">
            <span className="font-orbitron font-black text-[2.5rem] uppercase tracking-tighter w-full block pb-2 text-transparent bg-clip-text" style={{ backgroundImage: t.grad1 }}>{firstName}</span>
            <span className="font-orbitron font-black text-[2.5rem] uppercase tracking-tighter w-full block text-transparent bg-clip-text" style={{ backgroundImage: t.grad2 }}>{lastName}</span>
          </div>

          <p className="font-orbitron font-bold text-lg tracking-[0.05em] text-white uppercase drop-shadow-[0_0_5px_white] border border-white/20 py-2 px-6 bg-white/5 mb-auto">GUEST OF HONOR</p>

          <div className="mt-auto flex flex-col items-center pb-4 w-full">
            <div className="flex flex-col items-center mb-4">
              <span className="font-orbitron text-[0.65rem] font-bold tracking-[0.15em] uppercase" style={{ color: t.pri }}>LOCATION</span>
              <p className="font-display font-bold text-[1.1rem] text-white uppercase tracking-wider">CYBERDINE NEXUS</p>
            </div>
            <p className="font-orbitron font-bold text-[1.2rem] tracking-wider" style={{ color: t.pri, textShadow: `0 0 10px ${t.pri}` }}>#UDBHAV26</p>
          </div>

        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <button onClick={downloadInvite} className="px-8 py-3 bg-white text-black font-bold font-orbitron rounded hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.4)]">
          DOWNLOAD
        </button>
        <button onClick={onClose} className="px-6 py-3 border border-gray-600 text-gray-400 font-mono rounded hover:border-white hover:text-white transition-colors">
          CLOSE
        </button>
      </div>

    </div>
  );
}
