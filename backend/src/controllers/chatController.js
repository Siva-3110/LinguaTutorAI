import { generateResponse } from '../services/chatService.js';

export const handleChat = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const reply = await generateResponse(message);

        res.json({
            reply
        });
    } catch (error) {
        console.error('Error handling chat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
