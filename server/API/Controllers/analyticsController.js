import Product from "../Models/Product.js";
import Payment from "../Models/Payment.js";
import User from "../Models/User.js";

export const getAnalytics = async (req, res) => {
  try {
    // Calculate total revenue from completed payments
    const completedPayments = await Payment.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalRevenue = completedPayments[0]?.total || 0;

    // Calculate previous period revenue for comparison
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const previousPeriodRevenue = await Payment.aggregate([
      { 
        $match: { 
          status: "completed",
          createdAt: { $lt: thirtyDaysAgo }
        }
      },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const prevRevenue = previousPeriodRevenue[0]?.total || 0;
    const revenueChange = prevRevenue > 0 
      ? parseFloat(((totalRevenue - prevRevenue) / prevRevenue * 100).toFixed(1))
      : 0;

    // Total orders
    const totalOrders = await Payment.countDocuments({ status: "completed" });
    const prevOrders = await Payment.countDocuments({
      status: "completed",
      createdAt: { $lt: thirtyDaysAgo }
    });
    const ordersChange = prevOrders > 0
      ? parseFloat((((totalOrders - prevOrders) / prevOrders) * 100).toFixed(1))
      : 0;

    // Total customers
    const totalCustomers = await User.countDocuments({ role: "user" });
    const prevCustomers = await User.countDocuments({
      role: "user",
      createdAt: { $lt: thirtyDaysAgo }
    });
    const customersChange = prevCustomers > 0
      ? parseFloat((((totalCustomers - prevCustomers) / prevCustomers) * 100).toFixed(1))
      : 0;

    // Total products
    const totalProducts = await Product.countDocuments();
    const prevProducts = await Product.countDocuments({ createdAt: { $lt: thirtyDaysAgo } });
    const productsChange = prevProducts > 0
      ? parseFloat((((totalProducts - prevProducts) / prevProducts) * 100).toFixed(1))
      : 0;

    res.status(200).json({
      success: true,
      data: {
        totalRevenue: parseFloat(totalRevenue.toFixed(2)),
        totalOrders,
        totalCustomers,
        totalProducts,
        revenueChange,
        ordersChange,
        customersChange,
        productsChange
      }
    });
  } catch (error) {
    console.error("Get analytics error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching analytics"
    });
  }
};

