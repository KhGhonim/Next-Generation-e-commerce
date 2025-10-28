import mongoose from "mongoose";

const salesTeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: [100, "Name cannot exceed 100 characters"]
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
  phone: {
    type: String,
    trim: true,
    maxlength: [20, "Phone number cannot exceed 20 characters"]
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    trim: true
  },
  salesTarget: {
    type: Number,
    default: 0,
    min: [0, "Sales target cannot be negative"]
  },
  department: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const SalesTeam = mongoose.model("SalesTeam", salesTeamSchema);

export default SalesTeam;

