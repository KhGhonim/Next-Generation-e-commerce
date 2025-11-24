import { motion } from "framer-motion";
import { CiLogin, CiUser } from "react-icons/ci";
import { PiShoppingCartFill } from "react-icons/pi";
import { FaHome, FaSearch, FaHeart } from "react-icons/fa";
import PhoneDrawer from "./PhoneDrawer";
import { useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { PhoneHeaderProps } from "../../../Types/ProjectTypes";
import { Link, useLocation } from "react-router-dom";
import SidebarCart from "../../Cart/SidebarCart";

function PhoneHeader({ user }: PhoneHeaderProps) {
  const [isDrawerOpen, setisDrawerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const Location = useLocation().pathname;
  const { uniqueItems } = useAppSelector((state) => state.cart);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);

  const navItems = [
    {
      icon: FaHome,
      label: "Home",
      path: "/",
      active: Location === "/",
    },
    {
      icon: FaSearch,
      label: "Shop",
      path: "/shop",
      active: Location === "/shop",
    },
    {
      icon: FaHeart,
      label: "Wishlist",
      path: "/wishlist",
      active: Location === "/wishlist",
      badge: wishlistItems.length > 0 ? wishlistItems.length : undefined,
    },
    {
      icon: PiShoppingCartFill,
      label: "Cart",
      path: "#",
      active: false,
      badge: uniqueItems > 0 ? uniqueItems : undefined,
      onClick: () => setIsCartOpen(true),
    },
    {
      icon: user ? CiUser : CiLogin,
      label: user ? "Profile" : "Login",
      path: user ? "/profile" : "/login",
      active: Location === "/profile" || Location === "/login",
    },
  ];

  return (
    <div>
      {/* Top Image logo */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 z-50 lg:hidden flex justify-center items-center"
      >
        <img
          src="/VEXO.svg"
          alt="website logo"
          className="w-56 h-full object-cover"
          
        />
      </motion.div>
      {/* Bottom Navigation Bar */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-200 shadow-lg"
      >
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = item.active;

            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center justify-center  p-1 min-w-0 flex-1"
              >
                {item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className={`relative p-2 rounded-lg transition-colors cursor-pointer ${
                      isActive
                        ? "text-black bg-gray-100"
                        : "text-gray-600 hover:text-black hover:bg-gray-50"
                    }`}
                    aria-label={item.label}
                  >
                    <IconComponent size={16} />
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center stick-bold">
                        {item.badge > 99 ? "99+" : item.badge}
                      </span>
                    )}
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`relative p-2 rounded-lg transition-colors cursor-pointer ${
                      isActive
                        ? "text-black bg-gray-100"
                        : "text-gray-600 hover:text-black hover:bg-gray-50"
                    }`}
                    aria-label={item.label}
                  >
                    <IconComponent size={16} />
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center stick-bold">
                        {item.badge > 99 ? "99+" : item.badge}
                      </span>
                    )}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.nav>

      {/* Menu Drawer */}
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
