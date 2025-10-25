import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

interface ShopHeaderProps {
  totalProducts: number;
  searchValue: string;
  onSearchChange: (search: string) => void;
}

function ShopHeader({ totalProducts, searchValue, onSearchChange }: ShopHeaderProps) {
  return (
    <div className="text-center mb-8 mt-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-gray-900 stick-bold mb-4"
      >
        Shop
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-gray-600 stick-regular mb-6"
      >
        Discover our premium collection of products
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="max-w-md mx-auto relative px-4"
      >
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black focus:border-transparent stick-regular"
          />
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-sm text-gray-500 stick-regular mt-4"
      >
        {totalProducts} product{totalProducts !== 1 ? 's' : ''} found
      </motion.p>
    </div>
  );
}

export default ShopHeader;
