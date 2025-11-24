import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import { Category } from "../types";
import ImageUploader from "./ImageUploader/ImageUploader";

interface CategoryFormProps {
  category: Category | null;
  onSubmit: () => void;
  onCancel: () => void;
}

const API_URL = import.meta.env.VITE_APP_API_URL;

const defaultCategory: Omit<Category, "_id"> = {
  name: "",
  description: "",
  slug: "",
  image: "",
  isActive: true,
};

function CategoryForm({ category, onSubmit, onCancel }: CategoryFormProps) {
  const [formData, setFormData] = useState<Omit<Category, "_id">>(defaultCategory);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData(category);
    } else {
      setFormData(defaultCategory);
    }
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    // Generate slug from name: lowercase, replace spaces with hyphens, remove special chars
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^a-z0-9-]/g, "") // Remove special characters except hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .replace(/(^-|-$)/g, ""); // Remove leading/trailing hyphens
    setFormData((prev) => ({ ...prev, name, slug }));
  };

  const handleImageChange = (urls: string[]) => {
    setFormData((prev) => ({ ...prev, image: urls[0] || "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please upload an image for the category");
      return;
    }

    setIsSubmitting(true);

    try {
      const url = category?._id
        ? `${API_URL}/api/categories/${category._id}`
        : `${API_URL}/api/categories`;

      const method = category?._id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(category ? "Category updated successfully" : "Category created successfully");
        onSubmit();
      } else {
        toast.error(result.message || "Failed to save category");
      }
    } catch (error) {
      console.error("Submit category error:", error);
      toast.error("An error occurred while saving category");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto border border-zinc-200"
        >
          <div className="sticky top-0 bg-gradient-to-r from-zinc-50 to-white border-b border-zinc-200 px-6 py-5 flex justify-between items-center backdrop-blur-sm z-10">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-700 bg-clip-text text-transparent">
                {category ? "Edit Category" : "Add Category"}
              </h2>
              <p className="text-sm text-zinc-600 mt-1">
                {category ? "Update category information" : "Create a new category"}
              </p>
            </div>
            <motion.button
              onClick={onCancel}
              className="p-2 hover:bg-zinc-100 rounded-xl cursor-pointer outline-none transition-colors"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close form"
            >
              <FaTimes className="text-zinc-600 text-lg" />
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-gradient-to-br from-white to-zinc-50/30">
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleNameChange}
                  required
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-zinc-50 transition-all"
                  placeholder="Auto-generated from category name"
                />
                <p className="mt-1 text-xs text-zinc-500">
                  Automatically generated from category name (spaces become hyphens)
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
                />
              </div>

              <ImageUploader
                label="Category Image *"
                folder="categories"
                accept="image/*"
                values={formData.image ? [formData.image] : []}
                onChange={handleImageChange}
                emptyMessage="Upload an image to represent the category"
              />

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="w-4 h-4 text-black border-zinc-300 rounded focus:ring-black cursor-pointer"
                  />
                  <span className="text-sm font-medium text-zinc-700">Active</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-zinc-200 bg-white/50 -mx-6 px-6 pb-6">
              <motion.button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border-2 border-zinc-300 text-zinc-700 rounded-xl cursor-pointer outline-none hover:bg-zinc-50 hover:border-zinc-400 transition-all font-semibold"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Cancel"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-black to-zinc-800 text-white rounded-xl cursor-pointer outline-none shadow-lg hover:shadow-xl transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                aria-label={category ? "Update category" : "Create category"}
              >
                {isSubmitting ? "Saving..." : category ? "Update Category" : "Create Category"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default CategoryForm;

