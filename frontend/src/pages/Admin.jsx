import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Users, FileText, Database, Activity, ShieldAlert } from 'lucide-react';

const Admin = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const res = await axios.get('http://localhost:5001/api/admin/dashboard');
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

    if (loading) return (
        <div className="flex h-full items-center justify-center bg-transparent">
            <div className="flex items-center space-x-3 text-cyan-400 font-semibold animate-pulse shadow-sm">
                <ShieldAlert className="w-6 h-6 animate-bounce" />
                <span>Loading Admin Dashboard...</span>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto py-10 px-6 min-h-[calc(100vh-64px)] relative overflow-hidden bg-transparent">

            {/* Ambient Background Elements */}
            <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>
            <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>

            <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl md:text-5xl font-bold mb-10 text-slate-100 flex items-center"
            >
                <Database className="w-10 h-10 mr-4 text-blue-500" />
                Admin Dashboard
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* Total Students Metric Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-panel-heavy rounded-2xl p-8 relative overflow-hidden border border-cyan-500/30 group shadow-[0_0_30px_rgba(0,245,255,0.05)] hover:shadow-[0_0_30px_rgba(0,245,255,0.15)] transition-shadow"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Users className="w-24 h-24 text-blue-400" />
                    </div>
                    <div className="relative z-10 text-blue-500 mb-4">
                        <Activity className="w-6 h-6 animate-pulse" />
                    </div>
                    <h2 className="text-lg font-semibold text-slate-300 mb-2">Total Users</h2>
                    <p className="text-5xl font-bold text-white shadow-sm">{data?.users?.length || 0}</p>
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-blue-500 shadow-sm"></div>
                </motion.div>

                {/* Total Quizzes Metric Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel-heavy rounded-2xl p-8 relative overflow-hidden border border-pink-500/30 group shadow-[0_0_30px_rgba(255,0,255,0.05)] hover:shadow-[0_0_30px_rgba(255,0,255,0.15)] transition-shadow"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <FileText className="w-24 h-24 text-pink-400" />
                    </div>
                    <div className="relative z-10 text-pink-500 mb-4">
                        <Activity className="w-6 h-6 animate-pulse" />
                    </div>
                    <h2 className="text-lg font-semibold text-slate-300 mb-2">Total Quizzes Taken</h2>
                    <p className="text-5xl font-bold text-white shadow-sm">{data?.quizzes?.length || 0}</p>
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-pink-500 shadow-sm"></div>
                </motion.div>
            </div>

            {/* Student Roster Table Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-panel rounded-2xl border border-slate-700/50 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)]"
            >
                <div className="p-6 border-b border-slate-700/50 bg-slate-900/40 relative">
                    <div className="absolute top-0 left-0 w-1/4 h-1 bg-gradient-to-r from-blue-500 to-transparent"></div>
                    <h2 className="text-xl font-semibold text-slate-100 flex items-center">
                        <span className="w-3 h-3 rounded-full bg-blue-500 mr-3 shadow-sm"></span>
                        User Directory
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-900/80">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 tracking-wider border-b border-slate-700">User ID</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 tracking-wider border-b border-slate-700">Email</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 tracking-wider border-b border-slate-700">Difficulty Level</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-400 tracking-wider border-b border-slate-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 bg-slate-900/20">
                            {data?.users?.map((u) => (
                                <tr key={u._id} className="hover:bg-blue-900/10 transition-colors group">
                                    <td className="px-6 py-5 text-blue-400 font-medium group-hover:text-blue-300 transition-colors">@{u.username}</td>
                                    <td className="px-6 py-5 text-slate-300 text-sm">{u.email}</td>
                                    <td className="px-6 py-5 uppercase tracking-wider">
                                        <span className={`px-3 py-1.5 rounded-md text-xs font-black border flex inline-flex w-max items-center shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] ${u.currentDifficulty === 'hard'
                                            ? 'bg-red-900/30 border-red-500/50 text-red-400 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]'
                                            : u.currentDifficulty === 'medium'
                                                ? 'bg-yellow-900/30 border-yellow-500/50 text-yellow-400 drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]'
                                                : 'bg-green-900/30 border-green-500/50 text-green-400 drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]'
                                            }`}>
                                            {u.currentDifficulty || 'easy'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <button className="text-xs font-semibold bg-blue-900/40 hover:bg-blue-600 text-blue-300 hover:text-white px-4 py-2 rounded-lg border border-blue-500/50 transition-all shadow-sm">
                                            Manage
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {!data?.users?.length && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-slate-500 text-sm border-t border-slate-800">
                                        <Database className="w-8 h-8 opacity-20 mx-auto mb-3" />
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default Admin;
