import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
        try {
            const res = await axios.get('http://localhost:5000/api/collab');
            setRooms(res.data.rooms);
        } catch (err) {
            console.warn('Could not load active rooms.', err);
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
            alert('Failed to create room');
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Study Rooms</h1>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-8 border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Create a New Room</h2>
                <form onSubmit={createRoom} className="flex gap-2">
                    <input
                        type="text"
                        placeholder="e.g. Spanish Grammar Basics"
                        className="flex-1 border rounded-lg px-4 py-2 bg-gray-50 focus:outline-indigo-500"
                        value={newRoomName}
                        onChange={(e) => setNewRoomName(e.target.value)}
                    />
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition">
                        Create
                    </button>
                </form>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Active Public Rooms</h2>
                    <button onClick={fetchRooms} className="text-sm text-indigo-600 hover:underline">Refresh</button>
                </div>

                {loading ? (
                    <p className="text-gray-500">Scanning for active rooms...</p>
                ) : rooms.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {rooms.map(room => (
                            <div key={room.id} className="border dark:border-gray-700 p-4 rounded-lg flex justify-between items-center hover:shadow-md transition bg-gray-50 dark:bg-gray-900/50">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">{room.name}</h3>
                                    <span className="text-xs text-gray-500">ID: {room.id}</span>
                                </div>
                                <button
                                    onClick={() => navigate(`/collab/${room.id}`)}
                                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition"
                                >
                                    Join
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                        <p>No active public rooms right now.</p>
                        <p className="text-sm mt-2">Create one above to start a group study session!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoomList;
