import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { SalesTeamMember } from "./types";
import SalesTeamForm from "./Components/SalesTeamForm";

const API_URL = import.meta.env.VITE_APP_API_URL;

function SalesTeam() {
  const [members, setMembers] = useState<SalesTeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<SalesTeamMember | null>(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/sales-team`, {
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        setMembers(result.data);
      } else {
        toast.error(result.message || "Failed to fetch sales team");
      }
    } catch (error) {
      console.error("Fetch members error:", error);
      toast.error("An error occurred while fetching sales team");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateMember = () => {
    setEditingMember(null);
    setShowForm(true);
  };

  const handleEditMember = (member: SalesTeamMember) => {
    setEditingMember(member);
    setShowForm(true);
  };

  const handleDeleteMember = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/sales-team/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Team member deleted successfully");
        fetchMembers();
      } else {
        toast.error(result.message || "Failed to delete team member");
      }
    } catch (error) {
      console.error("Delete member error:", error);
      toast.error("An error occurred while deleting team member");
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingMember(null);
    fetchMembers();
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingMember(null);
  };

  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-700 bg-clip-text text-transparent mb-2">
            Sales Team
          </h1>
          <p className="text-sm text-zinc-600">Manage your sales team members</p>
        </div>
        <motion.button
          onClick={handleCreateMember}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-black to-zinc-800 text-white rounded-xl cursor-pointer outline-none shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Add new team member"
        >
          <FaPlus className="text-lg" />
          <span className="font-semibold">Add Member</span>
        </motion.button>
      </motion.div>

        {showForm && (
          <SalesTeamForm
            member={editingMember}
            onSubmit={handleFormSubmit}
            onCancel={handleCancelForm}
          />
        )}

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-zinc-200 border-t-black"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-black/20"></div>
          </div>
        </div>
      ) : members.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-white to-zinc-50 rounded-2xl border border-zinc-200"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-full flex items-center justify-center mb-6">
            <FaUser className="text-4xl text-zinc-400" />
          </div>
          <h3 className="text-2xl font-bold text-zinc-900 mb-2">No team members found</h3>
          <p className="text-zinc-600 mb-6">Get started by adding your first team member</p>
          <motion.button
            onClick={handleCreateMember}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-black to-zinc-800 text-white rounded-xl cursor-pointer outline-none shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus />
            <span className="font-semibold">Add Member</span>
          </motion.button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member, index) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl shadow-sm p-6 border border-zinc-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <FaUser className="text-2xl text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 text-lg">{member.name}</h3>
                    <p className="text-sm text-zinc-600 font-medium">{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={() => handleEditMember(member)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl cursor-pointer outline-none transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Edit ${member.name}`}
                  >
                    <FaEdit />
                  </motion.button>
                  <motion.button
                    onClick={() => member._id && handleDeleteMember(member._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-xl cursor-pointer outline-none transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Delete ${member.name}`}
                  >
                    <FaTrash />
                  </motion.button>
                </div>
              </div>
              <div className="space-y-3 text-sm mb-4">
                <div className="flex items-center gap-2 text-zinc-600">
                  <FaEnvelope className="text-blue-500" />
                  <span className="font-medium">{member.email}</span>
                </div>
                {member.phone && (
                  <div className="flex items-center gap-2 text-zinc-600">
                    <FaPhone className="text-green-500" />
                    <span className="font-medium">{member.phone}</span>
                  </div>
                )}
                {member.department && (
                  <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                    {member.department}
                  </div>
                )}
              </div>
              <div className="pt-4 border-t border-zinc-200">
                <p className="text-sm font-semibold text-zinc-700">
                  Sales Target: <span className="text-green-600">${member.salesTarget?.toLocaleString() || "N/A"}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SalesTeam;

