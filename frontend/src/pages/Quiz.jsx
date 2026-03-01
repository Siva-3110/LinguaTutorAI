import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Loader2, Sparkles, Target, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const Quiz = () => {
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [loading, setLoading] = useState(false);
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    const mockUserId = '654321fedcba0987654321fe';

    const generateQuiz = async () => {
        if (!topic) return alert('Please input a target vector (topic)');
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/quizzes/generate', {
                topic,
                difficulty,
                numQuestions: 3
            });
            setQuiz(res.data.quiz);
            setAnswers({});
            setResult(null);
        } catch (err) {
            console.error(err);
            alert('Failed to initialize quiz matrix.');
        } finally {
            setLoading(false);
        }
    };

    const submitQuiz = async () => {
        setLoading(true);
        try {
            const userAnswers = Object.keys(answers).map(qText => ({
                questionText: qText,
                answerText: answers[qText]
            }));

            const res = await axios.post('http://localhost:5000/api/quizzes/submit', {
                userId: mockUserId,
                questions: quiz,
                userAnswers
            });
            setResult(res.data);
        } catch (err) {
            console.error(err);
            alert('Data submission failed.');
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const answeredCount = Object.keys(answers).length;
    const progressPercent = quiz ? (answeredCount / quiz.length) * 100 : 0;

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 w-full relative">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8 border-b border-cyan-900/40 pb-4"
            >
                <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(0,245,255,0.4)] flex items-center">
                    <BrainCircuit className="mr-4 w-10 h-10 text-cyan-500" />
                    System Evaluation
                </h1>
                <p className="text-slate-400 font-mono mt-2 uppercase tracking-widest text-sm">Target vector required for override</p>
            </motion.div>

            <AnimatePresence mode="wait">
                {/* 1. Setup Phase */}
                {!quiz && (
                    <motion.div
                        key="setup"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="glass-panel-heavy p-8 rounded-2xl relative overflow-hidden shadow-[0_0_30px_rgba(0,245,255,0.1)] border border-cyan-800/30"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-600"></div>
                        <div className="flex flex-col gap-6 relative z-10">
                            <motion.div variants={itemVariants}>
                                <label className="block text-xs font-bold mb-2 text-cyan-400 uppercase tracking-widest font-mono">Target Vector (Topic)</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Memory Allocation..."
                                    className="w-full border-b-2 border-slate-700 p-3 bg-slate-900/50 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] text-lg"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <label className="block text-xs font-bold mb-2 text-purple-400 uppercase tracking-widest font-mono">Difficulty Override</label>
                                <div className="grid grid-cols-3 gap-4">
                                    {['easy', 'medium', 'hard'].map((lvl) => (
                                        <button
                                            key={lvl}
                                            onClick={() => setDifficulty(lvl)}
                                            className={`py-3 rounded-lg border font-bold uppercase tracking-widest text-sm transition-all duration-300
                                                ${difficulty === lvl
                                                    ? 'bg-purple-600/20 border-purple-400 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                                                    : 'border-slate-700 text-slate-500 hover:border-slate-500'}
                                            `}
                                        >
                                            {lvl}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.button
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={generateQuiz}
                                disabled={loading}
                                className="mt-6 w-full py-4 rounded-xl text-white font-bold tracking-widest uppercase bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,245,255,0.4)] border border-cyan-400/50 flex justify-center items-center"
                            >
                                {loading ? (
                                    <><Loader2 className="w-6 h-6 animate-spin mr-3" /> Initializing Matrix...</>
                                ) : (
                                    <><Target className="w-6 h-6 mr-3 drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" /> Generate Sequence</>
                                )}
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* 2. Evaluation Phase */}
                {quiz && !result && (
                    <motion.div
                        key="eval"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8"
                    >
                        {/* Neon Progress Bar */}
                        <div className="glass-panel p-4 rounded-xl flex items-center justify-between shadow-[0_0_15px_rgba(0,245,255,0.1)]">
                            <div className="text-cyan-400 font-mono font-bold uppercase tracking-widest text-xs">
                                Evaluation Progress
                            </div>
                            <div className="flex-1 mx-4 bg-slate-800 h-2 rounded-full overflow-hidden relative">
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-cyan-400 shadow-[0_0_10px_rgba(0,245,255,1)]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercent}%` }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                ></motion.div>
                            </div>
                            <div className="text-cyan-400 font-mono font-bold">{answeredCount} / {quiz.length}</div>
                        </div>

                        {quiz.map((q, idx) => (
                            <motion.div
                                variants={itemVariants}
                                key={idx}
                                className="glass-panel-heavy p-6 md:p-8 rounded-2xl relative overflow-hidden border border-slate-700/50 hover:border-cyan-500/30 transition-colors"
                            >
                                <div className="absolute top-0 left-0 bg-cyan-900/40 text-cyan-400 rounded-br-xl px-4 py-1 font-mono font-bold border-b border-r border-cyan-800/50">
                                    SEQ_{idx + 1}
                                </div>

                                <h3 className="text-lg md:text-xl font-medium text-slate-200 mt-4 mb-6 leading-relaxed">
                                    {q.questionText}
                                </h3>

                                {q.questionType === 'MCQ' ? (
                                    <div className="flex flex-col gap-3">
                                        {q.options.map((opt, oIdx) => {
                                            const isSelected = answers[q.questionText] === opt;
                                            return (
                                                <motion.label
                                                    key={oIdx}
                                                    whileHover={{ scale: 1.01 }}
                                                    whileTap={{ scale: 0.99 }}
                                                    className={`
                                                        relative flex items-center p-4 rounded-xl cursor-pointer border transition-all duration-300
                                                        ${isSelected
                                                            ? 'bg-cyan-900/20 border-cyan-400 shadow-[0_0_15px_rgba(0,245,255,0.3)]'
                                                            : 'bg-slate-900/40 border-slate-700 hover:border-slate-500'}
                                                    `}
                                                >
                                                    <input
                                                        type="radio"
                                                        name={`q-${idx}`}
                                                        value={opt}
                                                        className="hidden"
                                                        onChange={(e) => setAnswers({ ...answers, [q.questionText]: e.target.value })}
                                                    />
                                                    <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center
                                                        ${isSelected ? 'border-cyan-400 text-cyan-400' : 'border-slate-600'}
                                                    `}>
                                                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_5px_rgba(0,245,255,0.8)]"></div>}
                                                    </div>
                                                    <span className={`text-base flex-1 ${isSelected ? 'text-cyan-100' : 'text-slate-300'}`}>{opt}</span>
                                                </motion.label>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="relative group">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-0 group-focus-within:opacity-30 transition duration-500"></div>
                                        <input
                                            type="text"
                                            placeholder="Awaiting input..."
                                            className="relative w-full border border-slate-700 rounded-lg p-4 bg-slate-950/80 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"
                                            value={answers[q.questionText] || ''}
                                            onChange={(e) => setAnswers({ ...answers, [q.questionText]: e.target.value })}
                                        />
                                    </div>
                                )}
                            </motion.div>
                        ))}

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={submitQuiz}
                            disabled={loading || answeredCount < quiz.length}
                            className={`w-full py-5 rounded-xl text-white font-bold tracking-widest uppercase transition-all duration-300 flex justify-center items-center shadow-lg border
                                ${loading || answeredCount < quiz.length
                                    ? 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-green-600 to-emerald-500 border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:from-green-500 hover:to-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]'
                                }
                            `}
                        >
                            {loading ? (
                                <><Loader2 className="w-6 h-6 animate-spin mr-3" /> Processing Data...</>
                            ) : (
                                <><CheckCircle2 className="w-6 h-6 mr-3" /> Execute Validation</>
                            )}
                        </motion.button>
                    </motion.div>
                )}

                {/* 3. Results Phase */}
                {result && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                        className="glass-panel-heavy rounded-2xl p-8 md:p-12 text-center relative overflow-hidden flex flex-col items-center justify-center border border-cyan-500/30 shadow-[0_0_50px_rgba(0,245,255,0.15)]"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-cyan-500 to-purple-500"></div>
                        <Sparkles className="w-16 h-16 text-yellow-400 mb-6 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] animate-pulse" />

                        <h2 className="text-2xl md:text-3xl font-bold text-slate-200 uppercase tracking-widest mb-2">Metrics Acquired</h2>
                        <p className="text-slate-400 font-mono mb-8 opacity-80">Validation Sequence Complete</p>

                        <div className="relative mb-10 w-48 h-48 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90 pointer-events-none drop-shadow-[0_0_15px_rgba(0,245,255,0.5)]">
                                <circle cx="96" cy="96" r="88" stroke="rgba(15,23,42,0.8)" strokeWidth="12" fill="none" />
                                <motion.circle
                                    cx="96" cy="96" r="88"
                                    stroke="#00F5FF"
                                    strokeWidth="12"
                                    strokeDasharray="552"
                                    initial={{ strokeDashoffset: 552 }}
                                    animate={{ strokeDashoffset: 552 - (552 * result.score) / 100 }}
                                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                    fill="none"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 to-blue-500">
                                    {result.score}
                                </span>
                                <span className="text-cyan-600 font-bold">%</span>
                            </div>
                        </div>

                        {result.plagiarismScore > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className={`w-full max-w-md p-5 rounded-xl border flex items-start gap-4 text-left shadow-lg
                                    ${result.plagiarismScore > 50
                                        ? 'bg-red-950/50 border-red-500/50 text-red-200'
                                        : 'bg-amber-950/50 border-amber-500/50 text-amber-200'}`}
                            >
                                {result.plagiarismScore > 50 ? <AlertTriangle className="w-8 h-8 text-red-500 shrink-0" /> : <ShieldCheck className="w-8 h-8 text-amber-500 shrink-0" />}
                                <div>
                                    <h4 className="font-bold uppercase tracking-wider text-sm mb-1">Pattern Anomaly Detected</h4>
                                    <p className="text-sm opacity-90"><span className="font-bold text-white">{result.plagiarismScore}%</span> sequence similarity with external databases identified in free-text responses.</p>
                                </div>
                            </motion.div>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => { setQuiz(null); setResult(null); setTopic(''); }}
                            className="mt-10 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold tracking-widest uppercase rounded-xl transition-colors border border-slate-600 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                        >
                            Reset Interface
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Quiz;
