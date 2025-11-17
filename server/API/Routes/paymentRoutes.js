import express from 'express';
import {
  getPayments,
  getPayment
} from '../Controllers/Admin/paymentController.js';
import { protect, authorize } from '../Middleware/auth.js';

const router = express.Router();

// Admin routes only
router.get('/payments', protect, authorize('admin'), getPayments);
router.get('/payments/:id', protect, authorize('admin'), getPayment);

export default router;

