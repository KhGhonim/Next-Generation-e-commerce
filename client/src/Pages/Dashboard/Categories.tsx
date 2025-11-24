import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash, FaTags } from "react-icons/fa";
import { Category } from "./types";
import CategoryForm from "./Components/CategoryForm";

const API_URL = import.meta.env.VITE_APP_API_URL;

function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/categories`, {
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        setCategories(result.data);
      } else {
        toast.error(result.message || "Failed to fetch categories");
      }
    } catch (error) {
      console.error("Fetch categories error:", error);
      toast.error("An error occurred while fetching categories");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCategory = () => {
    setEditingCategory(null);
    setShowForm(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/categories/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Category deleted successfully");
        fetchCategories();
      } else {
        toast.error(result.message || "Failed to delete category");
      }
    } catch (error) {
      console.error("Delete category error:", error);
      toast.error("An error occurred while deleting category");
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingCategory(null);
    fetchCategories();
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-700 bg-clip-text text-transparent mb-2">
            Categories
          </h1>
          <p className="text-sm text-zinc-600">Manage product categories</p>
        </div>
        <motion.button
          onClick={handleCreateCategory}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-black to-zinc-800 text-white rounded-xl cursor-pointer outline-none shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Add new category"
        >
          <FaPlus className="text-lg" />
          <span className="font-semibold">Add Category</span>
        </motion.button>
      </motion.div>

        {showForm && (
          <CategoryForm
            category={editingCategory}
            onSubmit={handleFormSubmit}
            onCancel={handleCancelForm}
          />
        )}

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-zinc-200 border-t-black"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-black/20"></div>
          </div>
        </div>
      ) : categories.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-white to-zinc-50 rounded-2xl border border-zinc-200"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-full flex items-center justify-center mb-6">
            <FaTags className="text-4xl text-zinc-400" />
          </div>
          <h3 className="text-2xl font-bold text-zinc-900 mb-2">No categories found</h3>
          <p className="text-zinc-600 mb-6">Get started by adding your first category</p>
          <motion.button
            onClick={handleCreateCategory}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-black to-zinc-800 text-white rounded-xl cursor-pointer outline-none shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus />
            <span className="font-semibold">Add Category</span>
          </motion.button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl shadow-sm p-6 border border-zinc-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                       loading="lazy"
                      className="w-16 h-16 object-cover rounded-xl shadow-md"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <FaTags className="text-2xl text-white" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-zinc-900 text-lg">{category.name}</h3>
                    <p className="text-sm text-zinc-500 font-mono">{category.slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={() => handleEditCategory(category)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl cursor-pointer outline-none transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Edit ${category.name}`}
                  >
                    <FaEdit />
                  </motion.button>
                  <motion.button
                    onClick={() => category._id && handleDeleteCategory(category._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-xl cursor-pointer outline-none transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Delete ${category.name}`}
                  >
                    <FaTrash />
                  </motion.button>
                </div>
              </div>
              {category.description && (
                <p className="text-sm text-zinc-600 mb-4 line-clamp-2">{category.description}</p>
              )}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                    category.isActive
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-red-100 text-red-700 border border-red-200"
                  }`}
                >
                  {category.isActive ? "✓ Active" : "✗ Inactive"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Categories;

