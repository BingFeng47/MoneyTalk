// components/SpeechListener.js
'use client'
import { useEffect } from 'react';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const SpeechListener = () => {
  useEffect(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      console.error('SpeechRecognition is not supported in this browser.');
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    // When speech is detected
    recognition.onresult = (event: { results: { [x: string]: { transcript: any; }[]; }; resultIndex: string | number; }) => {
      const transcript = event.results[event.resultIndex][0].transcript;
      console.log(`Heard: ${transcript}`);
      
      // Check if the workphrase is "hello"
      if (transcript.toLowerCase().includes('hello')) {
        console.log('Hello detected, triggering action.');
        // Trigger your desired action here
      }
    };

    recognition.onerror = (event: { error: any; }) => {
      console.log('Speech recognition error:', event.error);
    };

    // Start listening in the background
    recognition.start();

    // Clean up when the component is unmounted
    return () => {
      recognition.stop();
    };
  }, []);

  return null;  // This component doesn't render anything visually
};

export default SpeechListener;