import express from 'express';
import {
  getSalesTeam,
  getSalesTeamMember,
  createSalesTeamMember,
  updateSalesTeamMember,
  deleteSalesTeamMember
} from '../Controllers/Admin/salesTeamController.js';
import { protect, authorize } from '../Middleware/auth.js';

const router = express.Router();

// Admin routes only
router.get('/sales-team', protect, authorize('admin'), getSalesTeam);
router.get('/sales-team/:id', protect, authorize('admin'), getSalesTeamMember);
router.post('/sales-team', protect, authorize('admin'), createSalesTeamMember);
router.put('/sales-team/:id', protect, authorize('admin'), updateSalesTeamMember);
router.delete('/sales-team/:id', protect, authorize('admin'), deleteSalesTeamMember);

export default router;

