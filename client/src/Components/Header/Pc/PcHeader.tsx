import { motion } from "framer-motion";
import { PiShoppingCartFill } from "react-icons/pi";
import { Link } from "react-router-dom";

function PcHeader() {
  return (
    <nav className="hidden fixed top-0 left-0 right-0 z-50 lg:flex justify-between items-center px-8 py-6 text-black">
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -200 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
        className="flex space-x-6 pt-5"
      >
        <Link className="hover:text-gray-600 transition-colors almarai-light " to={""}>
          SHOP
        </Link>
        <Link className="hover:text-gray-600 transition-colors almarai-light " to={""}>
          MEN
        </Link>
        <Link className="hover:text-gray-600 transition-colors almarai-light " to={""}>
          WOMEN
        </Link>
        <Link className="hover:text-gray-600 transition-colors almarai-light " to={""}>
          TRENDING
        </Link>
      </motion.div>

      {/* Website Title */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
        className="absolute left-1/2 transform top-2 -translate-x-1/2 text-3xl font-bold text-black"
      >
        <img
          src="/vexo (1).svg"
          className="w-40 object-cover"
          alt="website logo"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
        className="flex space-x-6 items-center pt-5"
      >
        <Link className="hover:text-gray-600 transition-colors almarai-light " to={""}>
          SEASONAL
        </Link>
        <Link className="hover:text-gray-600 transition-colors almarai-light " to={""}>
          ACCESSORIES
        </Link>
        <div className="flex space-x-4">
          <button className="bg-black cursor-pointer text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-colors almarai-light ">
            SIGN UP
          </button>
          <button className="bg-black cursor-pointer text-white px-5 p-2 rounded-full hover:bg-gray-800 transition-colors almarai-light ">
            <PiShoppingCartFill size={20} />
          </button>
        </div>
      </motion.div>
    </nav>
  );
}

export default PcHeader;
