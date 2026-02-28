import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const genai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export const generateQuiz = async (topic, difficulty, numQuestions = 5) => {
    try {
        const prompt = `Generate a ${numQuestions}-question quiz about "${topic}" at a "${difficulty}" difficulty level. 
    Include a mix of Multiple Choice (MCQ) and Short Answer questions.
    Return ONLY a raw JSON array of objects with this format completely unformatted, with no markdown, just the raw json:
    [
      {
        "questionText": "...",
        "questionType": "MCQ",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": "A"
      },
      {
        "questionText": "...",
        "questionType": "Short Answer",
        "options": [],
        "correctAnswer": "expected short answer keyword"
      }
    ]
    `;

        const response = await genai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        let rawText = response.text;

        // Clean up potential markdown formatting from AI output
        if (rawText.startsWith('\`\`\`json')) {
            rawText = rawText.substring(7, rawText.length - 3).trim();
        }
        if (rawText.startsWith('\`\`\`')) {
            rawText = rawText.substring(3, rawText.length - 3).trim();
        }

        const questions = JSON.parse(rawText);
        return questions;
    } catch (error) {
        console.error('Error generating quiz from AI:', error);
        // fallback or rethrow
        throw error;
    }
};
