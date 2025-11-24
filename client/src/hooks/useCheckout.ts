import { useState, useEffect, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { clearCartAsync } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

export interface AppliedCoupon {
  code: string;
  description?: string;
  discountAmount: number;
}

export interface UseCheckoutReturn {
  formData: CheckoutFormData;
  isProcessing: boolean;
  couponCode: string;
  couponDiscount: number;
  isValidatingCoupon: boolean;
  appliedCoupon: AppliedCoupon | null;
  finalTotal: number;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleApplyCoupon: () => Promise<void>;
  handleRemoveCoupon: () => void;
  setCouponCode: (code: string) => void;
}

export const useCheckout = (): UseCheckoutReturn => {
  const { items, totalPrice } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_APP_API_URL;

  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(
    null
  );

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate("/shop");
    }
  }, [items.length, navigate]);

  // Reset coupon when cart content changes
  useEffect(() => {
    setCouponDiscount(0);
    setAppliedCoupon(null);
    setCouponCode("");
  }, [items]);

  // Populate form data from user
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear cart after successful checkout
      await dispatch(clearCartAsync()).unwrap();
      toast.success("Order placed successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Checkout error:", error);
      const errorMessage =
        typeof error === "string"
          ? error
          : error instanceof Error
          ? error.message
          : "Payment failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyCoupon = async () => {
    if (items.length === 0 || totalPrice <= 0) {
      toast.error("Add items to your cart before applying a coupon.");
      return;
    }

    if (!couponCode.trim()) {
      toast.error("Enter a coupon code.");
      return;
    }

    setIsValidatingCoupon(true);
    try {
      const cartItemsPayload = items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));
      const response = await fetch(`${API_URL}/api/coupons/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          code: couponCode.trim().toUpperCase(),
          cartTotal: totalPrice,
          items: cartItemsPayload,
        }),
      });
      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result?.message || "Invalid coupon code");
      }

      const data = result?.data || result;
      const discountAmount = Number(data?.discountAmount) || 0;

      if (discountAmount <= 0) {
        throw new Error("Coupon is no longer valid.");
      }

      setCouponDiscount(discountAmount);
      setAppliedCoupon({
        code: (data?.coupon?.code || couponCode).toUpperCase(),
        description: data?.coupon?.description || "Coupon applied",
        discountAmount,
      });
      toast.success("Coupon applied successfully!");
    } catch (error) {
      setCouponDiscount(0);
      setAppliedCoupon(null);
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to apply coupon at this time."
      );
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponDiscount(0);
    setAppliedCoupon(null);
    setCouponCode("");
    toast.success("Coupon removed.");
  };

  const finalTotal = useMemo(
    () => Math.max(totalPrice - couponDiscount, 0),
    [totalPrice, couponDiscount]
  );

  return {
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
  };
};
