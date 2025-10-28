import express from 'express';
import { getAnalytics } from '../Controllers/analyticsController.js';
import { protect, authorize } from '../Middleware/auth.js';

const router = express.Router();

// Admin routes only
router.get('/analytics', protect, authorize('admin'), getAnalytics);

export default router;

