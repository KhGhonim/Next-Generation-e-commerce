import { AnimatePresence, motion } from "framer-motion";
import { PiShoppingCartFill } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PCHeaderContent } from "../../../Context/Context";
import { useState, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import { PcHeaderProps } from "../../../Types/ProjectTypes";
import { FaGlobe, FaUserCircle, FaUser, FaSignOutAlt, FaHeart, FaThLarge } from "react-icons/fa";
import SidebarCart from "../../Cart/SidebarCart";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { clearUser } from "../../../store/slices/userSlice";
import toast from "react-hot-toast";

function PcHeader({ IsScrolled, user }: PcHeaderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const Location = useLocation().pathname;
  const navigate = useNavigate();
  const { uniqueItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleShopNavigation = (category?: string, subcategory?: string) => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (subcategory) params.set('subcategory', subcategory);
    
    const queryString = params.toString();
    navigate(`/shop${queryString ? `?${queryString}` : ''}`);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        dispatch(clearUser());
        toast.success("Logged out successfully!");
        navigate("/login");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred during logout");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isAccountDropdownOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest('.account-dropdown')) {
          setIsAccountDropdownOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAccountDropdownOpen]);

  return (
    <nav
      className={`hidden fixed ${
        Location === "/"
          ? IsScrolled
            ? "bg-gray-900 text-white px-6 py-4 rounded-b-2xl"
            : "bg-transparent px-8 py-6"
          : "bg-gray-900 text-white px-6 py-4 rounded-b-2xl"
      } transition-all duration-150 ease-in-out top-0 left-0 right-0 z-50 lg:flex justify-between items-center  text-black`}
    >
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -200 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
        className="flex space-x-6 pt-5"
      >
        {PCHeaderContent.map((item, idx) => (
          <div
            key={idx}
            className="relative group"
            onMouseEnter={() => setActiveIndex(item.id)}
            onMouseLeave={() => setActiveIndex(0)}
          >
            <button
              onClick={() => handleShopNavigation(item.title.toLowerCase())}
              className="hover:text-gray-600 transition-colors stick-regular cursor-pointer rounded-lg"
              aria-label={`Go to ${item.title} section`}
            >
              {item.title}{" "}
              <BiChevronDown
                size={16}
                className="ml-1 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </button>

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
                      <button
                        key={subItem.id}
                        onClick={() => handleShopNavigation(item.title.toLowerCase(), subItem.title.toLowerCase())}
                        className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-200 text-sm cursor-pointer rounded-lg"
                        aria-label={`Go to ${subItem.title} in ${item.title}`}
                      >
                        <div className="flex items-center justify-between stick-regular">
                          <span>{subItem.title}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
        className="absolute left-1/2  transform top-0 -translate-x-1/2  font-bold text-black"
      >
        {Location === "/" ? (
          IsScrolled ? (
            <Link to={"/"}>
              <img
                src="/VEXO.svg"
                className="w-full h-24 object-cover"
                alt="website logo"
              />
            </Link>
          ) : (
            <Link to={"/"}>
              <img
                src="/vexo (1).svg"
                className="w-full h-full object-cover"
                alt="website logo"
              />
            </Link>
          )
        ) : (
          <Link to={"/"}>
            <img
              src="/VEXO.svg"
              className="w-full h-24 object-cover"
              alt="website logo"
            />
          </Link>
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
        className="flex space-x-6 items-center pt-5"
      >
            <div className="flex space-x-4">
              <div className="relative account-dropdown">
                <button
                  className={`${
                    Location === "/"
                      ? IsScrolled
                        ? "bg-white text-black hover:bg-zinc-300"
                        : "bg-black text-white hover:bg-amber-800"
                      : "bg-white text-black hover:bg-zinc-300"
                  } cursor-pointer px-5 py-2 rounded-full transition-colors stick-regular`}
                  aria-label={user ? "User profile" : "User account"}
                  onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                >
                  {user ? <FaUserCircle size={20} /> : <FaUser size={20} />}
                </button>

                {/* Account Dropdown */}
                <AnimatePresence>
                  {isAccountDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute top-full right-0 w-48 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100 z-50 mt-2"
                    >
                      <div className="py-2">
                        {user ? (
                          <>
                            <Link
                              to="/profile"
                              className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-200 text-sm cursor-pointer stick-regular"
                              onClick={() => setIsAccountDropdownOpen(false)}
                            >
                              <div className="flex items-center space-x-2">
                                <FaUserCircle />
                                <span>Profile</span>
                              </div>
                            </Link>
                            <Link
                              to="/wishlist"
                              className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-200 text-sm cursor-pointer stick-regular"
                              onClick={() => setIsAccountDropdownOpen(false)}
                            >
                              <div className="flex items-center space-x-2">
                                <FaHeart />
                                <span>Wishlist</span>
                              </div>
                            </Link>
                            {user?.role === "admin" && (
                              <Link
                                to="/dashboard"
                                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-200 text-sm cursor-pointer stick-regular"
                                onClick={() => setIsAccountDropdownOpen(false)}
                              >
                                <div className="flex items-center space-x-2">
                                  <FaThLarge />
                                  <span>Dashboard</span>
                                </div>
                              </Link>
                            )}
                            <button
                              onClick={() => {
                                handleLogout();
                                setIsAccountDropdownOpen(false);
                              }}
                              className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-200 text-sm cursor-pointer stick-regular"
                            >
                              <div className="flex items-center space-x-2">
                                <FaSignOutAlt />
                                <span>Logout</span>
                              </div>
                            </button>
                          </>
                        ) : (
                          <Link
                            to="/login"
                            className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-200 text-sm cursor-pointer stick-regular"
                            onClick={() => setIsAccountDropdownOpen(false)}
                          >
                            <div className="flex items-center space-x-2">
                              <FaUser />
                              <span>Login</span>
                            </div>
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className={`${
              Location === "/"
                ? IsScrolled
                  ? "bg-white text-black hover:bg-zinc-300"
                  : "bg-black text-white hover:bg-amber-800"
                : "bg-white text-black hover:bg-zinc-300"
            } cursor-pointer px-5 p-2 rounded-full transition-colors stick-regular relative`}
            aria-label="Open shopping cart"
          >
            <PiShoppingCartFill size={20} />
            {uniqueItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center stick-bold">
                {uniqueItems}
              </span>
            )}
          </button>
          <button
            className={`${
              Location === "/"
                ? IsScrolled
                  ? "bg-white text-black hover:bg-zinc-300"
                  : "bg-black text-white hover:bg-amber-800"
                : "bg-white text-black hover:bg-zinc-300"
            } cursor-pointer px-5 p-2 rounded-full  transition-colors stick-regular`}
          >
            <FaGlobe />
          </button>
        </div>
        {!user && (
          <div className="flex space-x-4">
            <button
              className={`${
                Location === "/"
                  ? IsScrolled
                    ? "bg-white text-black hover:bg-zinc-300"
                    : "bg-black text-white hover:bg-amber-800"
                  : "bg-white text-black hover:bg-zinc-300"
              } cursor-pointer px-5 py-2 rounded-full transition-colors stick-regular`}
              aria-label="Sign up"
            >
              <Link to="/signup">
                SIGN UP
              </Link>
            </button>
          </div>
        )}
      </motion.div>

      {/* Cart Sidebar */}
      <SidebarCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
}

export default PcHeader;
