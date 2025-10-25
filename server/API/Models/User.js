import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    minlength: [2, "First name must be at least 2 characters long"],
    maxlength: [50, "First name cannot exceed 50 characters"]
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    minlength: [2, "Last name must be at least 2 characters long"],
    maxlength: [50, "Last name cannot exceed 50 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please provide a valid email address"
    ]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
    select: false // Don't include password in queries by default
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
    select: false
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // Billing Address fields
  phone: {
    type: String,
    trim: true,
    maxlength: [20, "Phone number cannot exceed 20 characters"]
  },
  address: {
    type: String,
    trim: true,
    maxlength: [200, "Address cannot exceed 200 characters"]
  },
  city: {
    type: String,
    trim: true,
    maxlength: [50, "City cannot exceed 50 characters"]
  },
  zipCode: {
    type: String,
    trim: true,
    maxlength: [20, "ZIP code cannot exceed 20 characters"]
  },
  country: {
    type: String,
    trim: true,
    maxlength: [50, "Country cannot exceed 50 characters"]
  },
  // Payment Methods
  paymentMethods: [{
    cardNumber: {
      type: String,
      required: true,
      trim: true
    },
    expiryDate: {
      type: String,
      required: true,
      trim: true
    },
    cardHolderName: {
      type: String,
      required: true,
      trim: true
    },
    isDefault: {
      type: Boolean,
      default: false
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});


const User = mongoose.model("User", userSchema);

export default User;
