import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Coupon, Product } from "../../types";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

interface CouponFormProps {
  coupon: Coupon | null;
  onSubmit: (data: Omit<Coupon, "_id">) => Promise<void> | void;
  onCancel: () => void;
  products: Product[];
  isLoadingProducts: boolean;
  productError: string | null;
  onRefreshProducts: () => Promise<void>;
}

const DEFAULT_GLOBAL_USER_LIMIT = 2;
const DEFAULT_GLOBAL_LIMIT = 50;

const defaultCoupon: Omit<Coupon, "_id"> = {
  name: "",
  code: "",
  description: "",
  discountType: "percentage",
  discountValue: 10,
  category: "global",
  productId: "",
  userLimit: DEFAULT_GLOBAL_USER_LIMIT,
  globalLimit: DEFAULT_GLOBAL_LIMIT,
  minimumOrderValue: 0,
  startsAt: "",
  expiresAt: "",
  isActive: true,
};

function CouponForm({
  coupon,
  onSubmit,
  onCancel,
  products,
  isLoadingProducts,
  productError,
  onRefreshProducts,
}: CouponFormProps) {
  const [formData, setFormData] = useState<Omit<Coupon, "_id">>(defaultCoupon);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (coupon) {
      setFormData({
        name: coupon.name,
        code: coupon.code,
        description: coupon.description || "",
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        category: coupon.category,
        productId: coupon.productId || "",
        userLimit: coupon.userLimit,
        globalLimit: coupon.globalLimit,
        minimumOrderValue: coupon.minimumOrderValue || 0,
        startsAt: coupon.startsAt || "",
        expiresAt: coupon.expiresAt || "",
        isActive: coupon.isActive,
      });
    } else {
      setFormData(defaultCoupon);
    }
  }, [coupon]);

  const isGlobalCoupon = useMemo(() => formData.category === "global", [formData.category]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;
    if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else if (type === "checkbox") {
      const checked = (event.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCategoryChange = (value: "global" | "product") => {
    setFormData((prev) => ({
      ...prev,
      category: value,
      userLimit: value === "global" ? DEFAULT_GLOBAL_USER_LIMIT : prev.userLimit || 1,
      globalLimit: value === "global" ? DEFAULT_GLOBAL_LIMIT : prev.globalLimit || 10,
      productId: value === "global" ? "" : prev.productId,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formData.category === "product" && !formData.productId) {
      toast.error("Select a product for this coupon");
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 py-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden max-h-[90vh] flex flex-col my-auto"
        >
          <div className="px-6 py-5 border-b border-zinc-200 bg-gradient-to-r from-zinc-50 to-white flex items-center justify-between flex-shrink-0">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900">
                {coupon ? "Edit Coupon" : "Create Coupon"}
              </h2>
              <p className="text-sm text-zinc-500">
                Set the rules and availability for this coupon
              </p>
            </div>
            <motion.button
              onClick={onCancel}
              className="px-4 py-2 border border-zinc-300 rounded-lg cursor-pointer outline-none text-zinc-700 bg-white hover:bg-zinc-50 transition-all font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Close coupon form"
            >
              Close
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white overflow-y-auto flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-zinc-800 mb-2">
                  Coupon Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all bg-white"
                  placeholder="Summer Sale"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-800 mb-2">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all bg-white uppercase tracking-widest"
                  placeholder="SUMMER50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all bg-white"
                placeholder="Describe the coupon usage and any important notes"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-zinc-800 mb-2">
                  Discount Type
                </label>
                <select
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all bg-white cursor-pointer"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-800 mb-2">
                  Discount Value *
                </label>
                <input
                  type="number"
                  name="discountValue"
                  min={0}
                  value={formData.discountValue}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-800 mb-2">
                  Coupon Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={(event) => handleCategoryChange(event.target.value as "global" | "product")}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all bg-white cursor-pointer"
                >
                  <option value="global">Global Coupon</option>
                  <option value="product">Product Specific</option>
                </select>
              </div>
            </div>

            {formData.category === "product" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-semibold text-zinc-800">
                    Select Product *
                  </label>
                  <Link
                    to="/dashboard/products"
                    className="text-xs text-zinc-600 hover:text-black underline"
                  >
                    Manage products
                  </Link>
                </div>
                {isLoadingProducts ? (
                  <div className="h-12 rounded-xl bg-zinc-100 animate-pulse" />
                ) : productError ? (
                  <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <span>{productError}</span>
                    <button
                      type="button"
                      onClick={onRefreshProducts}
                      className="underline cursor-pointer text-red-800"
                    >
                      Retry
                    </button>
                  </div>
                ) : products.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-zinc-300 px-4 py-3 text-sm text-zinc-500">
                    No products available. Please add products before creating a product-specific coupon.
                  </div>
                ) : (
                  <select
                    name="productId"
                    value={formData.productId || ""}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all bg-white cursor-pointer"
                  >
                    <option value="">Select product...</option>
                    {products.map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.name} (${product.price.toFixed(2)})
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-zinc-800 mb-2">
                  Usage per User
                </label>
                <input
                  type="number"
                  name="userLimit"
                  min={1}
                  value={formData.userLimit}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all bg-white"
                />
                {isGlobalCoupon && (
                  <p className="text-xs text-zinc-500 mt-1">
                    Global coupons default to {DEFAULT_GLOBAL_USER_LIMIT} uses per user
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-800 mb-2">
                  Global Limit
                </label>
                <input
                  type="number"
                  name="globalLimit"
                  min={1}
                  value={formData.globalLimit}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all bg-white"
                />
                {isGlobalCoupon && (
                  <p className="text-xs text-zinc-500 mt-1">
                    Defaults to {DEFAULT_GLOBAL_LIMIT} redemptions in total
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-800 mb-2">
                  Minimum Order Value
                </label>
                <input
                  type="number"
                  name="minimumOrderValue"
                  min={0}
                  value={formData.minimumOrderValue}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-zinc-800 mb-2">
                  Starts At
                </label>
                <input
                  type="date"
                  name="startsAt"
                  value={formData.startsAt || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-800 mb-2">
                  Expires At
                </label>
                <input
                  type="date"
                  name="expiresAt"
                  value={formData.expiresAt || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all bg-white"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-zinc-800">
                  Coupon Active
                </label>
                <motion.button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, isActive: !prev.isActive }))
                  }
                  className={`px-5 py-2 rounded-lg cursor-pointer outline-none text-sm font-semibold border transition-all ${
                    formData.isActive
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-zinc-100 text-zinc-600 border-zinc-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Toggle coupon status"
                >
                  {formData.isActive ? "Active" : "Inactive"}
                </motion.button>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-zinc-200">
              <motion.button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border border-zinc-300 text-zinc-700 rounded-lg cursor-pointer outline-none bg-white hover:bg-zinc-50 transition-all font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Cancel coupon form"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-black to-zinc-800 text-white rounded-lg cursor-pointer outline-none shadow-lg hover:shadow-xl transition-all font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Save coupon"
              >
                {isSubmitting ? "Saving..." : coupon ? "Save Changes" : "Create Coupon"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default CouponForm;


