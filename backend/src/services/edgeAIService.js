export const generateFallbackResponse = (message) => {
    const normalizedText = message.toLowerCase();

    // Very basic rule-based parsing logic for offline/fallback mode
    if (normalizedText.includes('hello') || normalizedText.includes('hi')) {
        return 'Hello! I am currently running in Edge Mode (Offline Mode). How can I assist you with basic queries?';
    }

    if (normalizedText.includes('translate')) {
        return 'I cannot perform complex translations while offline, but you can review your cached vocabulary in the app.';
    }

    if (normalizedText.includes('quiz') || normalizedText.includes('test')) {
        return 'AI Quiz generation requires a network connection. Please reconnect to generate new quizzes.';
    }

    if (normalizedText.includes('help')) {
        return 'Edge Mode Commands: "hello", "translate", "quiz". Real AI responses will resume when your connection is restored.';
    }

    return "I'm currently in Edge AI Mode due to network unavailability. My capabilities are limited to basic matching responses for now.";
};
