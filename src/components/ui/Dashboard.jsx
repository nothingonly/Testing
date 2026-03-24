import React, { useState, useEffect } from 'react';
import config from '../../data/config.json';
// Import the Hook and the new Modal!
import { useVoiceAssistant } from '../../useVoiceAssistant.js'; 
import InviteModal from './InviteModal.jsx';

export default function Dashboard({ user }) {
  const [time, setTime] = useState('00:00');
  const [showInviteModal, setShowInviteModal] = useState(false); // New state for Modal
  const [activePanel, setActivePanel] = useState({
    title: 'SYSTEM ONLINE',
    body: `Welcome, Agent <strong>${user?.name?.split(' ')[0] || 'UNKNOWN'}</strong>.<br/><br/>Status: <span class="text-neon">${user?.role || 'GUEST'}</span><br/><br/><span class="text-neon">></span> <strong>Tap buttons</strong> below.<br/><span class="text-neon">></span> Or tap the reactor and say "Venue".`,
  });

  const { isListening, isSpeaking, transcript, toggleListening, speak, setTranscript } = useVoiceAssistant();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const updatePanel = (key) => {
    if (key === 'venue') {
      setActivePanel({ title: 'LOCATION', body: `<strong>${config.venue.name}</strong><br/>${config.venue.address}` });
      speak(config.venue.speechText);
    } else if (key === 'timings') {
      setActivePanel({ title: 'TIMELINE', body: `<strong>EVENT HOURS</strong><br/>${config.timings.display}` });
      speak(config.timings.speechText);
    } else if (key === 'roses') {
      const targetBatch = user?.batch === 'fresher' ? '1st Year' : '2nd Year';
      const targetGender = user?.gender === 'M' ? 'Girl' : 'Boy';
      setActivePanel({
        title: 'PROTOCOL: ROSES & CHOCO',
        body: `<strong>🌹 RED ROSE:</strong><br/>Give to: <span class="text-pink-500">${targetBatch} ${targetGender}</span><br/><br/><strong>🍫 CHOCOLATE:</strong><br/>Give to: <span class="text-purple-400">Any Senior</span>`
      });
      speak(`Protocol initiated. Red rose for ${targetBatch} ${targetGender}s. Chocolates for any senior.`);
    }
  };

  useEffect(() => {
    if (!transcript) return;
    
    if (transcript.includes('venue') || transcript.includes('where') || transcript.includes('location')) {
      updatePanel('venue');
    } else if (transcript.includes('time') || transcript.includes('when')) {
      updatePanel('timings');
    } else if (transcript.includes('rose') || transcript.includes('chocolate')) {
      updatePanel('roses');
    } else {
      speak("Command not recognized. Please specify venue, timings, or protocols.");
    }
    
    setTranscript('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript]);

  let reactorColorClass = "bg-white shadow-[0_0_20px_#00f3ff]"; 
  let ringSpinClass = "animate-[spin_4s_linear_infinite] shadow-[0_0_15px_rgba(0,243,255,0.5)] border-neon";
  
  if (isListening) {
    reactorColorClass = "bg-red-500 shadow-[0_0_30px_#ff003c] animate-pulse";
    ringSpinClass = "animate-spin border-red-500 shadow-[0_0_20px_#ff003c]";
  } else if (isSpeaking) {
    reactorColorClass = "bg-yellow-400 shadow-[0_0_30px_#ffd700] animate-pulse";
    ringSpinClass = "animate-[spin_2s_linear_infinite] border-yellow-400 shadow-[0_0_20px_#ffd700]";
  }

  return (
    <main className="absolute inset-0 z-10 w-full h-full flex flex-col pointer-events-none">
      
      <header className="flex justify-between items-start p-4 pointer-events-auto">
        <div>
          <div className="text-[10px] font-mono text-neon tracking-widest mb-1">/// ONLINE</div>
          <div className="text-2xl font-display font-bold text-white tracking-wider">
            {config.eventName} <span className="text-neon">{config.eventYear}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-mono text-white tracking-widest">{time}</div>
          <div className={`text-[10px] font-mono mt-1 transition-opacity duration-300 ${isListening || isSpeaking ? 'opacity-100' : 'opacity-0'} ${isListening ? 'text-red-500' : 'text-yellow-400'}`}>
            {isListening ? 'LISTENING...' : 'PROCESSING...'}
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center relative my-4 pointer-events-auto">
        <div className="max-w-3xl w-full p-6 relative mx-4 bg-transparent border-none shadow-none" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 0 15px rgba(0, 243, 255, 0.4)' }}>
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-neon"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-neon"></div>
          
          <h2 className="text-3xl font-display font-bold text-white mb-4 tracking-widest uppercase">
            {activePanel.title}
          </h2>
          
          <div 
            className="text-gray-200 font-mono text-base leading-relaxed tracking-wide" 
            dangerouslySetInnerHTML={{ __html: activePanel.body }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pointer-events-auto mb-24 md:mb-6 p-4 max-w-4xl mx-auto w-full">
        <button onClick={() => updatePanel('venue')} className="glass py-3 text-neon font-mono text-xs tracking-widest hover:bg-neon/20 transition-all duration-300">VENUE</button>
        <button onClick={() => updatePanel('timings')} className="glass py-3 text-neon font-mono text-xs tracking-widest hover:bg-neon/20 transition-all duration-300">TIMINGS</button>
        
        {user?.batch === 'fresher' && (
          <>
            {/* THIS IS THE BUTTON WE UPDATED */}
            <button onClick={() => setShowInviteModal(true)} className="glass py-3 text-white font-mono text-xs tracking-widest border-white bg-white/5 hover:bg-white/20 transition-all duration-300">CLAIM INVITE</button>
            <button onClick={() => updatePanel('roses')} className="glass py-3 text-pink-500 font-mono text-xs tracking-widest border-pink-500 bg-pink-500/10 hover:bg-pink-500/30 transition-all duration-300">ROSES & CHOCO</button>
            <button className="glass py-3 text-green-400 font-mono text-xs tracking-widest border-green-400 bg-green-400/10 hover:bg-green-400/30 transition-all duration-300">UPLOAD SONGS</button>
          </>
        )}

        {user?.batch === 'senior' && (
          <button className="glass py-3 text-neon font-mono text-xs tracking-widest border-neon bg-neon/10 hover:bg-neon/30 transition-all duration-300">FLASHBACK '25</button>
        )}
      </div>

      <div onClick={toggleListening} className="fixed bottom-6 right-6 w-16 h-16 z-50 flex items-center justify-center cursor-pointer pointer-events-auto">
        <div className={`absolute inset-0 border-2 rounded-full transition-all duration-500 ${ringSpinClass}`}></div>
        <div className={`w-1/3 h-1/3 rounded-full transition-all duration-300 ${reactorColorClass}`}></div>
      </div>

      {/* RENDER THE MODAL IF STATE IS TRUE */}
      {showInviteModal && (
        <InviteModal user={user} onClose={() => setShowInviteModal(false)} />
      )}

    </main>
  );
}
