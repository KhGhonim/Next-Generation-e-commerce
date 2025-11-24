import { useState } from "react";
import { motion } from "framer-motion";
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
  const dispatch = useAppDispatch();
  const { isLoading: cartIsLoading } = useAppSelector((state) => state.cart);
  const [isAdding, setIsAdding] = useState(false);

  const isLoading = cartIsLoading || isAdding;

  const handleAddToCart = async () => {
    if (isLoading) return;

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

    setIsAdding(true);
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
    } finally {
      setIsAdding(false);
    }
  };

  // Default button content
  const defaultContent = children || (
    <>
      <FaShoppingCart className="text-sm" />
      <span className="text-sm">Add to Cart</span>
    </>
  );

  // Loading content
  const loadingContent = (
    <>
      <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
      <span className="text-sm">Adding...</span>
    </>
  );

  // Base button classes
  const baseClasses = "rounded-lg outline-none transition-all";
  const variantClasses = {
    default:
      "bg-black text-white px-4 py-2 hover:bg-gray-800 flex items-center justify-center gap-2",
    icon: "bg-black text-white p-2 hover:bg-gray-800 flex items-center justify-center",
    text: "text-black hover:text-gray-600 underline",
  };

  const disabledClasses = isLoading
    ? "opacity-60 cursor-not-allowed"
    : "cursor-pointer";

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`;

  return (
    <motion.button
      onClick={handleAddToCart}
      disabled={isLoading}
      className={buttonClasses}
      title={isLoading ? "Adding to cart..." : `Add ${product.name} to cart`}
      aria-label={isLoading ? "Adding to cart..." : `Add ${product.name} to cart`}
      whileHover={isLoading ? {} : { scale: 1.05 }}
      whileTap={isLoading ? {} : { scale: 0.95 }}
    >
      {isLoading ? loadingContent : defaultContent}
    </motion.button>
  );
}

export default AddToCartButton;

