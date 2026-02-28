export const checkPlagiarism = (answerText, sourceTexts) => {
    // A simple similarity check (e.g., Jaccard Similarity)
    // In a robust system, this might call an external plagiarism API or use advanced NLP embeddings.

    if (!answerText || !sourceTexts || sourceTexts.length === 0) {
        return 0; // 0% plagiarism
    }

    const tokenize = (text) => text.toLowerCase().match(/\b\w+\b/g) || [];

    const answerTokens = new Set(tokenize(answerText));

    if (answerTokens.size === 0) return 0;

    let highestScore = 0;

    for (const source of sourceTexts) {
        const sourceTokens = new Set(tokenize(source));
        const intersection = new Set([...answerTokens].filter(x => sourceTokens.has(x)));

        // Simple overlap ratio over the answer length
        const score = (intersection.size / answerTokens.size) * 100;

        if (score > highestScore) {
            highestScore = score;
        }
    }

    return Math.round(highestScore); // Returns a % integer
};
