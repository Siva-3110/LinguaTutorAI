import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

export const generateAIResponse = async (userMessage, languageCode, subject, history) => {
    // Initialize dynamically so it catches .env updates
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        throw new Error('Groq API Key not configured. Cannot generate response.');
    }

    const groqClient = new Groq({ apiKey: apiKey });

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
        const response = await groqClient.chat.completions.create({
            model: "llama-3.1-8b-instant", // Fast and capable open source model
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Chat History:\n${historyText}\n\nStudent: ${userMessage}\nTutor (Respond ONLY with raw JSON format based on the schema above):` }
            ],
            temperature: 0.7,
            max_tokens: 1024,
            response_format: { type: "json_object" } // Groq supports strict JSON mode
        });

        const content = response.choices[0]?.message?.content || '';

        try {
            // Strip out markdown code blocks if the model wrapped it (e.g. ```json ... ```)
            const cleanJson = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            return JSON.parse(cleanJson);
        } catch (e) {
            console.warn("Failed to parse Gemini JSON, falling back to raw text:", content);
            return { explanation: content }; // Graceful fallback
        }
    } catch (error) {
        console.error("Groq API Error:", error.message);
        throw new Error('Failed to generate response using Groq Llama 3.');
    }
};
