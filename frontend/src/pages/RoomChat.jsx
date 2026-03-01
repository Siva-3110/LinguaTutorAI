import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { socket } from '../services/socket';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, LogOut, Radio, Terminal, User } from 'lucide-react';

const RoomChat = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef(null);

    const userId = `user_${Math.floor(Math.random() * 10000)}`;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        socket.connect();
        socket.emit('join_room', roomId);

        socket.on('user_joined', (data) => {
            setMessages((prev) => [...prev, { system: true, text: data.message }]);
        });

        socket.on('user_left', (data) => {
            setMessages((prev) => [...prev, { system: true, text: data.message }]);
        });

        socket.on('receive_message', (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.emit('leave_room', roomId);
            socket.off('user_joined');
            socket.off('user_left');
            socket.off('receive_message');
            socket.disconnect();
        };
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        const msgData = {
            roomId,
            senderId: userId,
            senderName: `HACKER-${userId.slice(-4)}`,
            message: inputMessage,
            timestamp: new Date().toISOString()
        };

        socket.emit('send_message', msgData);
        setMessages((prev) => [...prev, { ...msgData, isMine: true }]);
        setInputMessage('');
    };

    return (
        <div className="flex flex-col h-[85vh] w-full max-w-6xl mx-auto glass-panel-heavy rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-pink-500/20 overflow-hidden relative">
            {/* Header */}
            <div className="bg-slate-950/80 backdrop-blur-md p-4 md:p-6 flex justify-between items-center z-10 border-b border-pink-500/30 shrink-0">
                <div className="flex items-center">
                    <div className="relative flex h-3 w-3 mr-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500 shadow-[0_0_8px_rgba(255,0,255,1)]"></span>
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 uppercase tracking-widest flex items-center">
                            <Radio className="mr-2 w-6 h-6 text-pink-500" />
                            ARRAY: {roomId}
                        </h2>
                        <p className="text-xs text-slate-400 uppercase tracking-widest font-mono mt-1">Encrypted Group Channel</p>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/collab')}
                    className="flex items-center text-sm bg-red-950/40 hover:bg-red-900 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg transition-colors font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(239,68,68,0.2)] hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                >
                    <LogOut size={16} className="mr-2" />
                    <span className="hidden sm:inline">Disconnect</span>
                </motion.button>
            </div>

            {/* Messages Window */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-slate-900/40 relative z-0 scrollbar-hide">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
                <AnimatePresence>
                    {messages.map((msg, idx) => {
                        if (msg.system) {
                            return (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    key={idx}
                                    className="flex justify-center my-4 relative z-10"
                                >
                                    <span className="text-xs bg-slate-800/80 border border-cyan-500/30 text-cyan-400 font-mono uppercase tracking-widest px-4 py-1.5 rounded-full shadow-[0_0_10px_rgba(0,245,255,0.2)]">
                                        <Terminal size={12} className="inline mr-2" />
                                        {msg.text}
                                    </span>
                                </motion.div>
                            );
                        }

                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ type: 'spring', stiffness: 200 }}
                                key={idx}
                                className={`flex w-full ${msg.isMine ? 'justify-end' : 'justify-start'} group relative z-10`}
                            >
                                <div className={`flex flex-col ${msg.isMine ? 'items-end' : 'items-start'} max-w-[85%] sm:max-w-[70%]`}>
                                    <div className="flex items-center mb-1 px-2 space-x-2 opacity-70">
                                        {!msg.isMine && <User size={12} className="text-cyan-400" />}
                                        <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${msg.isMine ? 'text-pink-400' : 'text-cyan-400'}`}>
                                            {msg.senderName}
                                        </span>
                                    </div>
                                    <div className={`px-5 py-3 rounded-2xl relative shadow-lg
                                        ${msg.isMine
                                            ? 'bg-gradient-to-br from-pink-600 to-purple-600 text-white rounded-br-none shadow-[0_0_15px_rgba(255,0,255,0.3)] border border-pink-400/50'
                                            : 'bg-slate-800 text-slate-100 rounded-bl-none border border-cyan-500/50 shadow-[0_0_15px_rgba(0,245,255,0.1)]'
                                        }`}>
                                        <div className="text-sm md:text-base break-words leading-relaxed">{msg.message}</div>
                                        {msg.timestamp && (
                                            <div className={`text-[9px] mt-2 font-mono opacity-60 ${msg.isMine ? 'text-right' : 'text-left'}`}>
                                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
                <div ref={messagesEndRef} className="h-4" />
            </div>

            {/* Input Form */}
            <div className="p-4 md:p-6 bg-slate-950/80 backdrop-blur-md border-t border-pink-500/30 shrink-0 z-10">
                <form onSubmit={sendMessage} className="flex gap-3 max-w-5xl mx-auto">
                    <div className="relative flex-grow group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500 group-focus-within:opacity-100"></div>
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Transmit to array..."
                            className="relative w-full px-6 py-4 bg-slate-900 border border-slate-700/50 rounded-xl focus:outline-none focus:border-cyan-400 text-slate-100 placeholder-slate-500 font-mono text-sm transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={!inputMessage.trim()}
                        className="relative flex items-center justify-center px-6 md:px-8 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl transition font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(0,245,255,0.4)] border border-cyan-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="hidden sm:inline mr-2">TX</span>
                        <Send size={20} className="drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
                    </motion.button>
                </form>
            </div>
        </div>
    );
};

export default RoomChat;
