import express from 'express';
import { testRoute } from '../controllers/testController.js';

const router = express.Router();

// Define routes
router.get('/test', testRoute);

export default router;
