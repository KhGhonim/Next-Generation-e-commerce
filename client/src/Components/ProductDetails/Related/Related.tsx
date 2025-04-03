import { motion } from "framer-motion";
import { relatedProducts } from "../../../Context/Context";

function Related() {
  return (
    <div className="mt-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">The Rest of Your Fit</h2>
        <motion.button
          className="text-sm underline font-medium"
          whileHover={{ scale: 1.05 }}
        >
          See All Collection
        </motion.button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <motion.div key={product.id} className="group" whileHover={{ y: -5 }}>
            <div className="relative aspect-square mb-4 rounded-2xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
              />
              {product.discount && (
                <span className="absolute top-3 left-3 bg-black text-white px-3 py-1 text-sm rounded-full">
                  {product.discount}
                </span>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <motion.button
                  className="bg-white text-black font-medium px-6 py-2 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Quick Add
                </motion.button>
              </div>
            </div>
            <h3 className="font-medium mb-2">{product.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Related;
