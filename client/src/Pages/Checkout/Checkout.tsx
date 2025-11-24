import { motion } from "framer-motion";
import { useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { FaCreditCard, FaLock, FaArrowLeft, FaTicketAlt } from "react-icons/fa";
import { useCheckout } from "../../hooks/useCheckout";

function Checkout() {
  const { items, totalItems, totalPrice } = useAppSelector(
    (state) => state.cart
  );
  const navigate = useNavigate();

  const {
    formData,
    isProcessing,
    couponCode,
    couponDiscount,
    isValidatingCoupon,
    appliedCoupon,
    finalTotal,
    handleInputChange,
    handleSubmit,
    handleApplyCoupon,
    handleRemoveCoupon,
    setCouponCode,
  } = useCheckout();

  if (items.length === 0) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-zinc-50 pt-24 lg:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate("/shop")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 stick-regular"
          >
            <FaArrowLeft className="mr-2" />
            Back to Shop
          </button>
          <h1 className="text-3xl font-bold text-gray-900 stick-bold">
            Checkout
          </h1>
          <p className="text-gray-600 stick-regular mt-2">
            Complete your order securely
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 stick-bold mb-4">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black stick-regular"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black stick-regular"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black stick-regular"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black stick-regular"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 stick-bold mb-4">
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black stick-regular"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black stick-regular"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black stick-regular"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                        Country *
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black stick-regular"
                      >
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                        <option value="IT">Italy</option>
                        <option value="ES">Spain</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 stick-bold mb-4">
                  Payment Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                      Card Number *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black stick-regular"
                      />
                      <FaCreditCard className="absolute right-3 top-3 text-gray-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black stick-regular"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black stick-regular"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 stick-regular mb-2">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black stick-regular"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium stick-bold hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                whileTap={{ scale: isProcessing ? 1 : 0.98 }}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaLock className="mr-2" />
                    Complete Order - ${finalTotal.toFixed(2)}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6 h-fit"
          >
            <h2 className="text-xl font-semibold text-gray-900 stick-bold mb-6">
              Order Summary
            </h2>

            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex items-center space-x-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 stick-bold">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500 stick-regular">
                      Quantity: {item.quantity}
                    </p>
                    {item.size && (
                      <p className="text-xs text-gray-400 stick-regular">
                        Size: {item.size}
                      </p>
                    )}
                    {item.color && (
                      <p className="text-xs text-gray-400 stick-regular">
                        Color: {item.color}
                      </p>
                    )}
                  </div>
                  <div className="text-sm font-medium text-gray-900 stick-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm stick-regular">
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm stick-regular">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-sm stick-regular">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-sm stick-regular text-green-600">
                  <span>{appliedCoupon.code} Discount</span>
                  <span>- ${couponDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-semibold stick-bold border-t border-gray-200 pt-2">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Coupon Section */}
            <div className="mt-6 border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center gap-2 mb-3">
                <FaTicketAlt className="text-gray-700" />
                <p className="text-sm font-semibold text-gray-800 stick-bold">
                  Apply Coupon
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="ENTER CODE"
                  disabled={!!appliedCoupon}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black uppercase tracking-widest text-sm stick-regular disabled:bg-gray-100"
                />
                {appliedCoupon ? (
                  <motion.button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="px-5 py-3 border border-gray-300 text-gray-700 rounded-lg cursor-pointer outline-none bg-white hover:bg-gray-100 font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Remove coupon"
                  >
                    Remove
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={isValidatingCoupon}
                    className="px-5 py-3 bg-black text-white rounded-lg cursor-pointer outline-none shadow hover:bg-gray-900 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                    whileHover={{ scale: isValidatingCoupon ? 1 : 1.02 }}
                    whileTap={{ scale: isValidatingCoupon ? 1 : 0.98 }}
                    aria-label="Apply coupon"
                  >
                    {isValidatingCoupon ? "Validating..." : "Apply"}
                  </motion.button>
                )}
              </div>
              {appliedCoupon && (
                <p className="mt-3 text-xs text-green-700 stick-regular">
                  {appliedCoupon.description || "Coupon applied successfully."}
                </p>
              )}
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <FaLock className="text-green-600 mr-2" />
                <p className="text-sm text-green-800 stick-regular">
                  Your payment information is secure and encrypted
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
