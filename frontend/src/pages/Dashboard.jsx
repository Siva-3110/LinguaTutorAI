import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [difficulty, setDifficulty] = useState('easy');
    const [loading, setLoading] = useState(true);

    // Hardcoding user ID for demonstration since there's no auth yet
    const mockUserId = '654321fedcba0987654321fe'; // You'd normally get this from context or auth

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                // Will fail if user isn't in DB, but handles mock graceful degradation
                const res = await axios.get(`http://localhost:5000/api/recommendations/${mockUserId}`);
                setRecommendations(res.data.data.recommendedTopics);
                setDifficulty(res.data.data.currentDifficulty);
            } catch (err) {
                console.warn('Could not fetch recommendations, using defaults');
                setRecommendations(['Numbers 1-10', 'Basic Grammar', 'Fruits']);
                setDifficulty('easy');
            } finally {
                setLoading(false);
            }
        };
        fetchRecommendations();
    }, [mockUserId]);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Dashboard...</div>;

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Student Dashboard</h1>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Recommended Topics</h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold capitalize ${difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                            difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                        }`}>
                        Difficulty: {difficulty}
                    </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Based on your recent performance, we suggest you focus on the following topics next:</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {recommendations.map((topic, idx) => (
                        <div key={idx} className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg flex flex-col justify-center items-center text-center hover:shadow-md transition cursor-pointer">
                            <span className="text-lg font-medium text-blue-800 dark:text-blue-200">{topic}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Quick Actions</h2>
                <div className="flex gap-4">
                    <a href="/quiz" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition">Take a Quiz</a>
                    <a href="/tutor" className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition">Practice with AI Tutor</a>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
