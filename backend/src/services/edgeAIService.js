export const generateFallbackResponse = (message) => {
    // Return a structured object matching the Gemini AI JSON format
    return {
        explanation: `[Offline Fallback Mode] I received your message: "${message}". Unfortunately, your Google Gemini API Key has run out of its free quota limit for today!`,
        steps: [
            "Go to Google AI Studio (aistudio.google.com).",
            "Generate a brand new Free API Key.",
            "Open your LinguaTutorAI folder, open the `backend/.env` file.",
            "Replace the old `GOOGLE_API_KEY` with your new one.",
            "Restart your backend server terminal."
        ],
        examples: [
            "If your key was: AIzaSyBAqxjLD3S...",
            "Change it to: AIzaSyNEW_KEY_HERE..."
        ],
        summary: "This is a simulated fallback response because your API key hit a 429 Quota Exceeded error. Please replace your API key to restore my AI capabilities."
    };
};
