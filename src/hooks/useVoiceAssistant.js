import { useState, useEffect, useCallback } from 'react';

export function useVoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');

  // --- TEXT TO SPEECH (JARVIS VOICE) ---
  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to find a good robotic/clean English voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes("Google US English")) 
                        || voices.find(v => v.lang === "en-US") 
                        || voices[0];
    
    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.rate = 1.0;
    utterance.pitch = 0.9; // Slightly lower pitch for a more serious tone

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  // --- SPEECH TO TEXT (LISTENING) ---
  const toggleListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Voice Control is not supported on this browser. Try Chrome.");
      return;
    }

    if (isListening) {
      // If we are already listening, we don't need to do anything, 
      // the recognition.onend will handle setting state to false.
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript(''); // Clear old transcript
    };

    recognition.onresult = (event) => {
      const currentTranscript = event.results[0][0].transcript.toLowerCase();
      console.log("Heard:", currentTranscript);
      setTranscript(currentTranscript);
      
      // FUTURE AI UPGRADE POINT:
      // Here is where you would take 'currentTranscript' and send it to an LLM API!
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      if (event.error === 'not-allowed') alert("Microphone access blocked.");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (e) {
      console.error("Microphone already active", e);
    }
  }, [isListening]);

  return { isListening, isSpeaking, transcript, toggleListening, speak, setTranscript };
}
