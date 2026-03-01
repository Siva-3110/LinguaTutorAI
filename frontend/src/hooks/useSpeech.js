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
    const utteranceRef = useRef(null); // Prevent garbage collection bug

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = synthRef.current.getVoices();
            console.log("[useSpeech] Loaded voices:", availableVoices.length);
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
            }
        };

        loadVoices();
        if (synthRef.current.onvoiceschanged !== undefined) {
            synthRef.current.onvoiceschanged = loadVoices;
        }

        // --- SILENT UNLOCK FIX FOR CHROME AUTOPLAY POLICY ---
        // Chrome blocks async TTS ("not-allowed" error) unless the user has explicitly interacted.
        // We play a silent utterance on the first user click to "unlock" the speech engine globally.
        const unlockAudio = () => {
            console.log("[useSpeech] Unlocking audio engine on user interaction...");
            const synth = window.speechSynthesis;
            if (synth.state === 'suspended') {
                synth.resume();
            }
            const silentUtterance = new SpeechSynthesisUtterance(' '); // Space instead of empty string to prevent hanging queue
            silentUtterance.volume = 0;
            silentUtterance.rate = 10; // Play as fast as possible
            silentUtterance.onend = () => console.log("[useSpeech] Silent unlock completed.");
            synth.speak(silentUtterance);

            document.removeEventListener('click', unlockAudio);
            document.removeEventListener('touchstart', unlockAudio);
        };

        document.addEventListener('click', unlockAudio);
        document.addEventListener('touchstart', unlockAudio);

        return () => {
            document.removeEventListener('click', unlockAudio);
            document.removeEventListener('touchstart', unlockAudio);
        };
    }, []);

    const speak = useCallback((text, lang = 'en') => {
        if (!synthRef.current) return;

        console.log("[useSpeech] speak called with text:", text, "lang:", lang);

        // Safely clear the queue if it's stuck, to prevent silent failures
        if (synthRef.current.speaking || synthRef.current.pending) {
            console.log("[useSpeech] Queue is busy/stuck. Canceling before new speech.");
            synthRef.current.cancel();
        }

        if (!text) return;

        // Re-adding variables accidentally deleted during the chunking update!
        const targetLang = getVoiceLangCode(lang);
        const voice = voices.find(v => v.lang === targetLang || v.lang.startsWith(targetLang.split('-')[0]));
        if (voice) {
            console.log("[useSpeech] Matched specific voice:", voice.name, voice.lang);
        } else {
            console.log("[useSpeech] No specific voice match found for target lang:", targetLang, "using default.");
        }

        // Critical Fix: Chromium has a widespread bug where long strings silently fail to play.
        // We bypass this by chunking the text by punctuation.
        const chunks = text.match(/[^.!?]+[.!?]+/g) || [text]; // Split by sentences

        console.log(`[useSpeech] Split text into ${chunks.length} chunks to prevent Chrome silent crash.`);

        let currentChunkIndex = 0;

        const speakNextChunk = () => {
            if (currentChunkIndex >= chunks.length) {
                setIsSpeaking(false);
                return;
            }

            const chunkText = chunks[currentChunkIndex];
            const utterance = new SpeechSynthesisUtterance(chunkText);
            utterance.lang = targetLang;
            utterance.rate = 1.0;
            utterance.pitch = 1.0;

            if (voice) {
                utterance.voice = voice;
            }

            utterance.onstart = () => {
                if (currentChunkIndex === 0) setIsSpeaking(true);
            };

            utterance.onend = () => {
                currentChunkIndex++;
                speakNextChunk(); // Play the next sentence
            };

            utterance.onerror = (e) => {
                console.error(`[useSpeech] SpeechSynthesis error on chunk ${currentChunkIndex}:`, e);
                setIsSpeaking(false);
            };

            // Keep reference to prevent GC
            utteranceRef.current = utterance;
            window._globalUtterance = utterance;

            synthRef.current.speak(utterance);
        };

        // Start the recursive playback chain
        console.log("[useSpeech] Triggering chunked speech synthesis start.");
        speakNextChunk();

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
