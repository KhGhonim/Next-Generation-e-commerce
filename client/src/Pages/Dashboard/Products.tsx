import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import ProductList from "./Components/ProductList";
import ProductForm from "./Components/ProductForm";
import { FaPlus, FaBoxOpen } from "react-icons/fa";
import { Product } from "./types";

const API_URL = import.meta.env.VITE_APP_API_URL;

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/products`, {
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        setProducts(result.data);
      } else {
        toast.error(result.message || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Fetch products error:", error);
      toast.error("An error occurred while fetching products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Product deleted successfully");
        fetchProducts();
      } else {
        toast.error(result.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Delete product error:", error);
      toast.error("An error occurred while deleting product");
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts();
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
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
            Products
          </h1>
          <p className="text-sm text-zinc-600">Manage your products and inventory</p>
        </div>
        <motion.button
          onClick={handleCreateProduct}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-black to-zinc-800 text-white rounded-xl cursor-pointer outline-none shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Add new product"
        >
          <FaPlus className="text-lg" />
          <span className="font-semibold">Add Product</span>
        </motion.button>
      </motion.div>

        {/* Product Form Modal */}
        {showForm && (
          <ProductForm
            product={editingProduct}
            onSubmit={handleFormSubmit}
            onCancel={handleCancelForm}
          />
        )}

      {/* Products List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-zinc-200 border-t-black"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-black/20"></div>
          </div>
        </div>
      ) : products.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-white to-zinc-50 rounded-2xl border border-zinc-200"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-full flex items-center justify-center mb-6">
            <FaBoxOpen className="text-4xl text-zinc-400" />
          </div>
          <h3 className="text-2xl font-bold text-zinc-900 mb-2">No products found</h3>
          <p className="text-zinc-600 mb-6">Get started by adding your first product</p>
          <motion.button
            onClick={handleCreateProduct}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-black to-zinc-800 text-white rounded-xl cursor-pointer outline-none shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Add new product"
          >
            <FaPlus />
            <span className="font-semibold">Add Product</span>
          </motion.button>
        </motion.div>
      ) : (
        <ProductList
          products={products}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      )}
    </div>
  );
}

export default Products;

