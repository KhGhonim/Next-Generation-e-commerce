import { useMemo } from "react";
import useSWR from "swr";
import { swrFetcher } from "../utils/swrFetcher";
import type { Product as DashboardProduct } from "../Pages/Dashboard/types";

const API_URL = import.meta.env.VITE_APP_API_URL;

export interface ShopProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  sizes: string[];
  colors: string[];
  description: string;
  inStock: boolean;
}

export interface UseProductsOptions {
  limit?: number;
  category?: string;
  search?: string;
  params?: Record<string, string | number | boolean>;
  path?: string;
  disabled?: boolean;
}

const mapProduct = (item: DashboardProduct): ShopProduct => ({
  id: item._id || item.name,
  name: item.name,
  price: typeof item.price === "number" ? item.price : Number(item.price) || 0,
  image:
    Array.isArray(item.images) && item.images.length > 0
      ? item.images[0]
      : "https://via.placeholder.com/600x600.png?text=VEXO",
  category: item.category || "General",
  brand: item.brand || "VEXO",
  rating: typeof item?.rating === "number" ? item.rating : 0,
  reviews: typeof item?.reviews === "number" ? item.reviews : 0,
  sizes: Array.isArray(item.sizes) ? item.sizes : [],
  colors: Array.isArray(item.colors) ? item.colors : [],
  description: item.description || "",
  inStock: typeof item.inStock === "boolean" ? item.inStock : true,
});

const productsFetcher = (url: string) =>
  swrFetcher(url) as Promise<{ data: DashboardProduct[] }>;

const buildProductsKey = (options?: UseProductsOptions) => {
  if (options?.disabled) return null;
  const searchParams = new URLSearchParams();

  if (options?.limit) searchParams.set("limit", options.limit.toString());
  if (options?.category) searchParams.set("category", options.category);
  if (options?.search) searchParams.set("search", options.search);

  if (options?.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      searchParams.set(key, String(value));
    });
  }

  const query = searchParams.toString();
  const basePath = options?.path || "/api/products";
  return `${API_URL}${basePath}${query ? `?${query}` : ""}`;
};

export const useProducts = (options?: UseProductsOptions) => {
  const key = buildProductsKey(options);

  const { data, error, isLoading, mutate } = useSWR<{ data: DashboardProduct[] }>(
    key,
    productsFetcher
  );

  const products = useMemo<ShopProduct[]>(() => {
    if (!data?.data) return [];
    return data.data.map(mapProduct);
  }, [data]);

  return {
    products,
    isLoading,
    error: error instanceof Error ? error.message : null,
    mutate,
  };
};

