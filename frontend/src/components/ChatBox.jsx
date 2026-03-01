import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useChat from '../hooks/useChat';
import useSpeech from '../hooks/useSpeech';
import MessageBubble from './MessageBubble';
import { Send, Globe, Cpu, TerminalSquare, Mic, Volume2, VolumeX } from 'lucide-react';

const ChatBox = () => {
    const { messages, isTyping, sendMessage, language, setLanguage } = useChat();
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [autoPlay, setAutoPlay] = useState(true);
    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null);
    const { speak, stop } = useSpeech();

    // Auto-play AI messages
    useEffect(() => {
        if (!autoPlay || messages.length === 0) return;

        const lastMsg = messages[messages.length - 1];
        if (lastMsg.role === 'ai' && !isTyping) { // Only speak when typing is finished
            let textToSpeak = lastMsg.text || '';
            if (lastMsg.structured) {
                textToSpeak = [
                    lastMsg.structured.explanation,
                    lastMsg.structured.steps?.join('. '),
                    lastMsg.structured.summary
                ].filter(Boolean).join('. ');
            }
            if (textToSpeak) {
                speak(textToSpeak, language);
            }
        }
    }, [messages, isTyping, autoPlay, language, speak]);

    // Native Browser Speech Recognition Logic
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return;

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                transcript += event.results[i][0].transcript;
            }
            // Update input visually while speaking
            setInput(transcript);
        };

        recognition.onerror = (event) => {
            console.error("Browser speech recognition error:", event.error);
            if (event.error !== 'no-speech') {
                alert(`Microphone Error: ${event.error}. Please ensure hardware is connected and permissions are granted.`);
            }
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;

    }, []);

    // Update language dynamically without recreating the whole object
    useEffect(() => {
        if (recognitionRef.current) {
            recognitionRef.current.lang = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
        }
    }, [language]);


    const toggleListening = () => {
        if (!recognitionRef.current) {
            alert("Speech recognition is not supported in this browser. Please use Chrome or Edge.");
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            setInput(''); // Clear input before new recording
            try {
                recognitionRef.current.start();
                setIsListening(true);
            } catch (e) {
                console.error("Failed to start listening", e);
                // Sometimes if it's already started but state is out of sync
                recognitionRef.current.stop();
            }
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;
        sendMessage(input);
        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend(e);
        }
    };

    return (
        <div className="flex flex-col flex-grow w-full h-full relative bg-transparent overflow-hidden">
            {/* Header / Tools */}
            <div className="px-4 md:px-6 py-4 glass-panel border-b border-cyan-900/40 flex justify-between items-center z-10 shrink-0">
                <div className="flex items-center text-slate-300 font-medium">
                    <Globe size={20} className="mr-3 text-cyan-500 drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]" />
                    <span className="hidden sm:inline text-sm mr-3 font-semibold text-slate-300">Language:</span>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-slate-900/50 border border-cyan-800 text-cyan-400 text-sm font-medium rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 block p-2 outline-none transition-colors cursor-pointer shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"
                    >
                        <option value="en">English</option>
                        <option value="ta">Tamil (தமிழ்)</option>
                        <option value="hi">Hindi (हिंदी)</option>
                    </select>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => {
                            setAutoPlay(!autoPlay);
                            if (autoPlay) stop(); // Stop immediately if turning off
                        }}
                        className={`hidden md:flex items-center px-4 py-2 rounded-md border text-sm font-medium transition-all shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]
                            ${autoPlay
                                ? 'bg-cyan-900/40 text-cyan-400 border-cyan-500/50 drop-shadow-[0_0_5px_rgba(0,245,255,0.4)]'
                                : 'bg-slate-900/60 text-slate-500 border-slate-700/50 hover:text-slate-300'
                            }`}
                        title={autoPlay ? "Auto-Play Enabled" : "Auto-Play Disabled"}
                    >
                        {autoPlay ? <Volume2 size={16} className="mr-2" /> : <VolumeX size={16} className="mr-2" />}
                        {autoPlay ? "Auto-Play On" : "Auto-Play Off"}
                    </button>

                    <div className="hidden md:flex text-sm font-medium text-purple-400 bg-purple-900/20 px-4 py-2 rounded-md border border-purple-500/30 items-center shadow-[inset_0_0_10px_rgba(168,85,247,0.2)]">
                        <TerminalSquare size={16} className="mr-2 text-purple-500" />
                        Ready
                    </div>
                    <div className="text-sm font-medium text-cyan-400 bg-cyan-900/20 px-4 py-2 rounded-md border border-cyan-500/30 flex items-center shadow-[inset_0_0_10px_rgba(0,245,255,0.2)] animate-pulse">
                        <Cpu size={16} className="mr-2 text-cyan-500" />
                        Online
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-grow p-4 md:p-6 overflow-y-auto space-y-6 scrollbar-hide">
                <AnimatePresence>
                    {messages.map((msg, index) => (
                        <MessageBubble key={index} message={msg} language={language} speak={speak} stop={stop} />
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                    >
                        <div className="glass-panel-heavy text-cyan-400 px-6 py-4 rounded-2xl rounded-bl-none border border-cyan-500/40 flex items-center space-x-3 shadow-[0_0_15px_rgba(0,245,255,0.2)]">
                            <span className="text-sm font-medium">Typing...</span>
                            <div className="flex space-x-1.5">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(0,245,255,1)]"></div>
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(168,85,247,1)]" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(255,0,255,1)]" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} className="h-4" />
            </div>

            {/* Input Box */}
            <div className="p-4 md:p-6 glass-panel border-t border-cyan-900/40 shrink-0 relative z-20">
                <form onSubmit={handleSend} className="max-w-5xl mx-auto flex space-x-3">
                    <div className="relative flex-grow group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500 group-focus-within:opacity-100"></div>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={isListening ? "Listening..." : "Type a message..."}
                            disabled={isTyping || isListening}
                            className={`relative w-full px-6 py-4 bg-slate-950/80 border ${isListening ? 'border-pink-500 shadow-[inset_0_0_15px_rgba(236,72,153,0.3)]' : 'border-slate-700/50'} rounded-xl focus:outline-none focus:border-cyan-500 text-slate-200 placeholder-slate-500 text-base transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] disabled:opacity-50`}
                        />
                    </div>

                    {/* Microphone Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={toggleListening}
                        disabled={isTyping}
                        className={`relative flex items-center justify-center p-4 rounded-xl transition font-semibold flex-shrink-0 border 
                            ${isListening
                                ? 'bg-pink-600/20 text-pink-400 border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.6)] animate-pulse'
                                : 'bg-slate-900 border-slate-700/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 shadow-[0_0_10px_rgba(0,0,0,0.3)]'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {isListening ? (
                            <div className="relative flex items-center justify-center">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-60"></span>
                                <div className="w-3 h-3 bg-pink-500 rounded-sm animate-pulse relative z-10"></div>
                            </div>
                        ) : (
                            <Mic size={24} className={isListening ? "drop-shadow-[0_0_8px_rgba(236,72,153,1)]" : ""} />
                        )}
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={!input.trim() || isTyping}
                        className="relative inline-flex items-center justify-center px-6 md:px-8 py-4 rounded-xl text-white font-semibold flex-shrink-0 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,0,255,0.4)] border border-pink-400/50"
                    >
                        <span className="hidden sm:inline mr-2">Send</span>
                        <Send size={20} className="drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
                    </motion.button>
                </form>
            </div>

            {/* Background elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        </div>
    );
};

export default ChatBox;
