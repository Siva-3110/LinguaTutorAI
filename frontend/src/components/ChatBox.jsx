import React, { useState, useRef, useEffect } from 'react';
import useChat from '../hooks/useChat';
import MessageBubble from './MessageBubble';
import { Send } from 'lucide-react';

const ChatBox = () => {
    const { messages, isTyping, sendMessage } = useChat();
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
        <div className="flex flex-col flex-grow w-full h-full relative">
            {/* Messages Area */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <MessageBubble key={index} message={msg} />
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <div className="p-4 bg-white border-t border-gray-200">
                <form onSubmit={handleSend} className="max-w-4xl mx-auto flex space-x-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        disabled={isTyping}
                        className="flex-grow px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow disabled:bg-gray-100"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isTyping}
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
