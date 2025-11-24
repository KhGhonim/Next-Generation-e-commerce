import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../../Pages/Dashboard/types";

interface RelatedProps {
  currentProductId: string;
  category?: string;
}

const API_URL = import.meta.env.VITE_APP_API_URL;

function Related({ currentProductId, category }: RelatedProps) {
  const [related, setRelated] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelated = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          limit: "8",
        });
        if (category) params.append("category", category);

        const response = await fetch(`${API_URL}/api/products?${params.toString()}`);
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result?.message || "Failed to fetch related products");
        }
        const items: Product[] = Array.isArray(result?.data) ? result.data : [];
        setRelated(items.filter((item) => item._id !== currentProductId).slice(0, 4));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load related products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelated();
  }, [currentProductId, category]);

  return (
    <div className="mt-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Complete the Fit</h2>
        <motion.button
          className="text-sm underline font-medium"
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/shop">See all collection</Link>
        </motion.button>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center py-10 text-sm text-zinc-500">
          Loading related products...
        </div>
      ) : error ? (
        <div className="text-sm text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {related.length === 0 ? (
            <div className="text-sm text-zinc-500 col-span-full text-center">
              More pieces dropping soon. Check the shop for fresh arrivals.
            </div>
          ) : (
            related.map((product) => (
              <motion.div key={product._id} className="group" whileHover={{ y: -5 }}>
                <div className="relative aspect-square mb-4 rounded-2xl overflow-hidden">
                  <img
                    loading="lazy"
                    src={
                      product.images && product.images.length
                        ? product.images[0]
                        : "https://via.placeholder.com/400x400.png?text=VEXO"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <Link to={`/product/${product._id}`} className="block space-y-1">
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-gray-500 line-through text-sm">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Related;
