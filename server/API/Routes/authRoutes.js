import express from 'express';
import {
  signup,
  login,
  getMe,
  logout,
  updateProfile,
  changePassword,
  updateBillingAddress,
  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod
} from '../Controllers/authController.js';
import { protect } from '../Middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/auth/signup', signup);
router.post('/auth/login', login);

// Protected routes
router.get('/auth/me', protect, getMe);
router.post('/auth/logout', protect, logout);
router.put('/auth/profile', protect, updateProfile);
router.put('/auth/password', protect, changePassword);
router.put('/auth/billing', protect, updateBillingAddress);
router.post('/auth/payment-methods', protect, addPaymentMethod);
router.put('/auth/payment-methods/:methodId', protect, updatePaymentMethod);
router.delete('/auth/payment-methods/:methodId', protect, deletePaymentMethod);

export default router;