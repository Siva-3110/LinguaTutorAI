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
            const res = await axios.get('http://localhost:5000/api/collab');
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
            const res = await axios.post('http://localhost:5000/api/collab/create', {
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
        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 w-full relative">
            <motion.div
                className="lg:col-span-1"
            >
                <div className="glass-panel p-6 rounded-2xl border border-pink-500/30 shadow-md sticky top-6">
                    <h2 className="text-xl font-bold mb-6 text-pink-400 flex items-center">
                        <Plus className="mr-2" /> Create Room
                    </h2>
                    <form onSubmit={createRoom} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-slate-300">Room Name</label>
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg blur opacity-0 group-focus-within:opacity-30 transition duration-500"></div>
                                <input
                                    type="text"
                                    placeholder="e.g. Spanish Beginners"
                                    className="relative w-full border border-slate-700 rounded-lg p-3 bg-slate-900/80 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-pink-400 transition-colors shadow-inner"
                                    value={newRoomName}
                                    onChange={(e) => setNewRoomName(e.target.value)}
                                />
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-pink-600 hover:bg-pink-500 text-white px-6 py-3 rounded-xl font-semibold transition shadow-sm border border-pink-500 flex justify-center items-center"
                        >
                            <Zap className="mr-2 w-5 h-5" /> Create Room
                        </motion.button>
                    </form>
                </div>
            </motion.div>

            {/* Rooms Grid */}
            <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-6 pl-2">
                    <h2 className="text-xl font-bold text-slate-100 flex items-center">
                        <SignalHigh className="mr-2 text-cyan-400" /> Active Rooms
                    </h2>
                    <motion.button
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                        onClick={fetchRooms}
                        className="bg-slate-800 p-2 rounded-lg text-cyan-400 hover:text-white hover:bg-cyan-600 transition-colors border border-slate-700"
                    >
                        <RefreshCw size={20} />
                    </motion.button>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center p-12 bg-slate-900/30 rounded-2xl border border-slate-800 border-dashed">
                        <div className="relative flex h-12 w-12 mb-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-12 w-12 bg-cyan-500 shadow-[0_0_20px_rgba(0,245,255,1)]"></span>
                        </div>
                        <p className="text-cyan-400 text-sm animate-pulse font-medium">Loading rooms...</p>
                    </div>
                ) : rooms.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        <AnimatePresence>
                            {rooms.map(room => (
                                <motion.div
                                    variants={itemVariants}
                                    key={room.id}
                                    className="glass-panel p-5 rounded-xl flex flex-col justify-between hover:shadow-lg transition-all bg-slate-900/40 border-l-4 border-l-cyan-500 border border-t-slate-700/50 border-r-slate-700/50 border-b-slate-700/50 group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="mb-4 relative z-10">
                                        <h3 className="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors truncate">{room.name}</h3>
                                        <span className="text-xs text-slate-500 font-mono">ID: {room.id}</span>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => navigate(`/collab/${room.id}`)}
                                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-all border border-cyan-500/50 shadow-sm relative z-10"
                                    >
                                        Join Room
                                    </motion.button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16 bg-slate-900/30 border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center"
                    >
                        <SignalHigh className="w-12 h-12 text-slate-500 mb-4" />
                        <p className="text-slate-300 font-medium text-lg">No active rooms found.</p>
                        <p className="text-sm mt-2 text-slate-400">Create a new room to start practicing.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default RoomList;
