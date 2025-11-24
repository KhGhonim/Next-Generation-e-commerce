import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaImage } from "react-icons/fa";
import { Product } from "../types";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  return (
    <>
      {/* Mobile Card View */}
      <div className="block md:hidden space-y-4">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-lg shadow-sm p-4 border border-zinc-200"
          >
            <div className="flex items-start gap-4 mb-4">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                   loading="lazy"
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
              ) : (
                <div className="w-20 h-20 bg-zinc-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaImage className="text-zinc-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-zinc-900 mb-1 truncate">{product.name}</h3>
                <p className="text-xs text-zinc-600 mb-2">{product.category} • {product.brand}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-zinc-900">${product.price.toFixed(2)}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.inStock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out"}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 line-clamp-2">{product.description}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
              <span className="text-sm text-zinc-600">Stock: {product.stockQuantity}</span>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => onEdit(product)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer outline-none transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Edit ${product.name}`}
                >
                  <FaEdit />
                </motion.button>
                <motion.button
                  onClick={() => product._id && onDelete(product._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer outline-none transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Delete ${product.name}`}
                >
                  <FaTrash />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-hidden border border-zinc-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-100">
              <tr>
                <th className="px-4 lg:px-6 py-4 text-start text-sm font-semibold text-zinc-700">Image</th>
                <th className="px-4 lg:px-6 py-4 text-start text-sm font-semibold text-zinc-700">Name</th>
                <th className="px-4 lg:px-6 py-4 text-start text-sm font-semibold text-zinc-700 hidden lg:table-cell">Category</th>
                <th className="px-4 lg:px-6 py-4 text-start text-sm font-semibold text-zinc-700 hidden lg:table-cell">Brand</th>
                <th className="px-4 lg:px-6 py-4 text-start text-sm font-semibold text-zinc-700">Price</th>
                <th className="px-4 lg:px-6 py-4 text-start text-sm font-semibold text-zinc-700 hidden xl:table-cell">Stock</th>
                <th className="px-4 lg:px-6 py-4 text-start text-sm font-semibold text-zinc-700">Status</th>
                <th className="px-4 lg:px-6 py-4 text-start text-sm font-semibold text-zinc-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {products.map((product, index) => (
                <motion.tr
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-zinc-50 transition-colors"
                >
                  <td className="px-4 lg:px-6 py-4">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                         loading="lazy"
                        className="w-12 h-12 lg:w-16 lg:h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-zinc-200 rounded-lg flex items-center justify-center">
                        <FaImage className="text-zinc-400" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <div className="font-medium text-zinc-900 text-sm lg:text-base">{product.name}</div>
                    <div className="text-xs lg:text-sm text-zinc-500 truncate max-w-xs hidden md:block">
                      {product.description}
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-zinc-700 text-sm lg:text-base hidden lg:table-cell">{product.category}</td>
                  <td className="px-4 lg:px-6 py-4 text-zinc-700 text-sm lg:text-base hidden lg:table-cell">{product.brand}</td>
                  <td className="px-4 lg:px-6 py-4">
                    <div className="font-semibold text-zinc-900 text-sm lg:text-base">${product.price.toFixed(2)}</div>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div className="text-xs text-zinc-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </div>
                    )}
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-zinc-700 text-sm lg:text-base hidden xl:table-cell">{product.stockQuantity}</td>
                  <td className="px-4 lg:px-6 py-4">
                    <span
                      className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${
                        product.inStock
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <div className="flex items-center gap-2">
                      <motion.button
                        onClick={() => onEdit(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer outline-none transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Edit ${product.name}`}
                      >
                        <FaEdit />
                      </motion.button>
                      <motion.button
                        onClick={() => product._id && onDelete(product._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer outline-none transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Delete ${product.name}`}
                      >
                        <FaTrash />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ProductList;

