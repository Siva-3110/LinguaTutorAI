import React, { useState, useRef, useEffect } from 'react';
import useChat from '../hooks/useChat';
import MessageBubble from './MessageBubble';
import { Send, Globe } from 'lucide-react';

const ChatBox = () => {
    const { messages, isTyping, sendMessage, language, setLanguage } = useChat();
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    // Auto scroll to latest message
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
        <div className="flex flex-col flex-grow w-full h-full relative bg-gray-50">
            {/* Header / Tools */}
            <div className="px-4 py-3 bg-white border-b border-gray-200 flex justify-between items-center shadow-sm z-10 shrink-0">
                <div className="flex items-center text-gray-700 font-medium">
                    <Globe size={18} className="mr-2 text-blue-600" />
                    <span className="hidden sm:inline">Language:</span>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 outline-none transition-colors cursor-pointer"
                    >
                        <option value="en">English</option>
                        <option value="ta">Tamil (தமிழ்)</option>
                        <option value="hi">Hindi (हिंदी)</option>
                    </select>
                </div>
                <div className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 flex items-center shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                    AI Tutor Active
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-grow p-4 overflow-y-auto space-y-6">
                {messages.map((msg, index) => (
                    <MessageBubble key={index} message={msg} />
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white text-gray-800 px-5 py-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 flex items-center space-x-2">
                            <span className="text-sm text-gray-500 font-medium mr-1">AI is thinking</span>
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <div className="p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] shrink-0">
                <form onSubmit={handleSend} className="max-w-4xl mx-auto flex space-x-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask your tutor anything..."
                        disabled={isTyping}
                        className="flex-grow px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 bg-gray-50 hover:bg-white text-gray-800"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isTyping}
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 shadow-md"
                    >
                        <span className="hidden sm:inline mr-2">Send</span>
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatBox;
