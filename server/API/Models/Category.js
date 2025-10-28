import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    trim: true,
    unique: true,
    maxlength: [100, "Category name cannot exceed 100 characters"]
  },
  description: {
    type: String,
    trim: true
  },
  slug: {
    type: String,
    required: [true, "Category slug is required"],
    trim: true,
    unique: true,
    lowercase: true
  },
  image: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Category = mongoose.model("Category", categorySchema);

export default Category;

