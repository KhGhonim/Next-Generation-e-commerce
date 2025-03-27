import { AnimatePresence, motion } from "framer-motion";
import { PiShoppingCartFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { PCHeaderContent } from "../../../Context/Context";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

function PcHeader() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <nav className="hidden fixed top-0 left-0 right-0 z-50 lg:flex justify-between items-center px-8 py-6 text-black">
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -200 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
        className="flex space-x-6 pt-5"
      >
        <Link
          className="hover:text-gray-600 transition-colors almarai-light"
          to={""}
        >
          SHOP
        </Link>
        {PCHeaderContent.map((item, idx) => (
          <div
            key={idx}
            className="relative group"
            onMouseEnter={() => setActiveIndex(item.id)}
            onMouseLeave={() => setActiveIndex(0)}
          >
            <Link
              className="hover:text-gray-600 transition-colors almarai-light"
              to={item.link}
            >
              {item.title}{" "}
              <BiChevronDown
                size={16}
                className="ml-1 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </Link>

            <AnimatePresence>
              {activeIndex === item.id && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100 z-50"
                >
                  <div className="py-2">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.id}
                        to={subItem.link}
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-200 text-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span>{subItem.title}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>
      {/* Website Title */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
        className="absolute left-1/2 transform top-0 -translate-x-1/2 text-3xl font-bold text-black"
      >
        <img
          src="/vexo (1).svg"
          className="w-40 md:w-44 lg:w-52 object-cover"
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
        <Link
          className="hover:text-gray-600 transition-colors almarai-light "
          to={""}
        >
          SEASONAL
        </Link>
        <Link
          className="hover:text-gray-600 transition-colors almarai-light "
          to={""}
        >
          ACCESSORIES
        </Link>
        <div className="flex space-x-4">
          <button className="bg-black cursor-pointer text-white px-5 py-2 rounded-full hover:bg-amber-800 transition-colors almarai-light ">
            SIGN UP
          </button>
          <button className="bg-black cursor-pointer text-white px-5 p-2 rounded-full hover:bg-amber-800 transition-colors almarai-light ">
            <PiShoppingCartFill size={20} />
          </button>
        </div>
      </motion.div>
    </nav>
  );
}

export default PcHeader;
