import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToCartAsync, CartItem } from "../store/slices/cartSlice";
import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity?: number;
    size?: string;
    color?: string;
  };
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "icon" | "text";
}

function AddToCartButton({
  product,
  className = "",
  children,
  variant = "default",
}: AddToCartButtonProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector((state) => state.cart);

  const handleAddToCart = async () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast.error("Please log in to add items to your cart");
      navigate("/login");
      return;
    }

    // Prepare cart item
    const cartItem: Omit<CartItem, "cartItemId"> = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity || 1,
      image: product.image,
      size: product.size,
      color: product.color,
    };

    try {
      await dispatch(addToCartAsync(cartItem)).unwrap();
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      const errorMessage =
        typeof error === "string"
          ? error
          : error instanceof Error
          ? error.message
          : "Failed to add item to cart";
      toast.error(errorMessage);
    }
  };

  // Default button content
  const defaultContent = children || (
    <>
      <FaShoppingCart className="text-sm" />
      <span className="text-sm">Add to Cart</span>
    </>
  );

  // Base button classes
  const baseClasses = "cursor-pointer rounded-lg outline-none";
  const variantClasses = {
    default:
      "bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2",
    icon: "bg-black text-white p-2 hover:bg-gray-800 transition-colors flex items-center justify-center",
    text: "text-black hover:text-gray-600 transition-colors underline",
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <motion.button
      onClick={handleAddToCart}
      disabled={isLoading}
      className={buttonClasses}
      title={`Add ${product.name} to cart`}
      aria-label={`Add ${product.name} to cart`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {defaultContent}
    </motion.button>
  );
}

export default AddToCartButton;

