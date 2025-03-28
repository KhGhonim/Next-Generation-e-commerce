import { AnimatePresence, motion } from "framer-motion";
import { PiShoppingCartFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { PCHeaderContent } from "../../../Context/Context";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { PcHeaderProps } from "../../../Types/ProjectTypes";

function PcHeader({ IsScrolled }: PcHeaderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <nav
      className={`hidden fixed ${
        IsScrolled
          ? "bg-gray-900 text-white px-6 py-4 rounded-b-2xl"
          : "bg-transparent px-8 py-6"
      } transition-all duration-150 ease-in-out top-0 left-0 right-0 z-50 lg:flex justify-between items-center  text-black`}
    >
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -200 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
        className="flex space-x-6 pt-5"
      >
        <Link
          className="hover:text-gray-600 transition-colors stick-regular"
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
              className="hover:text-gray-600 transition-colors stick-regular"
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
                  className="absolute top-full left-0 w-60 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100 z-50"
                >
                  <div className="py-2">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.id}
                        to={subItem.link}
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-200 text-sm"
                      >
                        <div className="flex items-center justify-between stick-regular">
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
        className="absolute left-1/2  transform top-0 -translate-x-1/2  font-bold text-black"
      >
        {IsScrolled ? (
          <img
            src="/VEXO.svg"
            className="w-full h-24 object-cover"
            alt="website logo"
          />
        ) : (
          <img
            src="/vexo (1).svg"
            className="w-full h-full object-cover"
            alt="website logo"
          />
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
        className="flex space-x-6 items-center pt-5"
      >
        <Link
          className="hover:text-gray-600 transition-colors stick-regular "
          to={""}
        >
          SEASONAL
        </Link>
        <Link
          className="hover:text-gray-600 transition-colors stick-regular "
          to={""}
        >
          ACCESSORIES
        </Link>
        <div className="flex space-x-4">
          <button
            className={`${
              IsScrolled
                ? "bg-white text-black hover:bg-zinc-300"
                : "bg-black text-white hover:bg-amber-800"
            } cursor-pointer  px-5 py-2 rounded-full  transition-colors stick-regular`}
          >
            SIGN UP
          </button>
          <button
            className={`${
              IsScrolled
                ? "bg-white text-black hover:bg-zinc-300"
                : "bg-black text-white hover:bg-amber-800"
            } cursor-pointer px-5 p-2 rounded-full  transition-colors stick-regular`}
          >
            <PiShoppingCartFill size={20} />
          </button>
        </div>
      </motion.div>
    </nav>
  );
}

export default PcHeader;
