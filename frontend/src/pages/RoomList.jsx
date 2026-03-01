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
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8 border-b border-pink-900/40 pb-4 flex justify-between items-end"
            >
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,0,255,0.4)] flex items-center">
                        <Users className="mr-4 w-10 h-10 text-pink-500" />
                        Co-Op Networks
                    </h1>
                    <p className="text-slate-400 font-mono mt-2 uppercase tracking-widest text-sm">Synchronize with active peer instances</p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Create Room Panel */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-1"
                >
                    <div className="glass-panel-heavy p-6 rounded-2xl border border-pink-500/30 shadow-[0_0_20px_rgba(255,0,255,0.1)] sticky top-6">
                        <h2 className="text-xl font-bold mb-6 text-pink-400 uppercase tracking-widest flex items-center">
                            <Plus className="mr-2" /> Initialize Array
                        </h2>
                        <form onSubmit={createRoom} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-xs font-bold mb-2 text-slate-400 uppercase tracking-widest font-mono">Network Designation</label>
                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg blur opacity-0 group-focus-within:opacity-30 transition duration-500"></div>
                                    <input
                                        type="text"
                                        placeholder="e.g. Protocol Alpha"
                                        className="relative w-full border border-slate-700 rounded-lg p-3 bg-slate-950/80 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-pink-400 transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"
                                        value={newRoomName}
                                        onChange={(e) => setNewRoomName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest transition shadow-[0_0_15px_rgba(255,0,255,0.4)] border border-pink-400/50 flex justify-center items-center"
                            >
                                <Zap className="mr-2 w-5 h-5" /> Host Network
                            </motion.button>
                        </form>
                    </div>
                </motion.div>

                {/* Rooms Grid */}
                <div className="lg:col-span-2">
                    <div className="flex justify-between items-center mb-6 pl-2">
                        <h2 className="text-xl font-bold text-slate-200 uppercase tracking-widest flex items-center">
                            <SignalHigh className="mr-2 text-cyan-400" /> Detected Arrays
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
                            <p className="text-cyan-400 font-mono uppercase tracking-widest text-sm animate-pulse">Scanning frequencies...</p>
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
                                            className="w-full bg-cyan-900/40 hover:bg-cyan-500 text-cyan-400 hover:text-white font-bold uppercase tracking-widest text-sm px-4 py-2 rounded-lg transition-all border border-cyan-500/50 group-hover:shadow-[0_0_15px_rgba(0,245,255,0.4)] relative z-10"
                                        >
                                            Connect
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
                            <SignalHigh className="w-12 h-12 text-slate-600 mb-4" />
                            <p className="text-slate-400 font-mono uppercase tracking-widest">No active arrays detected.</p>
                            <p className="text-sm mt-2 font-bold text-pink-500">Initialize a new network to begin communication.</p>
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="absolute top-1/2 left-0 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        </div>
    );
};

export default RoomList;
