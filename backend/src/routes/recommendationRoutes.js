import express from 'express';
import { getRecommendations } from '../services/recommendationService.js';

const router = express.Router();

router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const recommendations = await getRecommendations(userId);
        res.json({ success: true, data: recommendations });
    } catch (error) {
        if (error.message === 'User not found') {
            res.status(404).json({ success: false, error: error.message });
        } else {
            res.status(500).json({ success: false, error: 'Failed to get recommendations' });
        }
    }
});

export default router;
