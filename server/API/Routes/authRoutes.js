import express from 'express';
import {
  signup,
  login,
  getMe,
  logout,
  updateProfile,
  changePassword
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

export default router;