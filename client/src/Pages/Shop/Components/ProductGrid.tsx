import { motion } from "framer-motion";
import { FaStar, FaShoppingCart, FaEye, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Product } from "../Shop";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  isLoading: boolean;
}

function ProductGrid({ products, onAddToCart, onAddToWishlist, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-900 stick-bold mb-2">
          No products found
        </h3>
        <p className="text-gray-600 stick-regular">
          Try adjusting your filters to see more products.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 sm:h-64 object-cover"
            />
            {!product.inStock && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs stick-bold">
                Out of Stock
              </div>
            )}
            <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs stick-bold">
              {product.brand}
            </div>
            <motion.button
              onClick={() => onAddToWishlist(product)}
              className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-700 hover:text-red-500 p-2 rounded-full transition-colors cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Add ${product.name} to wishlist`}
            >
              <FaHeart className="text-sm" />
            </motion.button>
          </div>

          <div className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 stick-bold mb-2 line-clamp-2">
              {product.name}
            </h3>
            
            <p className="text-gray-600 stick-regular text-sm mb-3 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600 stick-regular">
                ({product.reviews})
              </span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-gray-900 stick-bold">
                ${product.price}
              </span>
              <span className="text-sm text-gray-500 stick-regular">
                {product.category}
              </span>
            </div>

            <div className="flex space-x-2">
              <motion.button
                onClick={() => onAddToCart(product)}
                disabled={!product.inStock}
                className="flex-1 bg-black text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 cursor-pointer"
                aria-label={`Add ${product.name} to cart`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaShoppingCart className="text-sm sm:text-base" />
                <span className="stick-regular text-sm sm:text-base">Add to Cart</span>
              </motion.button>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={`/product/${product.id}`}
                  className="bg-gray-100 text-gray-900 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center cursor-pointer"
                  aria-label={`View details for ${product.name}`}
                >
                  <FaEye className="text-sm sm:text-base" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default ProductGrid;
