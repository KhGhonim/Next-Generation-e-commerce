import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: [true, "Order ID is required"],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [0, "Amount cannot be negative"]
  },
  paymentMethod: {
    type: String,
    required: [true, "Payment method is required"],
    trim: true,
    enum: ["credit_card", "debit_card", "paypal", "bank_transfer", "other"]
  },
  status: {
    type: String,
    required: [true, "Status is required"],
    enum: ["pending", "completed", "failed", "cancelled", "refunded"],
    default: "pending"
  },
  transactionId: {
    type: String,
    trim: true
  },
  customerEmail: {
    type: String,
    trim: true,
    lowercase: true
  }
}, {
  timestamps: true
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;

