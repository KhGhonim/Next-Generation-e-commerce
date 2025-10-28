import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaEdit, FaTrash, FaUser, FaEnvelope, FaPhone, FaUserShield, FaUserCheck, FaUserSlash } from "react-icons/fa";
import { DashboardUser } from "./types";
import UserForm from "./Components/UserForm";
import DeleteConfirmModal from "./Components/DeleteConfirmModal.tsx";

const API_URL = import.meta.env.VITE_APP_API_URL;

function Users() {
  const [users, setUsers] = useState<DashboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<DashboardUser | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; user: DashboardUser | null }>({
    isOpen: false,
    user: null,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/users`, {
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        setUsers(result.data);
      } else {
        toast.error(result.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Fetch users error:", error);
      toast.error("An error occurred while fetching users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditUser = (user: DashboardUser) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDeleteClick = (user: DashboardUser) => {
    setDeleteModal({ isOpen: true, user });
  };

  const handleDeleteUser = async () => {
    if (!deleteModal.user?._id) return;

    try {
      const response = await fetch(`${API_URL}/api/users/${deleteModal.user._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("User deleted successfully");
        setDeleteModal({ isOpen: false, user: null });
        fetchUsers();
      } else {
        toast.error(result.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Delete user error:", error);
      toast.error("An error occurred while deleting user");
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingUser(null);
    fetchUsers();
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  const getUserInitials = (user: DashboardUser) => {
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-700 bg-clip-text text-transparent mb-2">
          Users Management
        </h1>
        <p className="text-sm text-zinc-600">Manage user accounts and permissions</p>
      </motion.div>

      {showForm && editingUser && (
        <UserForm
          user={editingUser}
          onSubmit={handleFormSubmit}
          onCancel={handleCancelForm}
        />
      )}

      {deleteModal.isOpen && deleteModal.user && (
        <DeleteConfirmModal
          title="Delete User"
          message={`Are you sure you want to delete ${deleteModal.user.firstName} ${deleteModal.user.lastName}? This action cannot be undone.`}
          onConfirm={handleDeleteUser}
          onCancel={() => setDeleteModal({ isOpen: false, user: null })}
        />
      )}

      {/* Users Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-zinc-200 border-t-black"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-black/20"></div>
          </div>
        </div>
      ) : users.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-white to-zinc-50 rounded-2xl border border-zinc-200"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-full flex items-center justify-center mb-6">
            <FaUser className="text-4xl text-zinc-400" />
          </div>
          <h3 className="text-2xl font-bold text-zinc-900 mb-2">No users found</h3>
          <p className="text-zinc-600">User accounts will appear here</p>
        </motion.div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-zinc-200">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-zinc-50 to-zinc-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-zinc-700">User</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-zinc-700">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-zinc-700">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-zinc-700">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-zinc-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-zinc-700">Joined</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-zinc-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {users.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gradient-to-r hover:from-zinc-50 hover:to-white transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                          <span className="text-white font-semibold text-sm">{getUserInitials(user)}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-zinc-900">{user.firstName} {user.lastName}</p>
                          {user.isEmailVerified && (
                            <span className="text-xs text-green-600 flex items-center gap-1">
                              <FaUserCheck className="text-xs" /> Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-700">{user.email}</td>
                    <td className="px-6 py-4 text-zinc-700">{user.phone || "N/A"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700 border border-purple-200"
                          : "bg-blue-100 text-blue-700 border border-blue-200"
                      }`}>
                        {user.role === "admin" ? (
                          <span className="flex items-center gap-1">
                            <FaUserShield className="inline" /> Admin
                          </span>
                        ) : (
                          "User"
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.isActive
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-red-100 text-red-700 border border-red-200"
                      }`}>
                        {user.isActive ? (
                          <span className="flex items-center gap-1">
                            <FaUserCheck className="inline" /> Active
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <FaUserSlash className="inline" /> Inactive
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-zinc-700 text-sm">{formatDate(user.createdAt)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <motion.button
                          onClick={() => handleEditUser(user)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer outline-none"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label={`Edit ${user.firstName} ${user.lastName}`}
                        >
                          <FaEdit />
                        </motion.button>
                        <motion.button
                          onClick={() => handleDeleteClick(user)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer outline-none"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label={`Delete ${user.firstName} ${user.lastName}`}
                        >
                          <FaTrash />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden divide-y divide-zinc-200">
            {users.map((user, index) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                className="p-4 hover:bg-zinc-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                      <span className="text-white font-semibold">{getUserInitials(user)}</span>
                    </div>
                    <div>
                      <p className="font-bold text-zinc-900">{user.firstName} {user.lastName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}>
                          {user.role === "admin" ? "Admin" : "User"}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => handleEditUser(user)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaEdit />
                    </motion.button>
                    <motion.button
                      onClick={() => handleDeleteClick(user)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTrash />
                    </motion.button>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-zinc-600">
                    <FaEnvelope className="text-blue-500" />
                    <span>{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-2 text-zinc-600">
                      <FaPhone className="text-green-500" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                  <div className="text-zinc-500 text-xs">
                    Joined: {formatDate(user.createdAt)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;

