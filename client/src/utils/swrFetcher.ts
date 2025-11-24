import toast from "react-hot-toast";

export interface SWRFetcherOptions {
  method: "GET";
  body?: unknown;
  headers?: Record<string, string>;
  errorMessage?: string;
  skipAuthRedirect?: boolean;
}

// SWR fetcher function - receives only the key (URL) as argument
export const swrFetcher = async (url: string): Promise<unknown> => {
  if (!url) {
    throw new Error("URL is required");
  }

  try {
    const res = await fetch(url, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    // Handle rate limiting (429)
    if (res.status === 429) {
      const retryAfter = res.headers.get("retry-after");
      const minutes = retryAfter ? Math.ceil(parseInt(retryAfter) / 60) : 15;
      toast.error(`Too many requests. Please try again in ${minutes} minutes.`);
      throw new Error(`Rate limit exceeded. Retry after ${minutes} minutes.`);
    }

    const jsonData = await res.json();

    // Handle authentication errors
    if (!res.ok && jsonData.message === "Access denied, no token provided") {
      toast.error("Access denied, please login again!");
      window.location.href = "/login";
      throw new Error("Access denied, no token provided");
    }

    // Handle other errors
    if (!res.ok) {
      const errorMessage = jsonData.message || "Failed to fetch data";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    // Return the full jsonData object so hooks can access any property (data, accounts, user, tickets, etc.)
    return jsonData;
  } catch (error) {
    console.error("SWR Fetcher Error:", error);
    throw error;
  }
};

// Helper function to build URL with query parameters
export const buildSWRKey = (
  endpoint: string,
  params?: Record<string, unknown>
): string => {
  const baseUrl = endpoint.startsWith("http") ? endpoint : `${import.meta.env.VITE_APP_API_URL}${endpoint}`;
  
  if (!params || Object.keys(params).length === 0) {
    return baseUrl;
  }

  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (typeof value === "object") {
        queryParams.append(key, JSON.stringify(value));
      } else {
        queryParams.append(key, String(value));
      }
    }
  });

  const queryString = queryParams.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

