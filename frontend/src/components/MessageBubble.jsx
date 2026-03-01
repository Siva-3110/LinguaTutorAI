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
                        ? 'bg-blue-600 text-white rounded-br-none shadow-sm border border-blue-500/50'
                        : message.error
                            ? 'bg-red-900/30 text-red-200 border-l-4 border-l-red-500 rounded-bl-none shadow-sm'
                            : 'glass-panel rounded-bl-none border border-slate-700/50 shadow-sm'
                    }`}
            >
                {/* Avatar Icon */}
                <div className={`absolute ${isUser ? '-right-3 -bottom-3' : '-left-3 -bottom-3'} w-8 h-8 rounded-full flex items-center justify-center shadow-sm z-10 ${isUser ? 'bg-blue-500 border border-blue-400' : 'bg-slate-700 border border-slate-600'}`}>
                    {isUser ? <User size={16} className="text-white" /> : <Bot size={16} className="text-blue-400" />}
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
                                <h3 className="font-semibold text-slate-300 mb-1 text-sm">Explanation</h3>
                                <p className="text-slate-200 leading-relaxed">{message.structured.explanation}</p>
                            </div>
                        )}

                        {message.structured.steps && Array.isArray(message.structured.steps) && message.structured.steps.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-slate-300 mb-2 text-sm">Steps</h3>
                                <ul className="list-decimal pl-5 space-y-2 text-slate-300">
                                    {message.structured.steps.map((step, idx) => (
                                        <li key={idx} className="leading-relaxed marker:text-blue-400 marker:font-semibold">{step}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {message.structured.examples && Array.isArray(message.structured.examples) && message.structured.examples.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-slate-300 mb-2 text-sm">Examples</h3>
                                <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-700/50 shadow-inner">
                                    <ul className="list-disc pl-5 space-y-2 text-slate-300 text-sm">
                                        {message.structured.examples.map((ex, idx) => (
                                            <li key={idx} className="leading-relaxed marker:text-blue-400">{ex}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {message.structured.summary && (
                            <div>
                                <h3 className="font-semibold text-slate-300 mb-1 text-sm">Summary</h3>
                                <p className="text-slate-300 italic">{message.structured.summary}</p>
                            </div>
                        )}
                    </div>
                )}

                {timeString && (
                    <div className={`text-[10px] mt-2 opacity-70 ${isUser ? 'text-blue-200 text-right' : 'text-slate-400 text-left'}`}>
                        {timeString}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default MessageBubble;
