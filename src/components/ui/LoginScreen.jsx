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
      // Pass the user data up to the main App
      onLoginSuccess({ roll, ...user });
    } else {
      setError(true);
      // Shake effect logic can be added later via CSS/GSAP
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <section className="absolute inset-0 z-10 w-full h-full flex flex-col pointer-events-none">
      
      <button 
        onClick={() => alert('For Voice on Mobile: Use Chrome. Must be HTTPS.')} 
        className="absolute top-6 right-6 text-gray-500 hover:text-neon transition-colors pointer-events-auto"
      >
        <Info size={24} />
      </button>

      <div className="flex-1 flex flex-col items-center justify-center p-6 pointer-events-auto">
        <div className="w-full max-w-sm text-center border border-gray-800 p-8 bg-black/80 backdrop-blur-md">
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
          
          <div className="text-[10px] font-mono text-gray-500 mt-3 text-left">
            Valid Test Codes:<br/>
            &gt; Admin: NEO777<br/>
            &gt; Senior: TRINITY99<br/>
            &gt; Fresher: PETER25
          </div>
          
          <div className={`h-6 mt-4 text-xs font-mono text-red-500 transition-opacity ${error ? 'opacity-100' : 'opacity-0'}`}>
            ACCESS DENIED
          </div>
          
          <button 
            onClick={handleVerify} 
            className="mt-6 w-full py-3 bg-neon/10 border border-neon text-neon font-mono tracking-widest hover:bg-neon hover:text-black transition-all"
          >
            AUTHENTICATE
          </button>
        </div>
      </div>

    </section>
  );
}
