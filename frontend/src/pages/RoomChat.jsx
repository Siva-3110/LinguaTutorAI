import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { socket } from '../services/socket';

const RoomChat = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    // Mock User ID for demonstration
    const userId = `user_${Math.floor(Math.random() * 10000)}`;

    useEffect(() => {
        // Connect to WebSockets
        socket.connect();

        // Join Room
        socket.emit('join_room', roomId);

        // Incoming user events
        socket.on('user_joined', (data) => {
            setMessages((prev) => [...prev, { system: true, text: data.message }]);
        });

        socket.on('user_left', (data) => {
            setMessages((prev) => [...prev, { system: true, text: data.message }]);
        });

        // Incoming messages
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
            senderName: `Student-${userId.slice(-4)}`,
            message: inputMessage,
            timestamp: new Date().toISOString()
        };

        socket.emit('send_message', msgData);

        // Add locally immediately for perceived performance
        setMessages((prev) => [...prev, { ...msgData, isMine: true }]);
        setInputMessage('');
    };

    return (
        <div className="flex flex-col h-[70vh] bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="bg-indigo-600 text-white p-4 flex justify-between items-center z-10 shadow">
                <h2 className="text-xl font-bold">Study Room: {roomId}</h2>
                <button
                    onClick={() => navigate('/collab')}
                    className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded transition"
                >
                    Leave Room
                </button>
            </div>

            {/* Messages Window */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                {messages.map((msg, idx) => {
                    if (msg.system) {
                        return (
                            <div key={idx} className="flex justify-center">
                                <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-1 rounded">
                                    {msg.text}
                                </span>
                            </div>
                        );
                    }

                    return (
                        <div key={idx} className={`flex flex-col ${msg.isMine ? 'items-end' : 'items-start'}`}>
                            <span className="text-xs text-gray-400 mb-1 px-1">{msg.senderName}</span>
                            <div className={`max-w-[70%] rounded-lg p-3 ${msg.isMine
                                    ? 'bg-indigo-600 text-white rounded-tr-none'
                                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-none border dark:border-gray-600'
                                }`}>
                                {msg.message}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input Form */}
            <form onSubmit={sendMessage} className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />
                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg transition"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default RoomChat;
