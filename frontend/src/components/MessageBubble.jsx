import React from 'react';

const MessageBubble = ({ message }) => {
    const isUser = message.role === 'user';

    // Format timestamp if it exists
    const timeString = message.timestamp
        ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : '';

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl relative ${isUser
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
                    }`}
            >
                <div className="text-base break-words">{message.text}</div>
                {timeString && (
                    <div className={`text-xs mt-1 text-right ${isUser ? 'text-blue-200' : 'text-gray-400'}`}>
                        {timeString}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageBubble;
