import useSWR from "swr";
import { swrFetcher } from "../utils/swrFetcher";
import type { Product as DashboardProduct } from "../Pages/Dashboard/types";

const API_URL = import.meta.env.VITE_APP_API_URL;

const productFetcher = (url: string) =>
  swrFetcher(url) as Promise<{ data: DashboardProduct }>;

export const useProduct = (productId?: string) => {
  const key = productId ? `${API_URL}/api/products/${productId}` : null;

  const { data, error, isLoading, mutate } = useSWR<{ data: DashboardProduct }>(
    key,
    productFetcher
  );

  return {
    product: data?.data ?? null,
    isLoading,
    error: error instanceof Error ? error.message : null,
    mutate,
  };
};


