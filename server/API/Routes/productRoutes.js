import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from '../Controllers/productController.js';
import { protect, authorize } from '../Middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/products', getProducts);
router.get('/products/:id', getProduct);

// Admin routes
router.post('/products', protect, authorize('admin'), createProduct);
router.put('/products/:id', protect, authorize('admin'), updateProduct);
router.delete('/products/:id', protect, authorize('admin'), deleteProduct);

export default router;

