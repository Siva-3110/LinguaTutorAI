import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, SignalHigh, RefreshCw, Zap } from 'lucide-react';
import axios from 'axios';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [newRoomName, setNewRoomName] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5001/api/collab');
            setRooms(res.data.rooms);
        } catch (err) {
            console.warn('Could not load active networks.', err);
        } finally {
            setLoading(false);
        }
    };

    const createRoom = async (e) => {
        e.preventDefault();
        if (!newRoomName.trim()) return;

        try {
            const res = await axios.post('http://localhost:5001/api/collab/create', {
                roomName: newRoomName,
                creatorId: 'mock_userId_123'
            });

            const createdRoom = res.data.room;
            navigate(`/collab/${createdRoom.id}`);
        } catch (err) {
            alert('Failed to establish network connection');
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { type: 'spring' } }
    };

    return (
        <div className="flex-grow w-full relative min-h-[calc(100vh-64px)] p-6 md:p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto w-full">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-100 mb-2 drop-shadow-sm">Study Rooms</h1>
                    <p className="text-slate-400 text-sm md:text-base max-w-2xl">
                        Join an active room or create your own to practice languages with other students in real-time. Experience collaborative learning powered by AI.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Create Room */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-1"
                    >
                        <div className="glass-panel p-6 rounded-2xl border border-slate-700/60 shadow-xl sticky top-6 bg-slate-900/40">
                            <div className="flex items-center mb-6">
                                <div className="bg-cyan-500/10 p-2.5 rounded-xl border border-cyan-500/20 mr-3">
                                    <Plus className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-100">Create Room</h2>
                            </div>

                            <form onSubmit={createRoom} className="flex flex-col gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-slate-300">Room Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Spanish Beginners"
                                        className="w-full border border-slate-700/80 rounded-xl p-3.5 bg-slate-950/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-medium text-sm shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]"
                                        value={newRoomName}
                                        onChange={(e) => setNewRoomName(e.target.value)}
                                    />
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3.5 rounded-xl font-semibold transition-all shadow-[0_0_15px_rgba(0,245,255,0.3)] border border-cyan-400/30 flex justify-center items-center"
                                >
                                    <Zap className="mr-2 w-4 h-4" />
                                    Create Room
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Right Column: Active Rooms */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-2 flex flex-col h-full"
                    >
                        <div className="flex justify-between items-center mb-6 border-b border-slate-800/80 pb-4">
                            <h2 className="text-xl font-bold text-slate-100 flex items-center">
                                <SignalHigh className="mr-3 w-5 h-5 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                                Active Rooms
                            </h2>
                            <motion.button
                                whileHover={{ rotate: 180 }}
                                transition={{ duration: 0.4, type: "spring" }}
                                onClick={fetchRooms}
                                className="bg-slate-800/60 p-2.5 rounded-xl text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-colors border border-slate-700 shadow-sm"
                            >
                                <RefreshCw size={18} />
                            </motion.button>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center p-12 bg-slate-900/20 rounded-2xl border border-slate-800 border-dashed h-64">
                                <div className="relative flex h-12 w-12 mb-5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60"></span>
                                    <span className="relative inline-flex rounded-full h-12 w-12 bg-cyan-500 shadow-[0_0_20px_rgba(0,245,255,0.5)]"></span>
                                </div>
                                <p className="text-cyan-400 text-sm animate-pulse font-medium tracking-wide">Fetching rooms...</p>
                            </div>
                        ) : rooms.length > 0 ? (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 md:grid-cols-2 gap-5"
                            >
                                <AnimatePresence>
                                    {rooms.map(room => (
                                        <motion.div
                                            variants={itemVariants}
                                            key={room.id}
                                            className="glass-panel p-5 rounded-2xl flex flex-col justify-between transition-all bg-slate-900/50 border border-slate-700/60 hover:border-cyan-500/50 shadow-sm hover:shadow-[0_0_20px_rgba(0,245,255,0.1)] group relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                            <div className="mb-5 relative z-10">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-bold text-lg text-slate-100 group-hover:text-cyan-300 transition-colors truncate pr-2">{room.name}</h3>
                                                    <div className="flex items-center space-x-1.5 mt-1.5 shrink-0 bg-green-900/30 px-2 py-1 rounded-md border border-green-500/20">
                                                        <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse"></div>
                                                        <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider hidden sm:inline">Live</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-xs text-slate-400 font-mono mt-1">
                                                    <span className="text-slate-500 mr-1.5">ID:</span> {room.id}
                                                </div>
                                            </div>

                                            <div className="mt-auto relative z-10">
                                                <div className="flex items-center text-sm text-slate-300 mb-4 pb-4 border-b border-slate-700/50">
                                                    <Users size={16} className="mr-2 text-slate-500" />
                                                    <span className="font-medium text-slate-400">Collaborative Session</span>
                                                </div>

                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => navigate(`/collab/${room.id}`)}
                                                    className="w-full bg-slate-800 hover:bg-cyan-600 text-slate-300 hover:text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-all border border-slate-700 hover:border-cyan-500 shadow-sm flex justify-center items-center"
                                                >
                                                    Join Room
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-20 px-6 bg-slate-900/30 border border-dashed border-slate-700/60 rounded-3xl flex flex-col items-center shadow-inner"
                            >
                                <div className="bg-slate-800/80 p-4 rounded-full border border-slate-700 mb-5 relative shadow-sm">
                                    <SignalHigh className="w-8 h-8 text-slate-400 relative z-10" />
                                </div>
                                <p className="text-slate-200 font-bold text-lg mb-2">No active study rooms</p>
                                <p className="text-sm text-slate-400 max-w-sm">Create a new room on the left to start practicing with other students.</p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default RoomList;
