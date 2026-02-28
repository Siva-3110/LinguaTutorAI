import { useState } from 'react';
import { sendMessageToAPI } from '../services/api';

const useChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'ai',
            text: 'Hello! I am LinguaTutor AI. What would you like to learn today?',
            structured: null,
            timestamp: new Date().toISOString(),
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [language, setLanguage] = useState('en');

    const sendMessage = async (text) => {
        if (!text.trim()) return;

        const userMessage = {
            role: 'user',
            text,
            timestamp: new Date().toISOString(),
        };

        // Very basic subject detection
        const lowerText = text.toLowerCase();
        let subject = 'general';
        if (lowerText.includes('code') || lowerText.includes('program') || lowerText.includes('function') || lowerText.includes('react')) {
            subject = 'coding';
        } else if (lowerText.includes('solve') || lowerText.includes('math') || lowerText.includes('calculate') || lowerText.includes('number')) {
            subject = 'math';
        } else if (lowerText.includes('science') || lowerText.includes('physics') || lowerText.includes('chemistry')) {
            subject = 'science';
        }

        // Context memory (last 5 messages)
        const history = messages.slice(-5).map(m => ({
            role: m.role,
            content: m.text || (m.structured ? m.structured.explanation : "")
        }));

        setMessages((prev) => [...prev, userMessage]);
        setIsTyping(true);

        try {
            const response = await sendMessageToAPI(text, language, subject, history);

            const aiMessage = {
                role: 'ai',
                text: null,
                structured: response.reply,
                timestamp: new Date().toISOString(),
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage = {
                role: 'ai',
                text: null,
                error: error.message || "Sorry, I'm having trouble connecting right now. Please try again later.",
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
        language,
        setLanguage
    };
};

export default useChat;
