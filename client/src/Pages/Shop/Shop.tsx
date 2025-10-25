import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addToCart } from "../../store/slices/cartSlice";
import { addToWishlist } from "../../store/slices/wishlistSlice";
import ShopHeader from "./Components/ShopHeader";
import toast from "react-hot-toast";
import ShopSidebar from "./Components/ShopSidebar";
import ProductGrid from "./Components/ProductGrid";
import { FaFilter, FaTimes } from "react-icons/fa";

export interface Product {
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

export interface FilterState {
  category: string;
  subcategory: string;
  brand: string;
  priceRange: [number, number | undefined];
  rating: number;
  inStock: boolean;
  search: string;
}

// Mock products data - replace with actual API call
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Athletic Shoes",
    price: 129.99,
    image: "/src/assets/1.avif",
    category: "Shoes",
    brand: "Nike",
    rating: 4.5,
    reviews: 128,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Red"],
    description: "High-performance athletic shoes for all sports activities.",
    inStock: true,
  },
  {
    id: "2",
    name: "Comfortable T-Shirt",
    price: 29.99,
    image: "/src/assets/2.avif",
    category: "Clothing",
    brand: "Adidas",
    rating: 4.2,
    reviews: 89,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Green", "Gray"],
    description: "Soft and comfortable cotton t-shirt for everyday wear.",
    inStock: true,
  },
  {
    id: "3",
    name: "Wireless Headphones",
    price: 199.99,
    image: "/src/assets/3.avif",
    category: "Electronics",
    brand: "Sony",
    rating: 4.8,
    reviews: 256,
    sizes: ["One Size"],
    colors: ["Black", "White"],
    description: "Premium wireless headphones with noise cancellation.",
    inStock: true,
  },
  {
    id: "4",
    name: "Smart Watch",
    price: 299.99,
    image: "/src/assets/4.avif",
    category: "Electronics",
    brand: "Apple",
    rating: 4.6,
    reviews: 342,
    sizes: ["S", "M", "L"],
    colors: ["Black", "Silver", "Gold"],
    description: "Advanced smartwatch with health monitoring features.",
    inStock: false,
  },
  {
    id: "5",
    name: "Running Shorts",
    price: 39.99,
    image: "/src/assets/5.avif",
    category: "Clothing",
    brand: "Nike",
    rating: 4.3,
    reviews: 67,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Red"],
    description: "Lightweight running shorts for optimal performance.",
    inStock: true,
  },
  {
    id: "6",
    name: "Gaming Mouse",
    price: 79.99,
    image: "/src/assets/6.avif",
    category: "Electronics",
    brand: "Razer",
    rating: 4.7,
    reviews: 189,
    sizes: ["One Size"],
    colors: ["Black", "Green"],
    description: "High-precision gaming mouse with RGB lighting.",
    inStock: true,
  },
];

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: searchParams.get("category") || "",
    subcategory: searchParams.get("subcategory") || "",
    brand: searchParams.get("brand") || "",
    priceRange: [
      parseInt(searchParams.get("minPrice") || "0"),
      parseInt(searchParams.get("maxPrice") || "0") || undefined,
    ],
    rating: parseInt(searchParams.get("rating") || "0"),
    inStock: searchParams.get("inStock") === "true",
    search: searchParams.get("search") || "",
  });
  const [isLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.user);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.category) params.set("category", filters.category);
    if (filters.subcategory) params.set("subcategory", filters.subcategory);
    if (filters.brand) params.set("brand", filters.brand);
    if (filters.priceRange[0] > 0) params.set("minPrice", filters.priceRange[0].toString());
    if (filters.priceRange[1]) params.set("maxPrice", filters.priceRange[1].toString());
    if (filters.rating > 0) params.set("rating", filters.rating.toString());
    if (filters.inStock) params.set("inStock", "true");
    if (filters.search) params.set("search", filters.search);

    setSearchParams(params);
  }, [filters, setSearchParams]);

  // Filter products based on current filters
  useEffect(() => {
    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter(product => product.category.toLowerCase() === filters.category.toLowerCase());
    }

    if (filters.subcategory) {
      // Map subcategory names to actual product categories
      const subcategoryMap: { [key: string]: string } = {
        'shoes': 'Shoes',
        'pants': 'Clothing',
        'jackets': 'Clothing',
        'dresses': 'Clothing',
        'clothes': 'Clothing',
        'accessories': 'Electronics',
      };
      
      const mappedCategory = subcategoryMap[filters.subcategory];
      if (mappedCategory) {
        filtered = filtered.filter(product => product.category === mappedCategory);
      }
    }

    if (filters.brand) {
      filtered = filtered.filter(product => product.brand === filters.brand);
    }

    if (filters.priceRange[0] > 0 || filters.priceRange[1]) {
      filtered = filtered.filter(product => 
        product.price >= filters.priceRange[0] && 
        (filters.priceRange[1] === undefined || product.price <= filters.priceRange[1])
      );
    }

    if (filters.rating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.rating);
    }

    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    if (filters.search) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, filters]);

  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated) {
      toast.error("Please log in to add items to your cart");
      return;
    }

    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    }));
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = (product: Product) => {
    if (!isAuthenticated) {
      toast.error("Please log in to add items to your wishlist");
      return;
    }

    dispatch(addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      brand: product.brand,
      rating: product.rating,
      reviews: product.reviews,
      sizes: product.sizes,
      colors: product.colors,
      description: product.description,
      inStock: product.inStock,
    }));
    toast.success(`${product.name} added to wishlist!`);
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      subcategory: "",
      brand: "",
      priceRange: [0, undefined],
      rating: 0,
      inStock: false,
      search: "",
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="px-4 sm:px-6 lg:px-8 py-8 pt-24 lg:pt-32">
        <ShopHeader 
          totalProducts={filteredProducts.length}
          searchValue={filters.search}
          onSearchChange={(search) => handleFilterChange({ search })}
        />
        
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors cursor-pointer"
            aria-label="Open filters"
          >
            <FaFilter />
            <span className="stick-regular">Filters</span>
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Desktop Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block lg:w-1/4"
          >
            <ShopSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              products={products}
            />
          </motion.div>
          
          {/* Mobile Sidebar Overlay */}
          <AnimatePresence>
            {isMobileFiltersOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                onClick={() => setIsMobileFiltersOpen(false)}
              >
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "tween", duration: 0.3 }}
                  className="w-80 h-full bg-white shadow-xl overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 stick-bold">
                        Filters
                      </h3>
                      <button
                        onClick={() => setIsMobileFiltersOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                        aria-label="Close filters"
                      >
                        <FaTimes />
                      </button>
                    </div>
                    <ShopSidebar
                      filters={filters}
                      onFilterChange={(newFilters) => {
                        handleFilterChange(newFilters);
                      }}
                      onClearFilters={() => {
                        clearFilters();
                        setIsMobileFiltersOpen(false);
                      }}
                      products={products}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-3/4"
          >
            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              isLoading={isLoading}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Shop;