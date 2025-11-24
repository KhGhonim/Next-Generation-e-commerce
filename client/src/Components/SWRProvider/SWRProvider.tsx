import React from "react";
import { SWRConfig } from "swr";
import { swrFetcher } from "../../utils/swrFetcher";

interface SWRProviderProps {
  children: React.ReactNode;
}

const SWRProvider = ({ children }: SWRProviderProps) => {
  return (
    <SWRConfig
      value={{
        // ----------- Fetcher ----------- //
        fetcher: swrFetcher,

        // ----------- Revalidation Rules ----------- //
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        revalidateIfStale: true,

        // ----------- Request Deduplication ----------- //
        dedupingInterval: 3000, // Prevents duplicate requests within 2 seconds
        focusThrottleInterval: 3000, // Prevents over-refresh when user switches tabs quickly

        // ----------- Retry (Smart) ----------- //
        errorRetryCount: 3,
        errorRetryInterval: 3000,

        shouldRetryOnError: (error) => {
          if (!error) return true;

          const message = error?.message || "";

          // Don't retry in these cases
          if (
            message.includes("Access denied") ||  // Auth
            message.includes("Rate limit") ||     // API throttling
            message.includes("Forbidden") ||
            (error as { status?: number }).status === 401 ||
            (error as { status?: number }).status === 403 ||
            (error as { status?: number }).status === 429
          ) {
            return false;
          }

          return true;
        },

        // Custom retry logic with jitter
        
        onErrorRetry: (error, _key, config, revalidate, { retryCount }) => {
          // Don't retry on authentication errors or rate limit errors
          if (
            error?.message?.includes("Access denied") ||
            error?.message?.includes("Rate limit") ||
            error?.message?.includes("Forbidden") ||
            (error as { status?: number }).status === 401 ||
            (error as { status?: number }).status === 403 ||
            (error as { status?: number }).status === 429
          ) {
            return;
          }

          // Max retry count
          if (retryCount >= (config.errorRetryCount || 3)) {
            return;
          }

          // Jitter: random delay between 3000ms and 4200ms
          const timeout = 3000 + Math.random() * 1200;
          setTimeout(() => revalidate({ retryCount }), timeout);
        },

        // ----------- Global Error Logger ----------- //
        onError: (error, key) => {
          console.error(`[SWR ERROR] Key: ${key}`, error);
        },

        // ----------- Slow Loading Warning ----------- //
        onLoadingSlow: (key, config) => {
          console.warn(`[SWR SLOW FETCH] ${key}`, config);
        },

        // ----------- Additional Options ----------- //
        keepPreviousData: true, // Keeps UI stable without flash when params change
        compare: (a, b) => JSON.stringify(a) === JSON.stringify(b), // Prevents unnecessary rerenders
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRProvider;

