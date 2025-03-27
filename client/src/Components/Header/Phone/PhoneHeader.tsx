import { motion } from "framer-motion";
import { CiLogin } from "react-icons/ci";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { PiShoppingCartFill } from "react-icons/pi";

function PhoneHeader() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 lg:hidden flex justify-between items-center p-8  text-black">
      <div className="flex items-center justify-center">
        <button className="bg-black cursor-pointer text-white text-xs p-2 px-4 mx-5 rounded-full hover:bg-gray-800 transition-colors almarai-light ">
          <HiOutlineMenuAlt2 size={20} />
        </button>
      </div>
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
        transition={{
          duration: 0.5,
          delay: 0.5,
          ease: "easeInOut",
          staggerChildren: 0.5,
        }}
      >
        <div className="flex space-x-2">
          <button className="bg-black cursor-pointer text-white text-xs p-2  rounded-full hover:bg-gray-800 transition-colors almarai-light ">
            <CiLogin size={20} />
          </button>
          <button className="bg-black cursor-pointer text-white p-2 rounded-full hover:bg-gray-800 transition-colors almarai-light ">
            <PiShoppingCartFill size={20} />
          </button>
        </div>
      </motion.div>
    </nav>
  );
}

export default PhoneHeader;
