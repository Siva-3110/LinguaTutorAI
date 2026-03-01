import OpenAI, { toFile } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Create the OpenAI instance.
// It will automatically use process.env.OPENAI_API_KEY if present.
const openai = new OpenAI();
const hasApiKey = !!process.env.OPENAI_API_KEY;

export const transcribeAudio = async (req, res) => {
    try {
        if (!hasApiKey) {
            return res.status(403).json({
                success: false,
                message: "No OPENAI_API_KEY found. Tell frontend to fallback to browser STT."
            });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, error: 'No audio file provided' });
        }

        console.log(`[Voice] Received audio file: size ${req.file.size} bytes`);

        // Convert the multer memory buffer into a File object acceptable by OpenAI
        const file = await toFile(req.file.buffer, 'audio.webm', { type: req.file.mimetype });

        // Call the Whisper API
        const transcription = await openai.audio.transcriptions.create({
            file: file,
            model: 'whisper-1',
            // Using prompt to gently guide the model towards the expected languages
            prompt: "The audio may be in English, Tamil, or Hindi.",
        });

        console.log("[Voice] Transcription success:", transcription.text);

        res.status(200).json({
            success: true,
            text: transcription.text
        });

    } catch (error) {
        console.error("Voice Transcription Error:", error);
        res.status(500).json({
            success: false,
            error: error.message || "Failed to process audio"
        });
    }
};
