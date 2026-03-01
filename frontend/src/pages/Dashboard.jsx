import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flame, Target, Zap, BrainCircuit, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [difficulty, setDifficulty] = useState('easy');
    const [loading, setLoading] = useState(true);

    const mockUserId = '654321fedcba0987654321fe';

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/api/recommendations/${mockUserId}`);
                setRecommendations(res.data.data.recommendedTopics);
                setDifficulty(res.data.data.currentDifficulty);
            } catch (err) {
                console.warn('Could not fetch recommendations, using defaults');
                setRecommendations(['Advanced React Patterns', 'Node.js Microservices', 'Cybersecurity Basics']);
                setDifficulty('hard');
            } finally {
                setLoading(false);
            }
        };
        fetchRecommendations();
    }, [mockUserId]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
    };

    if (loading) return (
        <div className="flex-1 flex items-center justify-center p-8">
            <div className="relative flex h-16 w-16">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-16 w-16 bg-cyan-500 shadow-[0_0_20px_rgba(0,245,255,1)]"></span>
            </div>
        </div>
    );

    return (
        <motion.div
            className="max-w-6xl mx-auto py-8 px-4 sm:px-6 w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Hero Section */}
            <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl p-1 mb-10 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse opacity-50"></div>
                <div className="relative bg-slate-950/90 backdrop-blur-xl rounded-xl p-8 md:p-10 border border-white/10 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400 drop-shadow-sm"
                        >
                            Welcome back, Siva <Zap className="inline w-10 h-10 text-yellow-400 drop-shadow-sm -mt-2" />
                        </motion.h1>
                        <p className="text-slate-300 text-lg font-medium max-w-xl">
                            Ready to learn? Your personalized study plan is waiting.
                        </p>
                    </div>

                    <div className="flex gap-6 pt-4 md:pt-0">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-orange-500/20 border border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.4)] mb-2">
                                <Flame className="w-8 h-8 text-orange-400" />
                            </div>
                            <span className="text-2xl font-bold font-mono text-white">14 <span className="text-sm text-slate-400">Days</span></span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-500/20 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.4)] mb-2">
                                <Sparkles className="w-8 h-8 text-purple-400" />
                            </div>
                            <span className="text-2xl font-bold font-mono text-white">4,250 <span className="text-sm text-slate-400">XP</span></span>
                        </div>
                    </div>
                </div>

                {/* Progress Bar locked to bottom of hero */}
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-800 z-20">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '75%' }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_15px_rgba(0,245,255,0.8)] relative"
                    >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)]"></div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Recommended Topics */}
                <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-end border-b border-slate-800 pb-2">
                        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                            <Target className="text-pink-500 w-6 h-6" /> Recommended Topics
                        </h2>
                        <span className={`px-3 py-1 rounded-md text-sm font-semibold capitalize
                            ${difficulty === 'easy' ? 'bg-cyan-900/30 text-cyan-400 border border-cyan-500/50' :
                                difficulty === 'medium' ? 'bg-purple-900/30 text-purple-400 border border-purple-500/50' :
                                    'bg-pink-900/30 text-pink-400 border border-pink-500/50'
                            }`}>
                            {difficulty} Level
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {recommendations.map((topic, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="glass-panel p-5 rounded-xl border-l-4 border-l-cyan-500 hover:neon-border-blue transition-all duration-300 cursor-pointer group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <h3 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors relative z-10">{topic}</h3>
                                <div className="mt-3 w-full bg-slate-800 h-1 rounded-full overflow-hidden relative z-10">
                                    <div className="bg-cyan-500 h-full w-1/3 shadow-[0_0_5px_rgba(0,245,255,0.8)]"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div variants={itemVariants} className="space-y-6">
                    <div className="border-b border-slate-800 pb-2">
                        <h2 className="text-2xl font-bold text-slate-100">Quick Actions</h2>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Link to="/tutor">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full glass-panel-heavy p-4 rounded-xl flex items-center gap-4 group neon-border-purple border-purple-500/50 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400 group-hover:bg-purple-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(168,85,247,0.8)] transition-all">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <div className="text-left relative z-10 flex flex-col justify-center">
                                    <h4 className="font-bold text-lg text-slate-100">Chat with AI Tutor</h4>
                                    <p className="text-sm text-slate-400">Instant language help</p>
                                </div>
                            </motion.button>
                        </Link>

                        <Link to="/quiz">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full glass-panel-heavy p-4 rounded-xl flex items-center gap-4 group neon-border-blue border-cyan-500/50 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="p-3 bg-cyan-500/20 rounded-lg text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(0,245,255,0.8)] transition-all">
                                    <BrainCircuit className="w-6 h-6" />
                                </div>
                                <div className="text-left relative z-10 flex flex-col justify-center">
                                    <h4 className="font-bold text-lg text-slate-100">Take a Quiz</h4>
                                    <p className="text-sm text-slate-400">Test your knowledge</p>
                                </div>
                            </motion.button>
                        </Link>

                        <Link to="/collab">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full glass-panel-heavy p-4 rounded-xl flex items-center gap-4 group neon-border-pink border-pink-500/50 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="p-3 bg-pink-500/20 rounded-lg text-pink-400 group-hover:bg-pink-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(255,0,255,0.8)] transition-all">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div className="text-left relative z-10 flex flex-col justify-center">
                                    <h4 className="font-bold text-lg text-slate-100">Join Study Room</h4>
                                    <p className="text-sm text-slate-400">Practice with others</p>
                                </div>
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
