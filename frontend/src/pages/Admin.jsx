import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/admin/dashboard');
                setData(res.data.data);
            } catch (err) {
                console.warn('Could not connect to Admin DB, loading mock data');
                setData({
                    users: [
                        { _id: '1', username: 'student_john', email: 'john@example.com', currentDifficulty: 'medium' },
                        { _id: '2', username: 'student_jane', email: 'jane@example.com', currentDifficulty: 'hard' }
                    ],
                    quizzes: [
                        { _id: 'q1', score: 85, createdAt: new Date().toISOString() },
                        { _id: 'q2', score: 40, createdAt: new Date().toISOString() }
                    ]
                });
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, []);

    if (loading) return <div className="p-8 text-center">Loading Teacher Dashboard...</div>;

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">Teacher & Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border-t-4 border-blue-500">
                    <h2 className="text-lg font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Students</h2>
                    <p className="text-4xl font-black text-gray-800 dark:text-gray-100">{data?.users?.length || 0}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border-t-4 border-green-500">
                    <h2 className="text-lg font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Quizzes Taken</h2>
                    <p className="text-4xl font-black text-gray-800 dark:text-gray-100">{data?.quizzes?.length || 0}</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Student Roster</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Username</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Current Difficulty</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {data?.users?.map((u) => (
                                <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{u.username}</td>
                                    <td className="px-6 py-4 text-gray-500">{u.email}</td>
                                    <td className="px-6 py-4 capitalize">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${u.currentDifficulty === 'hard' ? 'bg-red-100 text-red-800' : u.currentDifficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                            {u.currentDifficulty || 'easy'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">View Progress</button>
                                    </td>
                                </tr>
                            ))}
                            {!data?.users?.length && (
                                <tr><td colSpan="4" className="px-6 py-4 text-center text-gray-500">No users found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Admin;
