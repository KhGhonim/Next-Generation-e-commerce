import express from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser
} from '../Controllers/userController.js';
import { protect, authorize } from '../Middleware/auth.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

router.route('/users')
  .get(getUsers);

router.route('/users/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

export default router;

