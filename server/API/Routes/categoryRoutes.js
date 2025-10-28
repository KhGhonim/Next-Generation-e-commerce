import express from 'express';
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} from '../Controllers/categoryController.js';
import { protect, authorize } from '../Middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/categories', getCategories);
router.get('/categories/:id', getCategory);

// Admin routes
router.post('/categories', protect, authorize('admin'), createCategory);
router.put('/categories/:id', protect, authorize('admin'), updateCategory);
router.delete('/categories/:id', protect, authorize('admin'), deleteCategory);

export default router;

