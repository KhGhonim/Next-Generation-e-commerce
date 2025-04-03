import { motion } from "framer-motion";
import { CiLogin } from "react-icons/ci";
import { HiOutlineMenuAlt2, HiOutlineMenuAlt3 } from "react-icons/hi";
import { PiShoppingCartFill } from "react-icons/pi";
import PhoneDrawer from "./PhoneDrawer";
import { useState } from "react";
import { PhoneHeaderProps } from "../../../Types/ProjectTypes";
import { Link, useLocation } from "react-router-dom";

function PhoneHeader({ IsScrolled }: PhoneHeaderProps) {
  const [isDrawerOpen, setisDrawerOpen] = useState(false);
  const Location = useLocation().pathname;
  return (
    <div>
      <nav
        className={`fixed ${
          Location === "/"
            ? IsScrolled
              ? "bg-gray-900 text-white p-4 rounded-b-2xl"
              : "bg-transparent p-8 text-black"
            : "bg-gray-900 text-white p-4 rounded-b-2xl"
        } transition-all duration-150 ease-in-out top-0 left-0 right-0 z-50 lg:hidden flex justify-between items-center   `}
      >
        <div className="flex items-center justify-center">
          <button
            onClick={() => setisDrawerOpen(true)}
            className={`${
              IsScrolled ? "bg-white text-black" : "bg-black  text-white "
            } cursor-pointere text-xs p-2 px-4 mx-5 rounded-full hover:bg-gray-800 transition-colors almarai-light`}
          >
            {isDrawerOpen ? (
              <HiOutlineMenuAlt3 size={20} />
            ) : (
              <HiOutlineMenuAlt2 size={20} />
            )}
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
          className="absolute left-1/2 transform top-1 -translate-x-1/2 text-3xl font-bold text-black"
        >
          {Location === "/" ? (
            IsScrolled ? (
              <Link to={"/"}>
                <img
                  src="/VEXO.svg"
                  className="w-40 h-16 object-cover"
                  alt="website logo"
                />
              </Link>
            ) : (
              <Link to={"/"}>
                <img
                  src="/vexo (1).svg"
                  className="w-full h-24 object-cover"
                  alt="website logo"
                />
              </Link>
            )
          ) : (
            <Link to={"/"}>
              <img
                src="/VEXO.svg"
                className="w-40 h-16 object-cover"
                alt="website logo"
              />
            </Link>
          )}
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
            <button
              className={`${
                IsScrolled ? "text-black bg-zinc-200" : "text-white bg-gray-900"
              } cursor-pointer  text-xs p-2  rounded-full hover:bg-gray-800 transition-colors almarai-light`}
            >
              <CiLogin size={20} />
            </button>
            <button
              className={`${
                IsScrolled ? "text-black bg-zinc-200" : "text-white bg-gray-900"
              }  cursor-pointer  p-2 rounded-full hover:bg-gray-800 transition-colors almarai-light `}
            >
              <PiShoppingCartFill size={20} />
            </button>
          </div>
        </motion.div>
      </nav>

      <PhoneDrawer
        setisDrawerOpen={setisDrawerOpen}
        isDrawerOpen={isDrawerOpen}
      />
    </div>
  );
}

export default PhoneHeader;
