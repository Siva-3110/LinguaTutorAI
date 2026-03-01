// Controller to manage chat interactions with AI
import { generateAIResponse } from '../services/aiService.js';
import { generateFallbackResponse } from '../services/edgeAIService.js';
import { appCache } from '../utils/cache.js';

export const handleChat = async (req, res) => {
    try {
        const { message, language, subject, history } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Check Cache first
        const cacheKey = `chat_${message}_${language || 'en'}_${subject || 'general'}`;
        const cachedResponse = appCache.get(cacheKey);

        if (cachedResponse) {
            console.log("Serving chat response from cache");
            return res.json({ reply: cachedResponse, cached: true });
        }

        const aiResponse = await generateAIResponse(message, language || 'en', subject || 'general', history || []);

        // Save to cache
        appCache.set(cacheKey, aiResponse);

        res.json({
            reply: aiResponse
        });
    } catch (error) {
        console.error('------- PRIMARY AI FAILURE DETECTED -------');
        console.error('Error Type:', error.name);
        console.error('Error Message:', error.message);
        if (error.stack) console.error('Stack Trace:', error.stack.split('\n').slice(0, 3).join('\n'));
        console.error('------------------------------------------');

        // Edge AI Fallback
        const edgeResponse = generateFallbackResponse(req.body.message);
        return res.json({ reply: edgeResponse, edgeMode: true });
    }
};
