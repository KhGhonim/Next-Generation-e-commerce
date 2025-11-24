import { motion } from "framer-motion";
import { Coupon } from "../../types";

interface CouponListProps {
  coupons: Coupon[];
  onEdit: (coupon: Coupon) => void;
  onDelete: (couponId: string) => void;
}

const formatDiscount = (coupon: Coupon) =>
  coupon.discountType === "percentage"
    ? `${coupon.discountValue}%`
    : `$${coupon.discountValue.toFixed(2)}`;

function CouponList({ coupons, onEdit, onDelete }: CouponListProps) {
  if (coupons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-br from-white to-zinc-50 rounded-2xl border border-dashed border-zinc-200">
        <p className="text-lg font-semibold text-zinc-700 mb-2">No coupons yet</p>
        <p className="text-sm text-zinc-500">Create your first coupon to get started.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 shadow-sm bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-zinc-50 text-xs uppercase tracking-wider text-zinc-500">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Code</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Discount</th>
              <th className="px-6 py-4">Usage</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-sm">
            {coupons.map((coupon) => (
              <tr key={coupon._id || coupon.code} className="hover:bg-zinc-50">
                <td className="px-6 py-4">
                  <div className="font-semibold text-zinc-900">{coupon.name}</div>
                  <div className="text-xs text-zinc-500">
                    {coupon.isActive ? "Active" : "Inactive"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-lg bg-zinc-100 text-zinc-700 font-semibold tracking-widest text-xs">
                    {coupon.code}
                  </span>
                </td>
                <td className="px-6 py-4 capitalize text-zinc-700">{coupon.category}</td>
                <td className="px-6 py-4 text-zinc-800">{formatDiscount(coupon)}</td>
                <td className="px-6 py-4 text-zinc-700">
                  <div className="text-sm">
                    Per user: <span className="font-semibold">{coupon.userLimit}</span>
                  </div>
                  <div className="text-xs text-zinc-500">
                    Global limit: {coupon.globalLimit}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-3">
                    <motion.button
                      type="button"
                      onClick={() => onEdit(coupon)}
                      className="px-4 py-2 border border-zinc-300 text-zinc-700 rounded-lg cursor-pointer outline-none bg-white hover:bg-zinc-50 transition-all text-sm font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Edit coupon ${coupon.name}`}
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => coupon._id && onDelete(coupon._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer outline-none shadow hover:bg-red-600 transition-all text-sm font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Delete coupon ${coupon.name}`}
                    >
                      Delete
                    </motion.button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CouponList;


