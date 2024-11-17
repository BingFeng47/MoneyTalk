import { useEffect, useState } from 'react';

const SpeechListener = () => {
    const [detectedText, setDetectedText] = useState('');

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
        recognition.onresult = (event) => {
            const transcript = event.results[event.resultIndex][0].transcript;
            console.log(`Heard: ${transcript}`);
            setDetectedText(transcript);

            // Check if the workphrase is "hello"
            if (transcript.toLowerCase().includes('hello')) {
                console.log('Hello detected, triggering action.');
                // Trigger your desired action here
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };

        // Start listening in the background
        recognition.start();

        // Clean up when the component is unmounted
        return () => {
            recognition.stop();
        };
    }, []);

    return (
        <div>
            <p>Detected Text: {detectedText}</p>
        </div>
    );
};

export default SpeechListener;