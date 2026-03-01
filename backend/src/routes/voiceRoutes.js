import express from 'express';
import multer from 'multer';
import { transcribeAudio } from '../controllers/voiceController.js';

const router = express.Router();

// Using multer in memory since Whisper API accepts streams/buffers
const upload = multer({ storage: multer.memoryStorage() });

// @route   POST /api/voice/transcribe
// @desc    Transcribe an audio blob uploaded from the frontend
// @access  Public (for now)
router.post('/transcribe', upload.single('audio'), transcribeAudio);

export default router;
