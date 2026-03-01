import { Server } from 'socket.io';

let io;

export const initSocketServer = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: '*', // For production, specify your frontend URL
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on('join_room', (roomId) => {
            socket.join(roomId);
            console.log(`User ${socket.id} joined room ${roomId}`);
            // Notify others in the room
            socket.to(roomId).emit('user_joined', { userId: socket.id, message: 'A new user joined the room' });
        });

        socket.on('send_message', (data) => {
            // data should contain { roomId, message, senderId, senderName }
            console.log(`Message in room ${data.roomId}:`, data.message);
            io.to(data.roomId).emit('receive_message', data);
        });

        socket.on('leave_room', (roomId) => {
            socket.leave(roomId);
            console.log(`User ${socket.id} left room ${roomId}`);
            socket.to(roomId).emit('user_left', { userId: socket.id, message: 'A user left the room' });
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
};
