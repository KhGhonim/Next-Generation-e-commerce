import express from "express";
import {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
} from "../Controllers/couponController.js";
import { protect, authorize } from "../Middleware/auth.js";

const router = express.Router();

router
  .route("/coupons")
  .get(protect, authorize("admin"), getCoupons)
  .post(protect, authorize("admin"), createCoupon);

router
  .route("/coupons/:id")
  .put(protect, authorize("admin"), updateCoupon)
  .delete(protect, authorize("admin"), deleteCoupon);

router.post("/coupons/validate", protect, validateCoupon);

export default router;


