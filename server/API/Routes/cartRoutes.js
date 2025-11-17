import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../Controllers/cartController.js";
import { protect } from "../Middleware/auth.js";

const router = express.Router();

// All cart routes require authentication
router.use(protect);

// Get user's cart
router.get("/cart", getCart);

// Add item to cart
router.post("/cart", addToCart);

// Update cart item quantity
router.put("/cart/:cartItemId", updateCartItem);

// Remove item from cart
router.delete("/cart/:cartItemId", removeFromCart);

// Clear cart
router.delete("/cart/clear", clearCart);

export default router;

