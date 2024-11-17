import { useEffect, useState } from 'react';

const SpeechListener = () => {
    const [detectedText, setDetectedText] = useState('');
    const [isListening, setIsListening] = useState(false);
    let recognition: SpeechRecognition;

    useEffect(() => {
        if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
            console.error('SpeechRecognition is not supported in this browser.');
            return;
        }

        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setDetectedText(transcript);
        };

        recognition.onend = () => {
            if (isListening) {
                recognition.start();
            }
        };

        return () => {
            recognition.stop();
        };
    }, [isListening]);

    const startListening = () => {
        setIsListening(true);
        recognition.start();
    };

    const stopListening = () => {
        setIsListening(false);
        recognition.stop();
    };

    return (
        <div>
            <p>Detected Text: {detectedText}</p>
            <button onClick={startListening} disabled={isListening}>Start</button>
            <button onClick={stopListening} disabled={!isListening}>Stop</button>
        </div>
    );
};

export default SpeechListener;