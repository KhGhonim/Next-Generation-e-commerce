import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaDollarSign, FaShoppingCart, FaUsers, FaArrowUp, FaArrowDown } from "react-icons/fa";

const API_URL = import.meta.env.VITE_APP_API_URL;

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  revenueChange: number;
  ordersChange: number;
  customersChange: number;
  productsChange: number;
}

function Analytics() {
  const [stats, setStats] = useState<Stats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    revenueChange: 0,
    ordersChange: 0,
    customersChange: 0,
    productsChange: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/analytics`, {
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        setStats(result.data);
      }
    } catch (error) {
      console.error("Fetch analytics error:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const gradientCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      change: stats.revenueChange,
      icon: FaDollarSign,
      gradient: "from-blue-500 via-blue-600 to-indigo-600",
      textColor: "text-blue-100",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      change: stats.ordersChange,
      icon: FaShoppingCart,
      gradient: "from-green-500 via-emerald-600 to-teal-600",
      textColor: "text-green-100",
    },
    {
      title: "Total Customers",
      value: stats.totalCustomers.toLocaleString(),
      change: stats.customersChange,
      icon: FaUsers,
      gradient: "from-purple-500 via-pink-600 to-rose-600",
      textColor: "text-purple-100",
    },
    {
      title: "Total Products",
      value: stats.totalProducts.toLocaleString(),
      change: stats.productsChange,
      icon: FaChartLine,
      gradient: "from-orange-500 via-amber-600 to-yellow-600",
      textColor: "text-orange-100",
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

  return (
    <div className="max-w-7xl mx-auto w-full space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-700 bg-clip-text text-transparent mb-2">
          Analytics
        </h1>
        <p className="text-sm text-zinc-600">Overview of your business performance</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {gradientCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className={`group relative bg-gradient-to-br ${stat.gradient} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  <stat.icon className="text-white text-xl" />
                </div>
                <motion.div
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${
                    stat.change >= 0 ? "bg-green-400/20 text-green-100" : "bg-red-400/20 text-red-100"
                  }`}
                >
                  {stat.change >= 0 ? (
                    <FaArrowUp className="text-xs" />
                  ) : (
                    <FaArrowDown className="text-xs" />
                  )}
                  <span className="text-xs font-semibold">
                    {Math.abs(stat.change).toFixed(1)}%
                  </span>
                </motion.div>
              </div>
              <h3 className={`text-sm ${stat.textColor} mb-2 font-medium`}>{stat.title}</h3>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-white to-zinc-50 rounded-2xl shadow-sm p-8 border border-zinc-200"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-1">Revenue Overview</h2>
            <p className="text-sm text-zinc-600">Visual representation of revenue trends</p>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 rounded-xl border-2 border-dashed border-zinc-300">
          <div className="text-center">
            <FaChartLine className="text-4xl text-zinc-400 mx-auto mb-3" />
            <p className="text-zinc-500 font-medium">Chart visualization will be implemented here</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Analytics;

