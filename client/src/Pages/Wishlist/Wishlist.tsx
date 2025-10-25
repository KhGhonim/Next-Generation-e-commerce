import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { removeFromWishlist, WishlistItem } from "../../store/slices/wishlistSlice";
import { addToCart } from "../../store/slices/cartSlice";
import { FaHeart, FaShoppingCart, FaTrash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Wishlist() {
  const { items } = useAppSelector((state) => state.wishlist);
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleRemoveFromWishlist = (itemId: string) => {
    dispatch(removeFromWishlist(itemId));
    toast.success("Item removed from wishlist");
  };

  const handleAddToCart = (item: WishlistItem) => {
    if (!isAuthenticated) {
      toast.error("Please log in to add items to your cart");
      return;
    }

    dispatch(addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    }));
    toast.success(`${item.name} added to cart!`);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center pt-24 lg:pt-32">
        <div className="text-center">
          <FaHeart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your wishlist</h2>
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
          <div className="flex items-center space-x-3 mb-4">
            <FaHeart className="h-8 w-8 text-red-500" />
            <h1 className="text-3xl font-bold text-gray-900 stick-bold">My Wishlist</h1>
          </div>
          <p className="text-gray-600 stick-regular">
            {items.length} {items.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <FaHeart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 stick-bold mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-600 stick-regular mb-8">
              Start adding items you love to your wishlist
            </p>
            <Link
              to="/shop"
              className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer stick-regular"
            >
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs stick-bold">
                    {item.brand}
                  </div>
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-700 hover:text-red-500 p-2 rounded-full transition-colors cursor-pointer"
                    aria-label={`Remove ${item.name} from wishlist`}
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 stick-bold mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  
                  <p className="text-gray-600 stick-regular text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FaHeart
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(item.rating) ? "text-red-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600 stick-regular">
                      ({item.reviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-gray-900 stick-bold">
                      ${item.price}
                    </span>
                    <span className="text-sm text-gray-500 stick-regular">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <motion.button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                      aria-label={`Add ${item.name} to cart`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaShoppingCart className="text-sm" />
                      <span className="stick-regular text-sm">Add to Cart</span>
                    </motion.button>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={`/product/${item.id}`}
                        className="bg-gray-100 text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center cursor-pointer"
                        aria-label={`View details for ${item.name}`}
                      >
                        <FaEye className="text-sm" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
