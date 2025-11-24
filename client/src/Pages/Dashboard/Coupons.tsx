import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaTicketAlt, FaPlus } from "react-icons/fa";
import CouponForm from "./Components/Coupons/CouponForm";
import CouponList from "./Components/Coupons/CouponList";
import type { Coupon } from "./types";
import { useCoupons, CouponPayload } from "../../hooks/useCoupons";

function Coupons() {
  const {
    coupons,
    isLoading,
    error,
    fetchCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    products,
    isLoadingProducts,
    productsError,
    fetchProductsList,
  } = useCoupons();
  const [showForm, setShowForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    fetchCoupons();
    fetchProductsList();
  }, [fetchCoupons, fetchProductsList]);

  const stats = useMemo(() => {
    const total = coupons.length;
    const globalCount = coupons.filter((coupon) => coupon.category === "global").length;
    const productCount = total - globalCount;
    return [
      { label: "Total Coupons", value: total },
      { label: "Global Coupons", value: globalCount },
      { label: "Product Coupons", value: productCount },
      {
        label: "Active Coupons",
        value: coupons.filter((coupon) => coupon.isActive).length,
      },
    ];
  }, [coupons]);

  const handleCreateClick = () => {
    setEditingCoupon(null);
    setShowForm(true);
  };

  const handleEditCoupon = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setShowForm(true);
  };

  const handleDeleteCoupon = async (couponId: string) => {
    const confirmed = confirm("Are you sure you want to delete this coupon?");
    if (!confirmed) return;
    const success = await deleteCoupon(couponId);
    if (success) {
      toast.success("Coupon deleted successfully");
    } else {
      toast.error("Failed to delete coupon");
    }
  };

  const handleFormSubmit = async (payload: CouponPayload) => {
    let response;
    if (editingCoupon?._id) {
      response = await updateCoupon(editingCoupon._id, payload);
      if (response) {
        toast.success("Coupon updated successfully");
      } else {
        toast.error("Failed to update coupon");
      }
    } else {
      response = await createCoupon(payload);
      if (response) {
        toast.success("Coupon created successfully");
      } else {
        toast.error("Failed to create coupon");
      }
    }

    if (response) {
      setShowForm(false);
      setEditingCoupon(null);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCoupon(null);
  };

  return (
    <div className="max-w-7xl mx-auto w-full space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
      >
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            <FaTicketAlt className="text-base" />
            Promotions
          </p>
          <h1 className="mt-2 text-4xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-700 bg-clip-text text-transparent">
            Coupons Management
          </h1>
          <p className="mt-2 text-sm text-zinc-600 max-w-2xl">
            Create global coupons or product-specific campaigns. Global coupons default to 2 uses per
            user and a total of 50 redemptions to keep promotions under control.
          </p>
        </div>
        <motion.button
          onClick={handleCreateClick}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-black to-zinc-800 text-white rounded-lg cursor-pointer outline-none shadow-lg hover:shadow-xl transition-all w-full lg:w-auto justify-center font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Create coupon"
        >
          <FaPlus />
          New Coupon
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-zinc-200 bg-white/90 px-5 py-4 shadow-sm"
          >
            <p className="text-xs uppercase text-zinc-500 tracking-widest">{stat.label}</p>
            <p className="text-3xl font-bold text-zinc-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </motion.div>

      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="relative">
            <div className="animate-spin rounded-full h-14 w-14 border-4 border-zinc-200 border-t-black" />
            <div className="absolute inset-0 animate-ping rounded-full h-14 w-14 border-4 border-black/10" />
          </div>
        </div>
      ) : (
        <CouponList coupons={coupons} onEdit={handleEditCoupon} onDelete={handleDeleteCoupon} />
      )}

      {showForm && (
        <CouponForm
          coupon={editingCoupon}
          onSubmit={handleFormSubmit}
          onCancel={handleCancelForm}
          products={products}
          isLoadingProducts={isLoadingProducts}
          productError={productsError}
          onRefreshProducts={fetchProductsList}
        />
      )}
    </div>
  );
}

export default Coupons;


