import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
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
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { PaymentMethod } from "../../Types/ProjectTypes";

type TabType = 'profile' | 'billing' | 'payment';

function Profile() {
  const { user, isLoading, logout, checkAuth, updateProfile, updateBillingAddress, addPaymentMethod, updatePaymentMethod, deletePaymentMethod } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingBilling, setIsEditingBilling] = useState(false);
  const [isAddingPayment, setIsAddingPayment] = useState(false);
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
  const [billingData, setBillingData] = useState({
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cardHolderName: '',
    isDefault: false,
  });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user && !isEditing && !isEditingBilling) {
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
      setBillingData({
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        zipCode: user.zipCode || '',
        country: user.country || '',
      });
    }
  }, [user, isEditing, isEditingBilling]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
    await logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleSave = async () => {
    const result = await updateProfile({
      firstName: editData.firstName,
      lastName: editData.lastName,
      email: editData.email,
      phone: editData.phone,
    });
    if (result) {
      setIsEditing(false);
      // Force refresh form data with updated user data
      setEditData({
        firstName: result.firstName || '',
        lastName: result.lastName || '',
        email: result.email || '',
        phone: result.phone || '',
        address: result.address || '',
        city: result.city || '',
        zipCode: result.zipCode || '',
        country: result.country || '',
      });
    }
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

  const handleSaveBilling = async () => {
    const result = await updateBillingAddress(billingData);
    if (result) {
      setIsEditingBilling(false);
      // Force refresh form data with updated user data
      setBillingData({
        phone: result.phone || '',
        address: result.address || '',
        city: result.city || '',
        zipCode: result.zipCode || '',
        country: result.country || '',
      });
      // Also update editData with billing information
      setEditData(prev => ({
        ...prev,
        phone: result.phone || prev.phone,
        address: result.address || prev.address,
        city: result.city || prev.city,
        zipCode: result.zipCode || prev.zipCode,
        country: result.country || prev.country,
      }));
    }
  };

  const handleCancelBilling = () => {
    if (user) {
      setBillingData({
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        zipCode: user.zipCode || '',
        country: user.country || '',
      });
    }
    setIsEditingBilling(false);
  };

  const handleAddPayment = async () => {
    if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cardHolderName) {
      toast.error("Please fill in all payment method fields");
      return;
    }
    
    const result = await addPaymentMethod(paymentData);
    if (result) {
      setPaymentData({
        cardNumber: '',
        expiryDate: '',
        cardHolderName: '',
        isDefault: false,
      });
      setIsAddingPayment(false);
    }
  };

  const handleCancelPayment = () => {
    setPaymentData({
      cardNumber: '',
      expiryDate: '',
      cardHolderName: '',
      isDefault: false,
    });
    setIsAddingPayment(false);
  };

  const handleDeletePayment = async (methodId: string) => {
    if (window.confirm("Are you sure you want to delete this payment method?")) {
      await deletePaymentMethod(methodId);
    }
  };

  const handleSetDefaultPayment = async (methodId: string) => {
    await updatePaymentMethod(methodId, { isDefault: true });
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

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
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
          className="mb-6 lg:mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-0">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 stick-bold">Account Settings</h1>
              <p className="text-gray-600 stick-regular mt-1 lg:mt-2 text-sm lg:text-base">Manage your account information and preferences</p>
              </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 lg:gap-4">
              <div className="flex items-center space-x-2 lg:space-x-3 bg-white px-3 lg:px-4 py-2 rounded-lg shadow-sm">
                <FaShieldAlt className="text-green-500 text-sm lg:text-base" />
                <span className="text-xs lg:text-sm text-gray-600 stick-regular">Account Secure</span>
              </div>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="bg-red-600 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-red-700 transition-colors stick-regular disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 cursor-pointer w-full sm:w-auto justify-center"
                aria-label="Logout from account"
              >
                {isLoggingOut ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <FaSignOutAlt className="text-sm lg:text-base" />
                    <span className="text-sm lg:text-base">Logout</span>
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
                      {!isEditingBilling ? (
                        <button
                          onClick={() => setIsEditingBilling(true)}
                          className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                        >
                          <FaEdit />
                          <span className="stick-regular">Edit</span>
                        </button>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={handleSaveBilling}
                            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
                          >
                            <FaSave />
                            <span className="stick-regular">Save</span>
                          </button>
                          <button
                            onClick={handleCancelBilling}
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
                          Phone Number
                        </label>
                        {isEditingBilling ? (
                          <input
                            type="tel"
                            value={billingData.phone}
                            onChange={(e) => setBillingData({ ...billingData, phone: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black stick-regular"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 py-2">
                            <FaPhone className="h-4 w-4 text-gray-400" />
                            <p className="text-gray-900 stick-regular">{user.phone || 'Not provided'}</p>
                          </div>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                          Street Address
                        </label>
                        {isEditingBilling ? (
                          <input
                            type="text"
                            value={billingData.address}
                            onChange={(e) => setBillingData({ ...billingData, address: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black stick-regular"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 py-2">
                            <FaMapMarkerAlt className="h-4 w-4 text-gray-400" />
                            <p className="text-gray-900 stick-regular">{user.address || 'Not provided'}</p>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                          City
                        </label>
                        {isEditingBilling ? (
                          <input
                            type="text"
                            value={billingData.city}
                            onChange={(e) => setBillingData({ ...billingData, city: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black stick-regular"
                          />
                        ) : (
                          <p className="text-gray-900 stick-regular py-2">{user.city || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                          ZIP Code
                        </label>
                        {isEditingBilling ? (
                          <input
                            type="text"
                            value={billingData.zipCode}
                            onChange={(e) => setBillingData({ ...billingData, zipCode: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black stick-regular"
                          />
                        ) : (
                          <p className="text-gray-900 stick-regular py-2">{user.zipCode || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                          Country
                        </label>
                        {isEditingBilling ? (
                          <input
                            type="text"
                            value={billingData.country}
                            onChange={(e) => setBillingData({ ...billingData, country: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black stick-regular"
                          />
                        ) : (
                          <p className="text-gray-900 stick-regular py-2">{user.country || 'Not provided'}</p>
                        )}
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
                      {!isAddingPayment ? (
                <button
                          onClick={() => setIsAddingPayment(true)}
                          className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                        >
                          <FaCreditCard />
                          <span className="stick-regular">Add Card</span>
                        </button>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={handleAddPayment}
                            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
                          >
                            <FaSave />
                            <span className="stick-regular">Save</span>
                          </button>
                          <button
                            onClick={handleCancelPayment}
                            className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                          >
                            <FaTimes />
                            <span className="stick-regular">Cancel</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      {/* Add Payment Method Form */}
                      {isAddingPayment && (
                        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                          <h3 className="text-lg font-semibold text-gray-900 stick-bold mb-4">Add New Payment Method</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                                Card Number
                              </label>
                              <input
                                type="text"
                                value={paymentData.cardNumber}
                                onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                                placeholder="1234 5678 9012 3456"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black stick-regular"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                value={paymentData.expiryDate}
                                onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                                placeholder="MM/YY"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black stick-regular"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                                Card Holder Name
                              </label>
                              <input
                                type="text"
                                value={paymentData.cardHolderName}
                                onChange={(e) => setPaymentData({ ...paymentData, cardHolderName: e.target.value })}
                                placeholder="John Doe"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black stick-regular"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={paymentData.isDefault}
                                  onChange={(e) => setPaymentData({ ...paymentData, isDefault: e.target.checked })}
                                  className="rounded border-gray-300"
                                />
                                <span className="text-sm text-gray-700 stick-regular">Set as default payment method</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Existing Payment Methods */}
                      {user?.paymentMethods && user.paymentMethods.length > 0 ? (
                        user.paymentMethods.map((method: PaymentMethod, index: number) => (
                          <div key={method._id || index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="bg-blue-100 p-2 rounded-lg">
                                  <FaCreditCard className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900 stick-bold">
                                    •••• •••• •••• {method.cardNumber.slice(-4)}
                                  </p>
                                  <p className="text-sm text-gray-500 stick-regular">
                                    Expires {method.expiryDate} • {method.cardHolderName}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {method.isDefault && (
                                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full stick-regular">
                                    Default
                                  </span>
                                )}
                                {!method.isDefault && (
                                  <button
                                    onClick={() => handleSetDefaultPayment(method._id)}
                                    className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 rounded-full border border-blue-600 hover:bg-blue-50 transition-colors stick-regular cursor-pointer"
                                  >
                                    Set Default
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeletePayment(method._id)}
                                  className="text-red-400 hover:text-red-600 cursor-pointer"
                                >
                                  <FaTimes />
                </button>
              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <div className="text-gray-400 mb-4">
                            <FaCreditCard className="h-12 w-12 mx-auto" />
                          </div>
                          <p className="text-gray-500 stick-regular">No payment methods added yet</p>
                          <p className="text-sm text-gray-400 stick-regular">Add a payment method to make purchases</p>
                        </div>
                      )}
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