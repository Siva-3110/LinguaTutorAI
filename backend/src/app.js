import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import routes from './routes/index.js';
import chatRoutes from './routes/chatRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import collabRoutes from './routes/collabRoutes.js';
import voiceRoutes from './routes/voiceRoutes.js';

const app = express();

// Apply Rate Limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  message: 'Too many requests, please try again later.',
});

// Middleware
app.use(cors());
app.use(compression()); // Compress all responses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);

// Routes
app.use('/api', routes);
app.use('/api/chat', chatRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/collab', collabRoutes);
app.use('/api/voice', voiceRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('LinguaTutor AI API is running...');
});

// Error handling middleware (basic)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
