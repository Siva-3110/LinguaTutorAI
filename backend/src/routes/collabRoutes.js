import express from 'express';

const router = express.Router();

let activeRooms = []; // In-memory store for active rooms, usually would track in DB or Redis in huge scale

// Get all active public rooms
router.get('/', (req, res) => {
    res.json({ success: true, rooms: activeRooms });
});

// Create a new room
router.post('/create', (req, res) => {
    const { roomName, creatorId } = req.body;
    if (!roomName) return res.status(400).json({ success: false, error: 'Room name required' });

    const newRoom = {
        id: `room_${Date.now()}`,
        name: roomName,
        creatorId,
        createdAt: new Date(),
        participants: 1
    };

    activeRooms.push(newRoom);
    res.json({ success: true, room: newRoom });
});

export default router;
