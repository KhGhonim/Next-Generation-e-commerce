import { useEffect, useState, useDeferredValue } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { addToWishlist } from "../../store/slices/wishlistSlice";
import ShopHeader from "./Components/ShopHeader";
import toast from "react-hot-toast";
import ShopSidebar from "./Components/ShopSidebar";
import ProductGrid from "./Components/ProductGrid";
import { FaFilter, FaTimes } from "react-icons/fa";
import SEO from "../../Components/SEO/SEO";
import { useProducts, ShopProduct } from "../../hooks/useProducts";

export interface FilterState {
  category: string;
  subcategory: string;
  brand: string;
  priceRange: [number, number | undefined];
  rating: number;
  inStock: boolean;
  search: string;
}

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState<ShopProduct[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const baseUrl = import.meta.env.VITE_SITE_URL || "https://vexo.com";
  const { products, error, isLoading } = useProducts();
  const dataError = error || null;
  
  // Get category from URL params for SEO
  const category = searchParams.get("category") || "";
  const brand = searchParams.get("brand") || "";
  const search = searchParams.get("search") || "";
  
  const seoTitle = category 
    ? `Shop ${category} - VEXO` 
    : brand 
    ? `Shop ${brand} Products - VEXO` 
    : search 
    ? `Search Results for "${search}" - VEXO` 
    : "Shop All Products - VEXO";
    
  const seoDescription = category 
    ? `Browse our extensive collection of ${category} at VEXO. Find the best ${category.toLowerCase()} products with competitive prices and fast shipping.`
    : brand 
    ? `Discover premium ${brand} products at VEXO. Shop authentic ${brand} items with great deals and excellent customer service.`
    : search 
    ? `Search results for "${search}" at VEXO. Find exactly what you're looking for from our wide selection of products.`
    : "Shop our complete collection of products at VEXO. Browse fashion, electronics, accessories and more with the best prices and fast shipping.";
  // Separate search input value from filter state for deferred updates
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const deferredSearch = useDeferredValue(searchInput);

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
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.user);

  // On first amount make sure it scroll smoothly to the top of the page
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Sync search input with URL params when URL changes (e.g., browser back/forward)
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    setSearchInput((prev) => (prev !== urlSearch ? urlSearch : prev));
  }, [searchParams]);

  // Update filters when deferred search value changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, search: deferredSearch }));
  }, [deferredSearch]);

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

  const handleAddToWishlist = (product: ShopProduct) => {
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

  const handleSearchChange = (search: string) => {
    setSearchInput(search);
  };

  const clearFilters = () => {
    setSearchInput("");
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
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={`shop, products, ${category}, ${brand}, ${search}, e-commerce, VEXO, online shopping`}
        url={`${baseUrl}${location.pathname}${location.search}`}
        type="website"
        tags={["shop", "products", "e-commerce", category, brand].filter(Boolean)}
      />
      <div className="px-4 sm:px-6 lg:px-8 py-8 pt-24 lg:pt-32">
        <ShopHeader 
          totalProducts={filteredProducts.length}
          searchValue={searchInput}
          onSearchChange={handleSearchChange}
        />

        {dataError && (
          <div className="mt-4 mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {dataError}
          </div>
        )}
        
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