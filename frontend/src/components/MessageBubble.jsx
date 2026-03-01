import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User, AlertTriangle } from 'lucide-react';

const MessageBubble = ({ message }) => {
    const isUser = message.role === 'user';
    const timeString = message.timestamp
        ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : '';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} group`}
        >
            <div
                className={`max-w-[85%] sm:max-w-[75%] px-5 py-4 rounded-2xl relative shadow-lg
                    ${isUser
                        ? 'bg-gradient-to-br from-pink-600 to-purple-600 text-white rounded-br-none shadow-[0_0_15px_rgba(255,0,255,0.3)] border border-pink-400/50'
                        : message.error
                            ? 'bg-red-950/80 text-red-200 border-l-4 border-l-red-500 rounded-bl-none shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                            : 'glass-panel-heavy rounded-bl-none neon-border-blue'
                    }`}
            >
                {/* Avatar Icon */}
                <div className={`absolute ${isUser ? '-right-3 -bottom-3' : '-left-3 -bottom-3'} w-8 h-8 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.8)] z-10 ${isUser ? 'bg-pink-500 border border-pink-300' : 'bg-cyan-500 border border-cyan-300'}`}>
                    {isUser ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                </div>

                {message.error && (
                    <div className="text-base font-bold flex items-center text-red-400 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]">
                        <AlertTriangle size={18} className="mr-2" /> {message.error}
                    </div>
                )}

                {message.text && !message.error && (
                    <div className="text-base break-words text-slate-100">{message.text}</div>
                )}

                {!message.text && !message.structured && !message.error && message.reply && (
                    <div className="text-base break-words text-slate-100">{message.reply}</div>
                )}

                {message.structured && (
                    <div className="space-y-5">
                        {message.structured.explanation && (
                            <div>
                                <h3 className="font-bold text-cyan-400 mb-1 text-xs uppercase tracking-widest drop-shadow-[0_0_5px_rgba(0,245,255,0.6)]">System Explanation</h3>
                                <p className="text-slate-200 leading-relaxed">{message.structured.explanation}</p>
                            </div>
                        )}

                        {message.structured.steps && Array.isArray(message.structured.steps) && message.structured.steps.length > 0 && (
                            <div>
                                <h3 className="font-bold text-purple-400 mb-2 text-xs uppercase tracking-widest drop-shadow-[0_0_5px_rgba(168,85,247,0.6)]">Execution Sequence</h3>
                                <ul className="list-decimal pl-5 space-y-2 text-slate-300">
                                    {message.structured.steps.map((step, idx) => (
                                        <li key={idx} className="leading-relaxed marker:text-purple-500 marker:font-bold">{step}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {message.structured.examples && Array.isArray(message.structured.examples) && message.structured.examples.length > 0 && (
                            <div>
                                <h3 className="font-bold text-pink-400 mb-2 text-xs uppercase tracking-widest drop-shadow-[0_0_5px_rgba(255,0,255,0.6)]">Data Examples</h3>
                                <div className="bg-slate-900/60 p-4 rounded-xl border border-pink-500/30 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                                    <ul className="list-disc pl-5 space-y-2 text-slate-300 font-mono text-sm">
                                        {message.structured.examples.map((ex, idx) => (
                                            <li key={idx} className="leading-relaxed marker:text-pink-500">{ex}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {message.structured.summary && (
                            <div>
                                <h3 className="font-bold text-yellow-400 mb-1 text-xs uppercase tracking-widest drop-shadow-[0_0_5px_rgba(250,204,21,0.6)]">Metric Summary</h3>
                                <p className="text-yellow-100 italic font-medium">{message.structured.summary}</p>
                            </div>
                        )}
                    </div>
                )}

                {timeString && (
                    <div className={`text-[10px] mt-2 font-mono opacity-80 ${isUser ? 'text-pink-200 text-right' : 'text-cyan-400 text-left'}`}>
                        {timeString}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default MessageBubble;
