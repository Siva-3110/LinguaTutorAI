import { useState, useRef, useCallback } from 'react';

const useVoiceRecorder = (onAudioReady) => {
    const [isRecording, setIsRecording] = useState(false);
    const [error, setError] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const startRecording = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    audioChunksRef.current.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                if (onAudioReady) {
                    onAudioReady(audioBlob);
                }
                // Stop all tracks to release the microphone
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
            setError(null);
        } catch (err) {
            console.error("Error accessing microphone:", err);
            setError("Microphone access denied or unavailable.");
            setIsRecording(false);
        }
    }, [onAudioReady]);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    }, [isRecording]);

    return { isRecording, startRecording, stopRecording, error };
};

export default useVoiceRecorder;
