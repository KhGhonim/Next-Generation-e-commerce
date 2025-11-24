import { useState, useEffect, useRef } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaBoxOpen, 
  FaChartLine, 
  FaUsers, 
  FaCreditCard, 
  FaTags,
  FaBars,
  FaTimes,
  FaHome,
  FaSignOutAlt,
  FaThLarge,
  FaBell,
  FaSearch,
  FaCog,
  FaChevronDown,
  FaUserCircle,
  FaUserFriends,
  FaImages,
  FaTicketAlt
} from "react-icons/fa";
import { useAuth } from "../../../hooks/useAuth";

const navigation = [
  { name: "Overview", path: "/dashboard", icon: FaThLarge },
  { name: "Products", path: "/dashboard/products", icon: FaBoxOpen },
  { name: "Product Photos", path: "/dashboard/products/photos", icon: FaImages },
  { name: "Analytics", path: "/dashboard/analytics", icon: FaChartLine },
  { name: "Sales Team", path: "/dashboard/sales-team", icon: FaUsers },
  { name: "Payments", path: "/dashboard/payments", icon: FaCreditCard },
  { name: "Categories", path: "/dashboard/categories", icon: FaTags },
  { name: "Coupons", path: "/dashboard/coupons", icon: FaTicketAlt },
  { name: "Users", path: "/dashboard/users", icon: FaUserFriends },
];

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };

    if (profileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdownOpen]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "A";
  };

  const getUserName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user?.email) {
      return user.email.split("@")[0];
    }
    return "Admin";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-white to-zinc-300 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-zinc-900 font-bold text-lg">V</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">VEXO</h1>
              <p className="text-xs text-zinc-400">Admin Panel</p>
            </div>
          </div>
          <motion.button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-zinc-700/50 rounded-lg cursor-pointer outline-none transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Close sidebar"
          >
            <FaTimes className="text-zinc-300" />
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard" || item.path === "/dashboard/products"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer outline-none relative ${
                  isActive
                    ? "bg-gradient-to-r from-white/10 to-white/5 text-white shadow-lg shadow-black/20"
                    : "text-zinc-300 hover:bg-zinc-800/50 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className={`text-lg flex-shrink-0 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
                  <span className="font-medium text-sm">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-zinc-700/50 space-y-2">
          <motion.a
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:bg-zinc-800/50 hover:text-white transition-all cursor-pointer outline-none group"
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaHome className="text-base flex-shrink-0 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-sm">Back to Store</span>
          </motion.a>
          <motion.button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all cursor-pointer outline-none group border border-red-900/30"
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Logout"
          >
            <FaSignOutAlt className="text-base flex-shrink-0 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-sm">Logout</span>
          </motion.button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="hidden lg:flex bg-white/90 backdrop-blur-xl border-b border-zinc-200 px-6 py-4 items-center justify-between shadow-md sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-sm" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full pl-11 pr-4 py-3 bg-gradient-to-r from-zinc-50 to-white border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm transition-all shadow-sm hover:shadow-md"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              className="relative p-3 hover:bg-zinc-100 rounded-xl transition-colors cursor-pointer outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Notifications"
            >
              <FaBell className="text-zinc-600 text-lg" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse" />
            </motion.button>
            <div className="w-px h-8 bg-zinc-200 mx-1" />
            <div className="relative" ref={dropdownRef}>
              <motion.button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-3 pl-3 pr-2 py-2 hover:bg-zinc-100 rounded-xl transition-colors cursor-pointer outline-none group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Profile menu"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                  <span className="text-white font-semibold text-sm">{getUserInitials()}</span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-bold text-zinc-900">{getUserName()}</p>
                  <p className="text-xs text-zinc-500">Administrator</p>
                </div>
                <motion.div
                  animate={{ rotate: profileDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaChevronDown className="text-zinc-500 text-xs hidden md:block" />
                </motion.div>
              </motion.button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-zinc-200 bg-gradient-to-r from-zinc-50 to-white">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold">{getUserInitials()}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-zinc-900 truncate">{getUserName()}</p>
                          <p className="text-xs text-zinc-500 truncate">{user?.email || "admin@vexo.com"}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                            Administrator
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <motion.button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          // Navigate to profile page when created
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer outline-none text-left group"
                        whileHover={{ x: 4 }}
                      >
                        <FaUserCircle className="text-zinc-500 group-hover:text-blue-600 transition-colors" />
                        <span className="font-medium text-sm">My Profile</span>
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          // Handle settings - could navigate to settings page
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer outline-none text-left group"
                        whileHover={{ x: 4 }}
                      >
                        <FaCog className="text-zinc-500 group-hover:text-purple-600 transition-colors" />
                        <span className="font-medium text-sm">Settings</span>
                      </motion.button>
                    </div>
                    <div className="border-t border-zinc-200 py-2">
                      <motion.a
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer outline-none group"
                        whileHover={{ x: 4 }}
                      >
                        <FaHome className="text-zinc-500 group-hover:text-green-600 transition-colors" />
                        <span className="font-medium text-sm">Back to Store</span>
                      </motion.a>
                      <motion.button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors cursor-pointer outline-none text-left group"
                        whileHover={{ x: 4 }}
                      >
                        <FaSignOutAlt className="group-hover:text-red-700 transition-colors" />
                        <span className="font-medium text-sm">Logout</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-zinc-200 p-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-zinc-900">Dashboard</h1>
              <p className="text-xs text-zinc-500">{getUserName()}</p>
            </div>
          </div>
          <motion.button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-zinc-100 rounded-lg cursor-pointer outline-none transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Open sidebar"
          >
            <FaBars className="text-zinc-600 text-lg" />
          </motion.button>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;

