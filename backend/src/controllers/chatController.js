import { generateAIResponse } from '../services/aiService.js';

export const handleChat = async (req, res) => {
    try {
        const { message, language, subject, history } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const aiResponse = await generateAIResponse(message, language || 'en', subject || 'general', history || []);

        res.json({
            reply: aiResponse
        });
    } catch (error) {
        console.error('Error handling chat:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};
