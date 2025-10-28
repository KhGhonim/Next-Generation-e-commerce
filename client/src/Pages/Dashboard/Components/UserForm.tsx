import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import { DashboardUser } from "../types";

interface UserFormProps {
  user: DashboardUser;
  onSubmit: () => void;
  onCancel: () => void;
}

const API_URL = import.meta.env.VITE_APP_API_URL;

function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phone: user.phone || "",
    role: user.role || "user",
    isActive: user.isActive !== undefined ? user.isActive : true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("User updated successfully");
        onSubmit();
      } else {
        toast.error(result.message || "Failed to update user");
      }
    } catch (error) {
      console.error("Update user error:", error);
      toast.error("An error occurred while updating user");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto border border-zinc-200"
        >
          <div className="sticky top-0 bg-gradient-to-r from-zinc-50 to-white border-b border-zinc-200 px-6 py-5 flex justify-between items-center backdrop-blur-sm z-10">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-700 bg-clip-text text-transparent">
                Edit User
              </h2>
              <p className="text-sm text-zinc-600 mt-1">
                Update user information and permissions
              </p>
            </div>
            <motion.button
              onClick={onCancel}
              className="p-2 hover:bg-zinc-100 rounded-xl cursor-pointer outline-none transition-colors"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close form"
            >
              <FaTimes className="text-zinc-600 text-lg" />
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-gradient-to-br from-white to-zinc-50/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-2">
                  Role *
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl outline-none focus:ring-2 focus:ring-black focus:border-transparent cursor-pointer transition-all bg-white"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex items-center gap-4 pt-8">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="w-4 h-4 text-black border-zinc-300 rounded focus:ring-black cursor-pointer"
                  />
                  <span className="text-sm font-semibold text-zinc-900">Active Account</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-zinc-200 bg-white/50 -mx-6 px-6 pb-6">
              <motion.button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border-2 border-zinc-300 text-zinc-700 rounded-xl cursor-pointer outline-none hover:bg-zinc-50 hover:border-zinc-400 transition-all font-semibold"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Cancel"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-black to-zinc-800 text-white rounded-xl cursor-pointer outline-none shadow-lg hover:shadow-xl transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Update user"
              >
                {isSubmitting ? "Updating..." : "Update User"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default UserForm;

