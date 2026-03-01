import http from 'http';
import app from './app.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { initSocketServer } from './socket/socketServer.js';

dotenv.config();

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/linguatutor';

const server = http.createServer(app);

// Initialize Socket.io
initSocketServer(server);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // NOTE: Use `server.listen` instead of `app.listen` to allow Socket.io to bind
    server.listen(PORT, () => {
      console.log(`Server & WebSocket are running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
