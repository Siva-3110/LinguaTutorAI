import { useState, useEffect, useRef, useCallback } from 'react';

// Maps our app's language codes to the best available browser TTS voice
const getVoiceLangCode = (appLang) => {
    switch (appLang) {
        case 'ta':
            return 'ta-IN';
        case 'hi':
            return 'hi-IN';
        case 'en':
        default:
            return 'en-US';
    }
};

const useSpeech = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voices, setVoices] = useState([]);
    const synthRef = useRef(window.speechSynthesis);

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = synthRef.current.getVoices();
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
            }
        };

        loadVoices();
        if (synthRef.current.onvoiceschanged !== undefined) {
            synthRef.current.onvoiceschanged = loadVoices;
        }
    }, [synthRef]);

    const speak = useCallback((text, lang = 'en') => {
        if (!synthRef.current) return;

        // Stop any currently playing audio
        synthRef.current.cancel();

        if (!text) return;

        const utterance = new SpeechSynthesisUtterance(text);
        const targetLang = getVoiceLangCode(lang);
        utterance.lang = targetLang;
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        // Try to find a native voice matching the language exactly
        const voice = voices.find(v => v.lang === targetLang || v.lang.startsWith(targetLang.split('-')[0]));
        if (voice) {
            utterance.voice = voice;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = (e) => {
            console.error('SpeechSynthesis error:', e);
            setIsSpeaking(false);
        };

        synthRef.current.speak(utterance);
    }, [voices]);

    const stop = useCallback(() => {
        if (synthRef.current) {
            synthRef.current.cancel();
            setIsSpeaking(false);
        }
    }, []);

    return { speak, stop, isSpeaking };
};

export default useSpeech;
