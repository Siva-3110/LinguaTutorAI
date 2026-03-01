import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

export const generateAIResponse = async (userMessage, languageCode, subject, history) => {
    // Initialize dynamically so it catches .env updates without requiring a hard restart of the whole Node process tree
    const ai = process.env.GOOGLE_API_KEY ? new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY }) : null;

    if (!ai) {
        throw new Error('Google API Key not configured. Cannot generate response.');
    }

    const langMap = {
        en: 'English',
        ta: 'Tamil',
        hi: 'Hindi'
    };
    const language = langMap[languageCode] || 'English';

    const systemPrompt = `You are a multilingual AI tutor.
Explain the concept clearly in ${language}.
Subject context: ${subject}. Context: Answer keeping the subject in mind.

Provide:
1. Simple explanation
2. Step-by-step solution
3. Example
4. Short summary
Keep it student-friendly.

Respond STRICTLY in JSON format with the following keys:
{
  "explanation": "Simple explanation here",
  "steps": ["step 1", "step 2"],
  "examples": ["example 1"],
  "summary": "short summary"
}`;

    // Flatten history for Gemini
    const historyText = history.length > 0
        ? history.map(msg => `${msg.role === 'ai' ? 'Tutor' : 'Student'}: ${msg.content || ''}`).join('\n')
        : 'None';

    // Explicitly demand JSON and structure the prompt meticulously
    const fullPrompt = `${systemPrompt}

Chat History:
${historyText}

Student: ${userMessage}
Tutor (Respond ONLY with raw JSON format based on the schema above):`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: fullPrompt,
        });

        const content = response.text || '';

        try {
            // Strip out markdown code blocks if the model wrapped it (e.g. ```json ... ```)
            const cleanJson = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            return JSON.parse(cleanJson);
        } catch (e) {
            console.warn("Failed to parse Gemini JSON, falling back to raw text:", content);
            return { explanation: content }; // Graceful fallback
        }
    } catch (error) {
        console.error("Gemini API Error:", error.message);
        throw new Error('Failed to generate response using Google GenAI.');
    }
};
