import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import { Product, Category } from "../types";
import ProductPhotosGrid from "./ProductPhotosGrid";
import { Link } from "react-router-dom";

interface ProductFormProps {
  product: Product | null;
  onSubmit: () => void;
  onCancel: () => void;
}

const API_URL = import.meta.env.VITE_APP_API_URL;
const PRODUCT_PHOTOS_STORAGE_KEY = "vexo_product_photos";

const defaultProduct: Omit<Product, "_id"> = {
  name: "",
  description: "",
  price: 0,
  originalPrice: 0,
  category: "",
  brand: "",
  images: [],
  sizes: [],
  colors: [],
  rating: 0,
  reviews: 0,
  inStock: true,
  stockQuantity: 0,
  featured: false,
  tags: [],
};

function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<Omit<Product, "_id">>(defaultProduct);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagsInput, setTagsInput] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [availablePhotos, setAvailablePhotos] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const loadAvailablePhotos = () => {
      if (typeof window === "undefined") return;
      try {
        const stored = localStorage.getItem(PRODUCT_PHOTOS_STORAGE_KEY);
        setAvailablePhotos(stored ? JSON.parse(stored) : []);
      } catch (error) {
        console.error("Failed to load product photos library:", error);
        setAvailablePhotos([]);
      }
    };

    loadAvailablePhotos();
    const updateListener = () => loadAvailablePhotos();
    window.addEventListener("productPhotosUpdated", updateListener);
    return () => window.removeEventListener("productPhotosUpdated", updateListener);
  }, []);

  // Predefined options
  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL", "2XL", "3XL", "8", "9", "10", "11", "12", "13", "14", "15", "One Size"];
  const colorOptions = [
    "Black", "White", "Red", "Blue", "Green", "Gray", "Navy", "Brown", 
    "Silver", "Gold", "Pink", "Rose Gold", "Yellow", "Orange", "Purple", 
    "Beige", "Khaki", "Maroon", "Teal", "Coral"
  ];

  useEffect(() => {
    if (product) {
      setFormData(product);
      setTagsInput(product.tags.join(", "));
    } else {
      setFormData(defaultProduct);
      setTagsInput("");
      setSelectedCategoryId("");
    }
  }, [product]);

  const fetchCategories = async () => {
    setIsLoadingCategories(true);
    try {
      const response = await fetch(`${API_URL}/api/categories`, {
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        setCategories(result.data);
      }
    } catch (error) {
      console.error("Fetch categories error:", error);
      toast.error("Failed to load categories");
    } finally {
      setIsLoadingCategories(false);
    }
  };

  // Update category ID when categories are loaded and product exists
  useEffect(() => {
    if (product && categories.length > 0 && !selectedCategoryId) {
      // Set category ID based on name
      if (product.category) {
        const category = categories.find(cat => cat.name === product.category);
        if (category) {
          setSelectedCategoryId(category._id || "");
        }
      }
    }
  }, [categories, product, selectedCategoryId]);

  // Get all active categories
  const mainCategories = categories.filter(cat => cat.isActive);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    const selectedCategory = categories.find(cat => cat._id === categoryId);
    if (selectedCategory) {
      setFormData(prev => ({ ...prev, category: selectedCategory.name }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSizeToggle = (size: string) => {
    setFormData((prev) => {
      const currentSizes = prev.sizes || [];
      const newSizes = currentSizes.includes(size)
        ? currentSizes.filter((s) => s !== size)
        : [...currentSizes, size];
      return { ...prev, sizes: newSizes };
    });
  };

  const handleColorToggle = (color: string) => {
    setFormData((prev) => {
      const currentColors = prev.colors || [];
      const newColors = currentColors.includes(color)
        ? currentColors.filter((c) => c !== color)
        : [...currentColors, color];
      return { ...prev, colors: newColors };
    });
  };

  const handleTagsChange = (value: string) => {
    setTagsInput(value);
    setFormData((prev) => ({
      ...prev,
      tags: value.split(",").map((t) => t.trim()).filter(Boolean),
    }));
  };

  const handlePhotoToggle = (photo: string) => {
    setFormData((prev) => {
      const images = prev.images.includes(photo)
        ? prev.images.filter((img) => img !== photo)
        : [...prev.images, photo];
      return { ...prev, images };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that at least one image is uploaded
    if (!formData.images || formData.images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }
    
    setIsSubmitting(true);

    try {
      const url = product?._id
        ? `${API_URL}/api/products/${product._id}`
        : `${API_URL}/api/products`;

      const method = product?._id ? "PUT" : "POST";

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
        toast.success(product ? "Product updated successfully" : "Product created successfully");
        onSubmit();
      } else {
        toast.error(result.message || "Failed to save product");
      }
    } catch (error) {
      console.error("Submit product error:", error);
      toast.error("An error occurred while saving product");
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
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full m-4 max-h-[90vh] overflow-y-auto border border-zinc-200"
        >
          <div className="sticky top-0 bg-gradient-to-r from-zinc-50 to-white border-b border-zinc-200 px-6 py-5 flex justify-between items-center backdrop-blur-sm z-10">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-700 bg-clip-text text-transparent">
                {product ? "Edit Product" : "Add New Product"}
              </h2>
              <p className="text-sm text-zinc-600 mt-1">
                {product ? "Update product information" : "Fill in the details below"}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
                  placeholder="Enter product name"
                />
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-2">
                  Brand *
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-2">
                  Category *
                </label>
                {isLoadingCategories ? (
                  <div className="w-full px-4 py-2 border border-zinc-300 rounded-lg bg-zinc-50 animate-pulse">
                    Loading categories...
                  </div>
                ) : (
                  <select
                    name="category"
                    value={selectedCategoryId}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black focus:border-transparent cursor-pointer transition-all bg-white"
                  >
                    <option value="">Select a category</option>
                    {mainCategories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
                />
              </div>

              {/* Original Price */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-2">
                  Original Price
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice || ""}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
                />
              </div>

              {/* Stock Quantity */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-2">
                  Rating (0-5)
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
                />
              </div>

              {/* Reviews */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-2">
                  Reviews Count
                </label>
                <input
                  type="number"
                  name="reviews"
                  value={formData.reviews}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
                />
              </div>

              {/* Status */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleChange}
                    className="w-4 h-4 text-black border-zinc-300 rounded focus:ring-black cursor-pointer"
                  />
                  <span className="text-sm font-medium text-zinc-700">In Stock</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-4 h-4 text-black border-zinc-300 rounded focus:ring-black cursor-pointer"
                  />
                  <span className="text-sm font-medium text-zinc-700">Featured</span>
                </label>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-zinc-700">
                  Product Media *
                </label>
                <Link
                  to="/dashboard/products/photos"
                  className="text-sm text-zinc-600 hover:text-black underline cursor-pointer"
                >
                  Manage library
                </Link>
              </div>
              {availablePhotos.length === 0 ? (
                <div className="rounded-lg border border-dashed border-zinc-300 p-4 text-sm text-zinc-500">
                  No media found. Please upload images in the Product Photos page first.
                </div>
              ) : (
                <ProductPhotosGrid
                  photos={availablePhotos}
                  selectable
                  selectedPhotos={formData.images}
                  onToggleSelect={handlePhotoToggle}
                />
              )}
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-3">
                Available Sizes
              </label>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-3 border border-zinc-300 rounded-lg">
                {sizeOptions.map((size) => (
                  <motion.button
                    key={size}
                    type="button"
                    onClick={() => handleSizeToggle(size)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer outline-none ${
                      formData.sizes.includes(size)
                        ? "bg-black text-white"
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Toggle ${size} size`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
              {formData.sizes.length > 0 && (
                <p className="mt-2 text-xs text-zinc-500">
                  Selected: {formData.sizes.join(", ")}
                </p>
              )}
            </div>

            {/* Colors */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-3">
                Available Colors
              </label>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-3 border border-zinc-300 rounded-lg">
                {colorOptions.map((color) => (
                  <motion.button
                    key={color}
                    type="button"
                    onClick={() => handleColorToggle(color)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer outline-none ${
                      formData.colors.includes(color)
                        ? "bg-black text-white"
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Toggle ${color} color`}
                  >
                    {color}
                  </motion.button>
                ))}
              </div>
              {formData.colors.length > 0 && (
                <p className="mt-2 text-xs text-zinc-500">
                  Selected: {formData.colors.join(", ")}
                </p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => handleTagsChange(e.target.value)}
                placeholder="tag1, tag2, tag3"
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
              />
            </div>

            {/* Action Buttons */}
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
                aria-label={product ? "Update product" : "Create product"}
              >
                {isSubmitting
                  ? "Saving..."
                  : product
                  ? "Update Product"
                  : "Create Product"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default ProductForm;

