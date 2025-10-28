import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaClock, FaCreditCard } from "react-icons/fa";
import { Payment } from "./types";

const API_URL = import.meta.env.VITE_APP_API_URL;

function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/payments`, {
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        setPayments(result.data);
      }
    } catch (error) {
      console.error("Fetch payments error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "success":
        return <FaCheckCircle className="text-green-500" />;
      case "pending":
        return <FaClock className="text-yellow-500" />;
      case "failed":
      case "cancelled":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "success":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
    <div className="max-w-7xl mx-auto w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-700 bg-clip-text text-transparent mb-2">
          Payments
        </h1>
        <p className="text-sm text-zinc-600">View and manage payment transactions</p>
      </motion.div>

      {/* Mobile Card View */}
      {payments.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-white to-zinc-50 rounded-2xl border border-zinc-200"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-full flex items-center justify-center mb-6">
            <FaCreditCard className="text-4xl text-zinc-400" />
          </div>
          <h3 className="text-2xl font-bold text-zinc-900 mb-2">No payments found</h3>
          <p className="text-zinc-600">Payment transactions will appear here</p>
        </motion.div>
      ) : (
        <>
          <div className="block md:hidden space-y-4">
            {payments.map((payment, index) => (
              <motion.div
                key={payment._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                className="bg-white rounded-2xl shadow-sm p-6 border border-zinc-200 hover:shadow-xl transition-all"
              >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-zinc-900 text-sm">Order ID</p>
                  <p className="text-xs text-zinc-600">{payment.orderId}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(payment.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-zinc-600">Customer</p>
                  <p className="text-zinc-900">{payment.customerEmail || "N/A"}</p>
                </div>
                <div>
                  <p className="text-zinc-600">Amount</p>
                  <p className="font-semibold text-zinc-900">${payment.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-zinc-600">Method</p>
                  <p className="text-zinc-900">{payment.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-zinc-600">Date</p>
                  <p className="text-zinc-900">
                    {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-2xl shadow-sm overflow-hidden border border-zinc-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-zinc-50 to-zinc-100">
                  <tr>
                    <th className="px-4 lg:px-6 py-4 text-left text-sm font-bold text-zinc-700">Order ID</th>
                    <th className="px-4 lg:px-6 py-4 text-left text-sm font-bold text-zinc-700">Customer</th>
                    <th className="px-4 lg:px-6 py-4 text-left text-sm font-bold text-zinc-700">Amount</th>
                    <th className="px-4 lg:px-6 py-4 text-left text-sm font-bold text-zinc-700 hidden lg:table-cell">Payment Method</th>
                    <th className="px-4 lg:px-6 py-4 text-left text-sm font-bold text-zinc-700">Status</th>
                    <th className="px-4 lg:px-6 py-4 text-left text-sm font-bold text-zinc-700 hidden xl:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {payments.map((payment, index) => (
                    <motion.tr
                      key={payment._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gradient-to-r hover:from-zinc-50 hover:to-white transition-colors"
                    >
                      <td className="px-4 lg:px-6 py-4 font-semibold text-zinc-900 text-sm lg:text-base">{payment.orderId}</td>
                      <td className="px-4 lg:px-6 py-4 text-zinc-700 text-sm lg:text-base">{payment.customerEmail || "N/A"}</td>
                      <td className="px-4 lg:px-6 py-4 font-bold text-green-600 text-sm lg:text-base">${payment.amount.toFixed(2)}</td>
                      <td className="px-4 lg:px-6 py-4 text-zinc-700 text-sm lg:text-base hidden lg:table-cell">{payment.paymentMethod}</td>
                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(payment.status)}
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                            {payment.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-zinc-700 text-sm lg:text-base hidden xl:table-cell">
                        {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : "N/A"}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Payments;

