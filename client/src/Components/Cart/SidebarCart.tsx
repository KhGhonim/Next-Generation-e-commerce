import { AnimatePresence, motion } from "framer-motion";
import { FaTimes, FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { removeFromCartAsync, updateQuantityAsync } from "../../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../../store/slices/cartSlice";
import toast from "react-hot-toast";

interface SidebarCartProps {
  isOpen: boolean;
  onClose: () => void;
}

function SidebarCart({ isOpen, onClose }: SidebarCartProps) {
  const { items, totalItems, totalPrice } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = async (item: CartItem, newQuantity: number) => {
    if (newQuantity <= 0) {
      await handleRemoveItem(item.cartItemId);
    } else {
      try {
        await dispatch(updateQuantityAsync({ cartItemId: item.cartItemId, quantity: newQuantity })).unwrap();
      } catch (error) {
        const errorMessage =
          typeof error === "string"
            ? error
            : error instanceof Error
            ? error.message
            : "Failed to update quantity";
        toast.error(errorMessage);
      }
    }
  };

  const handleRemoveItem = async (cartItemId: string) => {
    try {
      await dispatch(removeFromCartAsync(cartItemId)).unwrap();
      toast.success("Item removed from cart");
    } catch (error) {
      const errorMessage =
        typeof error === "string"
          ? error
          : error instanceof Error
          ? error.message
          : "Failed to remove item";
      toast.error(errorMessage);
    }
  };

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    onClose();
    navigate("/shop");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 stick-bold">
                Shopping Cart ({totalItems})
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                aria-label="Close cart"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg
                      className="w-16 h-16 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 stick-bold mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 stick-regular">
                    Add some items to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.cartItemId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 stick-bold truncate">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500 stick-regular">
                          ${item.price.toFixed(2)}
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

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleQuantityChange(item, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors border border-gray-200 hover:border-gray-300"
                          aria-label="Decrease quantity"
                        >
                          <FaMinus size={14} className="text-gray-600" />
                        </button>
                        <span className="text-sm font-medium text-gray-900 stick-bold min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors border border-gray-200 hover:border-gray-300"
                          aria-label="Increase quantity"
                        >
                          <FaPlus size={14} className="text-gray-600" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.cartItemId)}
                        className="p-2 hover:bg-red-50 text-red-500 hover:text-red-700 rounded cursor-pointer transition-colors"
                        aria-label="Remove item"
                      >
                        <FaTrash size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4">
                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900 stick-bold">
                    Total:
                  </span>
                  <span className="text-lg font-bold text-gray-900 stick-bold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.button
                    onClick={handleCheckout}
                    className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium stick-bold hover:bg-gray-800 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Proceed to checkout"
                  >
                    Checkout
                  </motion.button>
                  <motion.button
                    onClick={handleContinueShopping}
                    className="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-lg font-medium stick-bold hover:bg-gray-200 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Continue shopping"
                  >
                    Continue Shopping
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default SidebarCart;
