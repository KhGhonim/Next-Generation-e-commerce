import { useCallback, useState } from "react";
import type { Coupon, Product } from "../Pages/Dashboard/types";

const API_URL = import.meta.env.VITE_APP_API_URL;

export type CouponPayload = Omit<Coupon, "_id">;

interface UseCouponsResult {
  coupons: Coupon[];
  isLoading: boolean;
  error: string | null;
  fetchCoupons: () => Promise<void>;
  createCoupon: (payload: CouponPayload) => Promise<Coupon | null>;
  updateCoupon: (couponId: string, payload: CouponPayload) => Promise<Coupon | null>;
  deleteCoupon: (couponId: string) => Promise<boolean>;
  products: Product[];
  isLoadingProducts: boolean;
  productsError: string | null;
  fetchProductsList: () => Promise<void>;
}

export function useCoupons(): UseCouponsResult {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [productsError, setProductsError] = useState<string | null>(null);

  const fetchCoupons = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/coupons`, {
        credentials: "include",
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.message || "Failed to fetch coupons");
      }
      setCoupons(Array.isArray(result?.data) ? result.data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch coupons");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchProductsList = useCallback(async () => {
    setIsLoadingProducts(true);
    setProductsError(null);
    try {
      const response = await fetch(`${API_URL}/api/products?limit=250`, {
        credentials: "include",
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.message || "Failed to fetch products");
      }
      setProducts(Array.isArray(result?.data) ? result.data : []);
    } catch (err) {
      setProductsError(err instanceof Error ? err.message : "Failed to fetch products");
    } finally {
      setIsLoadingProducts(false);
    }
  }, []);

  const createCoupon = useCallback(
    async (payload: CouponPayload) => {
      setError(null);
      try {
        const response = await fetch(`${API_URL}/api/coupons`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result?.message || "Failed to create coupon");
        }
        const createdCoupon: Coupon = result?.data || result;
        setCoupons((prev) => [createdCoupon, ...prev]);
        return createdCoupon;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create coupon");
        return null;
      }
    },
    []
  );

  const updateCoupon = useCallback(
    async (couponId: string, payload: CouponPayload) => {
      setError(null);
      try {
        const response = await fetch(`${API_URL}/api/coupons/${couponId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result?.message || "Failed to update coupon");
        }
        const updatedCoupon: Coupon = result?.data || result;
        setCoupons((prev) =>
          prev.map((coupon) => (coupon._id === couponId ? updatedCoupon : coupon))
        );
        return updatedCoupon;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update coupon");
        return null;
      }
    },
    []
  );

  const deleteCoupon = useCallback(async (couponId: string) => {
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/coupons/${couponId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.message || "Failed to delete coupon");
      }
      setCoupons((prev) => prev.filter((coupon) => coupon._id !== couponId));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete coupon");
      return false;
    }
  }, []);

  return {
    coupons,
    isLoading,
    error,
    fetchCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    products,
    isLoadingProducts,
    productsError,
    fetchProductsList,
  };
}


