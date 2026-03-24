import React, { useState } from 'react';
import { Info } from 'lucide-react';
import dummyUsers from '../../data/dummyUsers.json';

export default function LoginScreen({ onLoginSuccess }) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);

  const handleVerify = () => {
    const roll = inputValue.trim().toUpperCase();
    const user = dummyUsers[roll];

    if (user) {
      setError(false);
      onLoginSuccess({ roll, ...user });
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <section className="absolute inset-0 z-10 w-full h-full flex flex-col items-center justify-center p-6 bg-[#020005] bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.05)_0%,transparent_100%)]">
      
      <button 
        onClick={() => alert('For Voice on Mobile: Use Chrome. Must be HTTPS.')} 
        className="absolute top-6 right-6 text-gray-500 hover:text-neon transition-colors"
      >
        <Info size={24} />
      </button>

      <div className="w-full max-w-sm text-center border border-gray-800 p-8 bg-black/80 backdrop-blur-md shadow-[0_0_30px_rgba(0,243,255,0.05)]">
        <div className="text-neon font-mono text-xs tracking-widest mb-6">
          /// IDENTITY VERIFICATION
        </div>
        
        <div className="text-gray-400 font-mono text-xs mb-2">
          ENTER ACCESS CODE
        </div>
        
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="e.g., NEO777 or GWEN25" 
          autoComplete="off"
          className={`bg-transparent border-b-2 ${error ? 'border-red-500 text-red-500' : 'border-[#333] text-neon'} font-mono text-xl w-full outline-none text-center tracking-widest p-2 transition-colors`}
        />
        
        <div className="text-[10px] font-mono text-gray-500 mt-3 text-left leading-relaxed">
          Valid Test Codes:<br/>
          &gt; Admin: NEO777<br/>
          &gt; Senior: TRINITY99<br/>
          &gt; Fresher: PETER25
        </div>
        
        <div className={`h-6 mt-4 text-xs font-mono font-bold text-red-500 transition-opacity duration-300 ${error ? 'opacity-100' : 'opacity-0'}`}>
          ACCESS DENIED
        </div>
        
        <button 
          onClick={handleVerify} 
          className="mt-6 w-full py-3 bg-neon/10 border border-neon text-neon font-mono tracking-widest hover:bg-neon hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(0,243,255,0.2)] hover:shadow-[0_0_20px_rgba(0,243,255,0.6)]"
        >
          AUTHENTICATE
        </button>
      </div>
    </section>
  );
}
