import axios from 'axios';

export const generateAIResponse = async (userMessage, languageCode, subject, history) => {
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

    const messages = [
        { role: 'system', content: systemPrompt },
        ...history.map(msg => ({
            role: msg.role === 'ai' ? 'assistant' : 'user',
            content: msg.content
        })),
        { role: 'user', content: userMessage }
    ];

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: messages,
                response_format: { type: "json_object" },
                temperature: 0.7
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                timeout: 15000 // 15s timeout
            }
        );

        const content = response.data.choices[0].message.content;
        return JSON.parse(content);
    } catch (error) {
        if (error.response) {
            console.error("OpenAI API Error:", error.response.data);
            throw new Error(`API Error: ${error.response.data.error?.message || 'Invalid API request'}`);
        } else if (error.code === 'ECONNABORTED') {
            throw new Error('Request timeout. The AI took too long to respond.');
        }
        throw new Error('Failed to generate response. Check your API Key or Network.');
    }
};
