import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { removeFromCartAsync, updateQuantityAsync, CartItem } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export interface UseSidebarCartReturn {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isItemUpdating: (cartItemId: string) => boolean;
  isItemDeleting: (cartItemId: string) => boolean;
  isItemLoading: (cartItemId: string) => boolean;
  handleQuantityChange: (item: CartItem, newQuantity: number) => Promise<void>;
  handleRemoveItem: (cartItemId: string) => Promise<void>;
  handleCheckout: () => void;
  handleContinueShopping: () => void;
}

export const useSidebarCart = (onClose: () => void): UseSidebarCartReturn => {
  const { items, totalItems, totalPrice } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());
  const [deletingItems, setDeletingItems] = useState<Set<string>>(new Set());

  const isItemUpdating = (cartItemId: string) => updatingItems.has(cartItemId);
  const isItemDeleting = (cartItemId: string) => deletingItems.has(cartItemId);
  const isItemLoading = (cartItemId: string) => isItemUpdating(cartItemId) || isItemDeleting(cartItemId);

  const handleQuantityChange = async (item: CartItem, newQuantity: number) => {
    if (newQuantity <= 0) {
      await handleRemoveItem(item.cartItemId);
      return;
    }

    if (isItemLoading(item.cartItemId)) return;

    setUpdatingItems((prev) => new Set(prev).add(item.cartItemId));
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
    } finally {
      setUpdatingItems((prev) => {
        const next = new Set(prev);
        next.delete(item.cartItemId);
        return next;
      });
    }
  };

  const handleRemoveItem = async (cartItemId: string) => {
    if (isItemLoading(cartItemId)) return;

    setDeletingItems((prev) => new Set(prev).add(cartItemId));
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
    } finally {
      setDeletingItems((prev) => {
        const next = new Set(prev);
        next.delete(cartItemId);
        return next;
      });
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

  return {
    items,
    totalItems,
    totalPrice,
    isItemUpdating,
    isItemDeleting,
    isItemLoading,
    handleQuantityChange,
    handleRemoveItem,
    handleCheckout,
    handleContinueShopping,
  };
};

