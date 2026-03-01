import { generateAIResponse } from './src/services/aiService.js';
import dotenv from 'dotenv';
dotenv.config();

console.log('--- TESTING GEMINI CONFIGURATION ---');
console.log('Key Snippet:', process.env.GOOGLE_API_KEY ? process.env.GOOGLE_API_KEY.slice(0, 8) + '...' : 'MISSING');

generateAIResponse("What is React?", "en", "Coding", [])
    .then(res => {
        console.log('\n✅ SUCCESS! Received JSON:');
        console.log(JSON.stringify(res, null, 2));
    })
    .catch(err => {
        console.error('\n❌ FAILED! Error Details:');
        console.error(err);
    });
