import { useState } from 'react';
import { sendMessageToAPI } from '../services/api';

const useChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'ai',
            text: 'Hello! I am LinguaTutor AI. What would you like to learn today?',
            timestamp: new Date().toISOString(),
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = async (text) => {
        if (!text.trim()) return;

        const userMessage = {
            role: 'user',
            text,
            timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsTyping(true);

        try {
            const response = await sendMessageToAPI(text);

            const aiMessage = {
                role: 'ai',
                text: response.reply,
                timestamp: new Date().toISOString(),
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage = {
                role: 'ai',
                text: "Sorry, I'm having trouble connecting right now. Please try again later.",
                timestamp: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    return {
        messages,
        isTyping,
        sendMessage,
    };
};

export default useChat;
