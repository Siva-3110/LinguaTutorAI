import User from '../models/User.js';

export const getRecommendations = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Analyze user history to recommend next topics
        // This is a basic mock logic. In a real scenario, this would involve ML or strict curriculum graphs.
        const completedTopics = user.history.map(item => item.topic.toLowerCase());

        const allTopics = ['Greetings', 'Numbers 1-10', 'Basic Grammar', 'Fruits', 'Colors', 'Common Verbs'];

        const uncompletedTopics = allTopics.filter(topic => !completedTopics.includes(topic.toLowerCase()));

        // Adjust difficulty based on recent scores
        let difficulty = user.currentDifficulty || 'easy';
        const recentHistory = user.history.slice(-3);

        if (recentHistory.length >= 3) {
            const avgScore = recentHistory.reduce((acc, curr) => acc + curr.score, 0) / recentHistory.length;
            if (avgScore > 85) {
                difficulty = 'hard';
            } else if (avgScore > 60) {
                difficulty = 'medium';
            } else {
                difficulty = 'easy';
            }
        }

        // Save adjustment if changed
        if (difficulty !== user.currentDifficulty) {
            user.currentDifficulty = difficulty;
            await user.save();
        }

        return {
            recommendedTopics: uncompletedTopics.slice(0, 3), // suggest up to 3 topics
            currentDifficulty: difficulty
        };

    } catch (error) {
        console.error('Error fetching recommendations:', error);
        throw error;
    }
};
