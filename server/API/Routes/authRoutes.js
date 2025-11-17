import express from 'express';
import {
  signup,
  login,
  getMe,
  logout,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyResetToken,
  sendVerificationEmailController,
  verifyEmail,
} from '../Controllers/authController.js';
import {
  updateBillingAddress,
  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod
} from '../Controllers/PaymentsUserInfo/paymentsUserInfoController.js';
import { protect } from '../Middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/auth/signup', signup);
router.post('/auth/login', login);
router.post('/auth/forgot-password', forgotPassword);
router.put('/auth/reset-password', resetPassword);
router.get('/auth/verify-reset-token', verifyResetToken);
router.get('/auth/verify-email', verifyEmail);

// Protected routes
router.get('/auth/me', protect, getMe);
router.post('/auth/logout', protect, logout);
router.put('/auth/profile', protect, updateProfile);
router.put('/auth/password', protect, changePassword);
router.post('/auth/send-verification-email', protect, sendVerificationEmailController);
router.put('/auth/billing', protect, updateBillingAddress);
router.post('/auth/payment-methods', protect, addPaymentMethod);
router.put('/auth/payment-methods/:methodId', protect, updatePaymentMethod);
router.delete('/auth/payment-methods/:methodId', protect, deletePaymentMethod);

export default router;