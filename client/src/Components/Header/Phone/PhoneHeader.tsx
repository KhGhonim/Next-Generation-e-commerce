import { motion } from "framer-motion";
import { CiLogin, CiUser } from "react-icons/ci";
import { HiOutlineMenuAlt2, HiOutlineMenuAlt3 } from "react-icons/hi";
import { PiShoppingCartFill } from "react-icons/pi";
import PhoneDrawer from "./PhoneDrawer";
import { useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { PhoneHeaderProps } from "../../../Types/ProjectTypes";
import { Link, useLocation } from "react-router-dom";
import SidebarCart from "../../Cart/SidebarCart";

function PhoneHeader({ IsScrolled, user }: PhoneHeaderProps) {
  const [isDrawerOpen, setisDrawerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const Location = useLocation().pathname;
  const { uniqueItems } = useAppSelector((state) => state.cart);
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
              Location === "/"
                ? IsScrolled
                  ? "text-black bg-zinc-200"
                  : "text-white bg-gray-900"
                : "text-black bg-zinc-200"
            } cursor-pointere text-xs p-2 px-4 mx-2 lg:mx-5 rounded-full hover:bg-gray-800 transition-colors almarai-light`}
          >
            {isDrawerOpen ? (
              <HiOutlineMenuAlt3 size={14} />
            ) : (
              <HiOutlineMenuAlt2 size={14} />
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
                  className="w-full h-24 object-cover p-2 lg:p-0"
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
          <div className="flex space-x-1">
            <button
              className={`${
                Location === "/"
                  ? IsScrolled
                    ? "text-black bg-zinc-200"
                    : "text-white bg-gray-900"
                  : "text-black bg-zinc-200"
              } cursor-pointer  text-xs p-2  rounded-full hover:bg-gray-800 transition-colors almarai-light`}
            >
              <Link to={user ? "/profile" : "/login"}>
                {user ? <CiUser size={14} /> : <CiLogin size={14} />}
              </Link>
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className={`${
                Location === "/"
                  ? IsScrolled
                    ? "text-black bg-zinc-200"
                    : "text-white bg-gray-900"
                  : "text-black bg-zinc-200"
              } cursor-pointer p-2 rounded-full hover:bg-gray-800 transition-colors almarai-light relative`}
              aria-label="Open shopping cart"
            >
              <PiShoppingCartFill size={14} />
              {uniqueItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center stick-bold">
                  {uniqueItems}
                </span>
              )}
            </button>
          </div>
        </motion.div>
      </nav>

          <PhoneDrawer
            setisDrawerOpen={setisDrawerOpen}
            isDrawerOpen={isDrawerOpen}
            user={user}
          />

      {/* Cart Sidebar */}
      <SidebarCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default PhoneHeader;
