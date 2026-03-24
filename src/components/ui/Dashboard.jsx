import React, { useState, useEffect } from 'react';
import config from '../../data/config.json';

export default function Dashboard({ user }) {
  const [time, setTime] = useState('00:00');
  const [activePanel, setActivePanel] = useState({
    title: 'SYSTEM ONLINE',
    body: `Welcome, Agent <strong>${user.name.split(' ')[0]}</strong>.<br/>Status: <span class="text-neon">${user.role}</span><br/><br/><span class="text-neon">></span> <strong>Tap buttons</strong> below.`,
  });

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const updatePanel = (key) => {
    if (key === 'venue') {
      setActivePanel({ title: 'LOCATION', body: `<strong>${config.venue.name}</strong><br/>${config.venue.address}` });
    } else if (key === 'timings') {
      setActivePanel({ title: 'TIMELINE', body: `<strong>EVENT HOURS</strong><br/>${config.timings.display}` });
    } else if (key === 'roses') {
      // Dynamic logic for roses based on gender and batch!
      const targetBatch = user.batch === 'fresher' ? '1st Year' : '2nd Year';
      const targetGender = user.gender === 'M' ? 'Girl' : 'Boy';
      setActivePanel({
        title: 'PROTOCOL: ROSES & CHOCO',
        body: `<strong>🌹 RED ROSE:</strong><br/>Give to: <span class="text-pink-500">${targetBatch} ${targetGender}</span><br/><br/><strong>🍫 CHOCOLATE:</strong><br/>Give to: <span class="text-purple-400">Any Senior</span>`
      });
    }
  };

  return (
    <main className="absolute inset-0 z-10 w-full h-full flex flex-col pointer-events-none">
      
      {/* Header */}
      <header className="flex justify-between items-start p-4 pointer-events-auto">
        <div>
          <div className="text-[10px] font-mono text-neon tracking-widest mb-1">/// ONLINE</div>
          <div className="text-2xl font-display font-bold text-white">{config.eventName} <span className="text-neon">{config.eventYear}</span></div>
        </div>
        <div className="text-right">
          <div className="text-lg font-mono text-white">{time}</div>
        </div>
      </header>

      {/* Main Info Display */}
      <div className="flex-1 flex items-center justify-center relative my-4 pointer-events-auto">
        <div className="max-w-3xl w-full p-6 relative mx-4 glass !bg-transparent !border-none !shadow-none" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 0 15px rgba(0, 243, 255, 0.4)' }}>
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-neon"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-neon"></div>
          
          <h2 className="text-3xl font-display font-bold text-white mb-4">{activePanel.title}</h2>
          
          {/* dangerouslySetInnerHTML is used here because our text contains HTML tags like <strong> */}
          <div className="text-gray-200 font-mono text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: activePanel.body }}></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pointer-events-auto mb-20 md:mb-0 p-4">
        <button onClick={() => updatePanel('venue')} className="glass py-3 text-neon font-mono text-xs hover:bg-neon/20 transition-colors">VENUE</button>
        <button onClick={() => updatePanel('timings')} className="glass py-3 text-neon font-mono text-xs hover:bg-neon/20 transition-colors">TIMINGS</button>
        
        {/* Render Fresher Buttons */}
        {user.batch === 'fresher' && (
          <>
            <button className="glass py-3 text-white font-mono text-xs border-white bg-white/10 hover:bg-white/20 transition-colors">CLAIM INVITE</button>
            <button onClick={() => updatePanel('roses')} className="glass py-3 text-pink-500 font-mono text-xs border-pink-500 bg-pink-500/10 hover:bg-pink-500/20 transition-colors" style={{ textShadow: '0 0 10px #ec4899' }}>ROSES & CHOCOLATES</button>
            <button className="glass py-3 text-green-400 font-mono text-xs border-green-400 bg-green-400/10 hover:bg-green-400/20 transition-colors" style={{ textShadow: '0 0 10px #4ade80' }}>UPLOAD SONGS</button>
          </>
        )}

        {/* Render Senior Buttons */}
        {user.batch === 'senior' && (
          <button className="glass py-3 text-neon font-mono text-xs border-neon bg-neon/10 hover:bg-neon/20 transition-colors" style={{ boxShadow: '0 0 15px rgba(0, 243, 255, 0.3)', textShadow: '0 0 5px #00f3ff' }}>
            FLASHBACK '25
          </button>
        )}
      </div>

    </main>
  );
}
