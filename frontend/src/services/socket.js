import { io } from 'socket.io-client';

// Usually pulled from env. In dev it's localhost:5001
const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const socket = io(SOCKET_URL, {
    autoConnect: false, // We will connect manually when entering a room
});
