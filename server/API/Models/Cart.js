import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: [true, "Product ID is required"],
  },
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [1, "Quantity must be at least 1"],
  },
  image: {
    type: String,
    required: [true, "Product image is required"],
  },
  size: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: null,
  },
  cartItemId: {
    type: String,
    required: [true, "Cart item ID is required"],
  },
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      unique: true,
    },
    items: [cartItemSchema],
    totalItems: {
      type: Number,
      default: 0,
      min: [0, "Total items cannot be negative"],
    },
    uniqueItems: {
      type: Number,
      default: 0,
      min: [0, "Unique items cannot be negative"],
    },
    totalPrice: {
      type: Number,
      default: 0,
      min: [0, "Total price cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

// Helper function to generate cart item ID
cartSchema.statics.generateCartItemId = function (productId, size, color) {
  return `${productId}-${size || "no-size"}-${color || "no-color"}`;
};

// Recalculate totals before saving
cartSchema.methods.recalculateTotals = function () {
  // Use bracket notation to avoid TypeScript errors
  const items = this['items'] || [];
  
  this['totalItems'] = items.reduce((total, item) => total + (item.quantity || 0), 0);
  this['uniqueItems'] = items.length;
  this['totalPrice'] = items.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0
  );
};

// Pre-save hook to recalculate totals
cartSchema.pre("save", function (next) {
  this['recalculateTotals']();
  next();
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;

