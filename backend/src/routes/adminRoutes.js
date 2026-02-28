import express from 'express';
import Admin from '../models/Admin.js';
import User from '../models/User.js';
import Quiz from '../models/Quiz.js';

const router = express.Router();

// Simple mock auth for Admin login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // In a real app we would use JWT or sessions here. 
        // This is simple tokenless logic for demonstration.

        // Auto-create admin if it doesn't exist for easy testing
        let admin = await Admin.findOne({ username });
        if (!admin) {
            admin = new Admin({ username, password, role: 'teacher' });
            await admin.save();
        } else {
            const isMatch = await admin.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({ success: false, error: 'Invalid credentials' });
            }
        }

        res.json({ success: true, message: 'Admin authenticated successfully', username: admin.username });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Login failure' });
    }
});

// Admin dashboard overview
router.get('/dashboard', async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Get users without pass
        const quizzes = await Quiz.find({});

        res.json({
            success: true,
            data: {
                users,
                quizzes
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, error: 'Dashboard load failure' });
    }
});

// View a specific user's progress
router.get('/users/:id/progress', async (req, res) => {
    try {
        const user = await User.findById(req.params.id, '-password');
        const quizzes = await Quiz.find({ userId: req.params.id });

        res.json({ success: true, data: { user, quizzes } });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to load user progress' });
    }
});


export default router;
