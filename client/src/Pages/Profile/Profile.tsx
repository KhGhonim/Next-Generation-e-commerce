import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaUserAlt, 
  FaEnvelope, 
  FaSignOutAlt, 
  FaEdit, 
  FaSave, 
  FaTimes,
  FaCreditCard,
  FaMapMarkerAlt,
  FaPhone,
  FaCalendarAlt,
  FaShieldAlt,
  FaCog
} from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setUser, clearUser, setLoading } from "../../store/slices/userSlice";
import toast from "react-hot-toast";

type TabType = 'profile' | 'billing' | 'payment';

function Profile() {
  const { user, isLoading, isAuthenticated } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
  });

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(setLoading(true));
      try {
        const response = await fetch("http://localhost:3001/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const result = await response.json();
          dispatch(setUser(result.user));
        } else {
          dispatch(clearUser());
        }
      } catch (error) {
        console.error("Auth check error:", error);
        dispatch(clearUser());
      } finally {
        dispatch(setLoading(false));
      }
    };

    checkAuth();
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setEditData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        zipCode: user.zipCode || '',
        country: user.country || '',
      });
    }
  }, [user]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch("http://localhost:3001/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        dispatch(clearUser());
        toast.success("Logged out successfully!");
        navigate("/login");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred during logout");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the user data
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (user) {
      setEditData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        zipCode: user.zipCode || '',
        country: user.country || '',
      });
    }
    setIsEditing(false);
  };

  const tabs = [
    { id: 'profile' as TabType, label: 'Profile', icon: FaUserAlt },
    { id: 'billing' as TabType, label: 'Billing Address', icon: FaMapMarkerAlt },
    { id: 'payment' as TabType, label: 'Payment Methods', icon: FaCreditCard },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your profile</h2>
          <Link
            to="/login"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label="Go to login page"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 pt-24 lg:pt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 stick-bold">Account Settings</h1>
              <p className="text-gray-600 stick-regular mt-2">Manage your account information and preferences</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-lg shadow-sm">
                <FaShieldAlt className="text-green-500" />
                <span className="text-sm text-gray-600 stick-regular">Account Secure</span>
              </div>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors stick-regular disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 cursor-pointer"
                aria-label="Logout from account"
              >
                {isLoggingOut ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              {/* User Info */}
              <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <FaUserAlt className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 stick-bold">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-gray-600 stick-regular text-sm">{user.email}</p>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-black text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="stick-regular">{tab.label}</span>
                  </button>
                ))}
              </nav>

              {/* Quick Actions */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  to="/shop"
                  className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-900 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors stick-regular cursor-pointer"
                >
                  <FaCog />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === 'profile' && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 stick-bold">Personal Information</h2>
                      {!isEditing ? (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                        >
                          <FaEdit />
                          <span className="stick-regular">Edit</span>
                        </button>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={handleSave}
                            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
                          >
                            <FaSave />
                            <span className="stick-regular">Save</span>
                          </button>
                          <button
                            onClick={handleCancel}
                            className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                          >
                            <FaTimes />
                            <span className="stick-regular">Cancel</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                          First Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editData.firstName}
                            onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black stick-regular"
                          />
                        ) : (
                          <p className="text-gray-900 stick-regular py-2">{user.firstName || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                          Last Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editData.lastName}
                            onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black stick-regular"
                          />
                        ) : (
                          <p className="text-gray-900 stick-regular py-2">{user.lastName || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                          Email Address
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={editData.email}
                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black stick-regular"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 py-2">
                            <FaEnvelope className="h-4 w-4 text-gray-400" />
                            <p className="text-gray-900 stick-regular">{user.email}</p>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={editData.phone}
                            onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black stick-regular"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 py-2">
                            <FaPhone className="h-4 w-4 text-gray-400" />
                            <p className="text-gray-900 stick-regular">{user.phone || 'Not provided'}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex items-center space-x-2 text-sm text-gray-500 stick-regular">
                        <FaCalendarAlt />
                        <span>Member since {new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'billing' && (
                  <motion.div
                    key="billing"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 stick-bold">Billing Address</h2>
                      <button className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                        <FaEdit />
                        <span className="stick-regular">Edit</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                          Street Address
                        </label>
                        <div className="flex items-center space-x-2 py-2">
                          <FaMapMarkerAlt className="h-4 w-4 text-gray-400" />
                          <p className="text-gray-900 stick-regular">{user.address || 'Not provided'}</p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                          City
                        </label>
                        <p className="text-gray-900 stick-regular py-2">{user.city || 'Not provided'}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                          ZIP Code
                        </label>
                        <p className="text-gray-900 stick-regular py-2">{user.zipCode || 'Not provided'}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                          Country
                        </label>
                        <p className="text-gray-900 stick-regular py-2">{user.country || 'Not provided'}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <FaShieldAlt className="text-blue-500" />
                        <p className="text-sm text-blue-800 stick-regular">
                          Your billing information is encrypted and secure
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'payment' && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 stick-bold">Payment Methods</h2>
                      <button className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                        <FaCreditCard />
                        <span className="stick-regular">Add Card</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {/* Sample Payment Method */}
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <FaCreditCard className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 stick-bold">•••• •••• •••• 4242</p>
                              <p className="text-sm text-gray-500 stick-regular">Expires 12/25</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full stick-regular">
                              Default
                            </span>
                            <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                              <FaEdit />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="text-center py-8">
                        <div className="text-gray-400 mb-4">
                          <FaCreditCard className="h-12 w-12 mx-auto" />
                        </div>
                        <p className="text-gray-500 stick-regular">No payment methods added yet</p>
                        <p className="text-sm text-gray-400 stick-regular">Add a payment method to make purchases</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <FaShieldAlt className="text-green-500" />
                        <p className="text-sm text-green-800 stick-regular">
                          All payment information is processed securely and encrypted
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Profile;