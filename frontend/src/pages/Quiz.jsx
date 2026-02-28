import React, { useState } from 'react';
import axios from 'axios';

const Quiz = () => {
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [loading, setLoading] = useState(false);
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    const mockUserId = '654321fedcba0987654321fe'; // Mock user

    const generateQuiz = async () => {
        if (!topic) return alert('Please enter a topic');
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
            alert('Failed to generate quiz. Is the backend running with Google AI configured?');
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
            alert('Failed to submit quiz');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">AI Quiz Generator</h1>

            {!quiz && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-8 flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Topic</label>
                        <input
                            type="text"
                            placeholder="e.g. Spanish Greetings"
                            className="w-full border rounded p-2 text-gray-800 bg-gray-50 focus:outline-indigo-500"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Difficulty</label>
                        <select
                            className="w-full border rounded p-2 text-gray-800 bg-gray-50 focus:outline-indigo-500"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <button
                        onClick={generateQuiz}
                        disabled={loading}
                        className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition disabled:opacity-50"
                    >
                        {loading ? 'Generating...' : 'Generate Quiz'}
                    </button>
                </div>
            )}

            {quiz && !result && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-8 space-y-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Answer the Questions</h2>
                    {quiz.map((q, idx) => (
                        <div key={idx} className="border-b pb-4 last:border-0 last:pb-0">
                            <p className="font-medium text-lg text-gray-800 dark:text-gray-200 mb-2">{idx + 1}. {q.questionText}</p>

                            {q.questionType === 'MCQ' ? (
                                <div className="flex flex-col gap-2">
                                    {q.options.map((opt, oIdx) => (
                                        <label key={oIdx} className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300">
                                            <input
                                                type="radio"
                                                name={`q-${idx}`}
                                                value={opt}
                                                onChange={(e) => setAnswers({ ...answers, [q.questionText]: e.target.value })}
                                            />
                                            {opt}
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <input
                                    type="text"
                                    placeholder="Type your answer here..."
                                    className="w-full border rounded p-2 text-gray-800 bg-gray-50 focus:outline-indigo-500 mt-2"
                                    value={answers[q.questionText] || ''}
                                    onChange={(e) => setAnswers({ ...answers, [q.questionText]: e.target.value })}
                                />
                            )}
                        </div>
                    ))}
                    <button
                        onClick={submitQuiz}
                        disabled={loading}
                        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
                    >
                        {loading ? 'Submitting...' : 'Submit Quiz'}
                    </button>
                </div>
            )}

            {result && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center space-y-4">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Quiz Completed!</h2>
                    <div className="text-6xl font-black text-indigo-600 mb-4">{result.score}%</div>

                    {result.plagiarismScore > 0 && (
                        <div className={`p-4 rounded-lg border ${result.plagiarismScore > 50 ? 'bg-red-50 border-red-200 text-red-800' : 'bg-yellow-50 border-yellow-200 text-yellow-800'}`}>
                            <p className="font-semibold flex items-center justify-center gap-2">
                                ⚠️ Plagiarism Warning
                            </p>
                            <p>We detected a <strong>{result.plagiarismScore}%</strong> similarity score with existing sources for your short answers.</p>
                        </div>
                    )}

                    <button
                        onClick={() => { setQuiz(null); setResult(null); setTopic(''); }}
                        className="mt-6 px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
                    >
                        Take Another Quiz
                    </button>
                </div>
            )}

        </div>
    );
};

export default Quiz;
