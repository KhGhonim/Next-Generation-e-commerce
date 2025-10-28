import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaChartLine,
  FaUsers,
  FaCreditCard,
  FaTags,
  FaArrowRight,
  FaDollarSign,
  FaShoppingCart,
  FaArrowUp,
  FaArrowDown,
  FaClock,
  FaFire,
} from "react-icons/fa";

const API_URL = import.meta.env.VITE_APP_API_URL;

interface DashboardStats {
  totalProducts: number;
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  revenueChange: number;
  ordersChange: number;
  customersChange?: number;
  productsChange?: number;
}

function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    revenueChange: 0,
    ordersChange: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [productsRes, analyticsRes] = await Promise.all([
        fetch(`${API_URL}/api/products`, { credentials: "include" }),
        fetch(`${API_URL}/api/analytics`, { credentials: "include" }),
      ]);

      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setStats((prev) => ({ ...prev, totalProducts: productsData.data?.length || 0 }));
      }

      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json();
        setStats((prev) => ({
          ...prev,
          ...analyticsData.data,
        }));
      }
    } catch (error) {
      console.error("Fetch dashboard data error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const quickLinks = [
    {
      title: "Products",
      description: "Manage your product catalog",
      icon: FaBoxOpen,
      path: "/dashboard/products",
      color: "bg-blue-500",
    },
    {
      title: "Analytics",
      description: "View business insights",
      icon: FaChartLine,
      path: "/dashboard/analytics",
      color: "bg-green-500",
    },
    {
      title: "Sales Team",
      description: "Manage team members",
      icon: FaUsers,
      path: "/dashboard/sales-team",
      color: "bg-purple-500",
    },
    {
      title: "Payments",
      description: "View transactions",
      icon: FaCreditCard,
      path: "/dashboard/payments",
      color: "bg-orange-500",
    },
    {
      title: "Categories",
      description: "Organize products",
      icon: FaTags,
      path: "/dashboard/categories",
      color: "bg-pink-500",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-zinc-200 border-t-black"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-black/20"></div>
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="max-w-7xl mx-auto w-full space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-700 bg-clip-text text-transparent mb-2">
            Dashboard Overview
          </h1>
          <p className="text-sm text-zinc-600">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <motion.div
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
          whileHover={{ scale: 1.02 }}
        >
          <FaClock className="text-blue-600" />
          <span className="text-sm font-medium text-zinc-700">
            Last updated: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -4 }}
          className="group relative bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <FaDollarSign className="text-white text-xl" />
              </div>
              <motion.div
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${
                  stats.revenueChange >= 0 ? "bg-green-400/20 text-green-100" : "bg-red-400/20 text-red-100"
                }`}
              >
                {stats.revenueChange >= 0 ? (
                  <FaArrowUp className="text-xs" />
                ) : (
                  <FaArrowDown className="text-xs" />
                )}
                <span className="text-xs font-semibold">
                  {Math.abs(stats.revenueChange).toFixed(1)}%
                </span>
              </motion.div>
            </div>
            <h3 className="text-sm text-blue-100 mb-2 font-medium">Total Revenue</h3>
            <p className="text-3xl font-bold text-white mb-1">{formatCurrency(stats.totalRevenue)}</p>
            <p className="text-xs text-blue-200">vs last month</p>
          </div>
        </motion.div>

        {/* Orders Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -4 }}
          className="group relative bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <FaShoppingCart className="text-white text-xl" />
              </div>
              <motion.div
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${
                  stats.ordersChange >= 0 ? "bg-green-400/20 text-green-100" : "bg-red-400/20 text-red-100"
                }`}
              >
                {stats.ordersChange >= 0 ? (
                  <FaArrowUp className="text-xs" />
                ) : (
                  <FaArrowDown className="text-xs" />
                )}
                <span className="text-xs font-semibold">
                  {Math.abs(stats.ordersChange).toFixed(1)}%
                </span>
              </motion.div>
            </div>
            <h3 className="text-sm text-green-100 mb-2 font-medium">Total Orders</h3>
            <p className="text-3xl font-bold text-white mb-1">{stats.totalOrders.toLocaleString()}</p>
            <p className="text-xs text-green-200">vs last month</p>
          </div>
        </motion.div>

        {/* Customers Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -4 }}
          className="group relative bg-gradient-to-br from-purple-500 via-pink-600 to-rose-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <FaUsers className="text-white text-xl" />
              </div>
              {(stats.customersChange !== undefined) && (
                <motion.div
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${
                    stats.customersChange >= 0 ? "bg-green-400/20 text-green-100" : "bg-red-400/20 text-red-100"
                  }`}
                >
                  {stats.customersChange >= 0 ? (
                    <FaArrowUp className="text-xs" />
                  ) : (
                    <FaArrowDown className="text-xs" />
                  )}
                  <span className="text-xs font-semibold">
                    {Math.abs(stats.customersChange).toFixed(1)}%
                  </span>
                </motion.div>
              )}
            </div>
            <h3 className="text-sm text-purple-100 mb-2 font-medium">Total Customers</h3>
            <p className="text-3xl font-bold text-white mb-1">{stats.totalCustomers.toLocaleString()}</p>
            <p className="text-xs text-purple-200">active users</p>
          </div>
        </motion.div>

        {/* Products Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ y: -4 }}
          className="group relative bg-gradient-to-br from-orange-500 via-amber-600 to-yellow-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <FaBoxOpen className="text-white text-xl" />
              </div>
              {stats.totalProducts > 0 && (
                <div className="flex items-center gap-1 px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                  <FaFire className="text-white text-xs" />
                </div>
              )}
            </div>
            <h3 className="text-sm text-orange-100 mb-2 font-medium">Total Products</h3>
            <p className="text-3xl font-bold text-white mb-1">{stats.totalProducts.toLocaleString()}</p>
            <p className="text-xs text-orange-200">in catalog</p>
          </div>
        </motion.div>
      </div>

      {/* Quick Links */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-zinc-900">Quick Access</h2>
          <div className="flex items-center gap-2 text-sm text-zinc-600">
            <FaChartLine className="text-zinc-400" />
            <span>Navigate faster</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <Link
                to={link.path}
                className="block group relative bg-white rounded-2xl p-6 border border-zinc-200 hover:border-zinc-300 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer outline-none overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`${link.color} p-4 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <link.icon className="text-2xl" />
                    </div>
                    <motion.div
                      className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-colors"
                      whileHover={{ x: 2 }}
                    >
                      <FaArrowRight className="text-zinc-600 group-hover:text-white text-sm transition-colors" />
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-zinc-900 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-zinc-600 group-hover:text-zinc-700 transition-colors">
                    {link.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="bg-gradient-to-br from-white to-zinc-50 rounded-2xl shadow-sm p-8 border border-zinc-200"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-1">Recent Activity</h2>
            <p className="text-sm text-zinc-600">Latest updates and notifications</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-zinc-100 rounded-xl">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-zinc-700">Live</span>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-full flex items-center justify-center">
                <FaChartLine className="text-zinc-400 text-2xl" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-700 mb-1">No recent activity</p>
                <p className="text-xs text-zinc-500">Activity updates will appear here</p>
              </div>
            </div>
          </div>
          <div className="py-16"></div>
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;
