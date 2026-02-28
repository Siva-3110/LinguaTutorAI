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
                className={`max-w-[85%] px-5 py-4 rounded-2xl relative ${isUser
                        ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                        : message.error
                            ? 'bg-red-50 text-red-800 shadow-sm border border-red-200 rounded-bl-none'
                            : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
                    }`}
            >
                {/* Error State */}
                {message.error && (
                    <div className="text-base font-medium flex items-center">
                        <span className="mr-2">⚠️</span> {message.error}
                    </div>
                )}

                {/* Regular Text State */}
                {message.text && !message.error && (
                    <div className="text-base break-words">{message.text}</div>
                )}

                {/* Structured AI Response State */}
                {message.structured && (
                    <div className="space-y-4">
                        {message.structured.explanation && (
                            <div>
                                <h3 className="font-semibold text-blue-700 mb-1 text-sm uppercase tracking-wide">Explanation</h3>
                                <p className="text-gray-700 leading-relaxed">{message.structured.explanation}</p>
                            </div>
                        )}

                        {message.structured.steps && Array.isArray(message.structured.steps) && message.structured.steps.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-blue-700 mb-1 text-sm uppercase tracking-wide">Steps</h3>
                                <ul className="list-decimal pl-5 space-y-1 text-gray-700">
                                    {message.structured.steps.map((step, idx) => (
                                        <li key={idx} className="leading-relaxed">{step}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {message.structured.examples && Array.isArray(message.structured.examples) && message.structured.examples.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-blue-700 mb-1 text-sm uppercase tracking-wide">Examples</h3>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                        {message.structured.examples.map((ex, idx) => (
                                            <li key={idx} className="leading-relaxed">{ex}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {message.structured.summary && (
                            <div>
                                <h3 className="font-semibold text-blue-700 mb-1 text-sm uppercase tracking-wide">Summary</h3>
                                <p className="text-gray-700 italic font-medium">{message.structured.summary}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Timestamp */}
                {timeString && (
                    <div className={`text-xs mt-3 ${isUser ? 'text-right text-blue-200' : 'text-left text-gray-400'}`}>
                        {timeString}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageBubble;
