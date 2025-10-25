import { FaFilter, FaTimes, FaStar } from "react-icons/fa";
import { Product, FilterState } from "../Shop";

interface ShopSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onClearFilters: () => void;
  products: Product[];
}

function ShopSidebar({ filters, onFilterChange, products }: ShopSidebarProps) {
  // Get unique categories and brands from products
  const categories = Array.from(new Set(products.map(p => p.category)));
  const brands = Array.from(new Set(products.map(p => p.brand)));
  const maxPrice = Math.max(...products.map(p => p.price));

  const hasActiveFilters = 
    filters.category || 
    filters.subcategory ||
    filters.brand || 
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] || 
    filters.rating > 0 || 
    filters.inStock;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 stick-bold flex items-center">
          <FaFilter className="mr-2" />
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={() => onFilterChange({
              category: "",
              subcategory: "",
              brand: "",
              priceRange: [0, undefined],
              rating: 0,
              inStock: false,
            })}
            className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer rounded-lg flex items-center space-x-1 px-2 py-1 hover:bg-gray-100 transition-colors"
            aria-label="Clear all filters"
          >
            <FaTimes />
            <span className="stick-regular">Clear Filters</span>
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 stick-bold mb-3">Category</h4>
          <p className="text-xs text-gray-500 mb-3 stick-regular">Click to select/deselect</p>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center cursor-pointer rounded-lg">
                <input
                  type="checkbox"
                  checked={filters.category === category}
                  onChange={() => {
                    // Toggle behavior: if already selected, deselect it
                    const newCategory = filters.category === category ? "" : category;
                    onFilterChange({ category: newCategory });
                  }}
                  className="mr-3 rounded outline-none accent-black"
                />
                <span className="text-sm text-gray-700 stick-regular">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Brand Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 stick-bold mb-3">Brand</h4>
          <p className="text-xs text-gray-500 mb-3 stick-regular">Click to select/deselect</p>
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center cursor-pointer rounded-lg">
                <input
                  type="checkbox"
                  checked={filters.brand === brand}
                  onChange={() => {
                    // Toggle behavior: if already selected, deselect it
                    const newBrand = filters.brand === brand ? "" : brand;
                    onFilterChange({ brand: newBrand });
                  }}
                  className="mr-3 rounded outline-none accent-black"
                />
                <span className="text-sm text-gray-700 stick-regular">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 stick-bold mb-3">Price Range</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange[0] || ""}
                onChange={(e) => onFilterChange({ 
                  priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]] 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-black focus:border-transparent stick-regular"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange[1] || ""}
                onChange={(e) => onFilterChange({ 
                  priceRange: [filters.priceRange[0], parseInt(e.target.value) || undefined] 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-black focus:border-transparent stick-regular"
              />
            </div>
            <div className="text-xs text-gray-500 stick-regular">
              Range: $0 - ${maxPrice}
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 stick-bold mb-3">Minimum Rating</h4>
          <p className="text-xs text-gray-500 mb-3 stick-regular">Click to select/deselect</p>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center cursor-pointer rounded-lg">
                <input
                  type="checkbox"
                  checked={filters.rating === rating}
                  onChange={() => {
                    // Toggle behavior: if already selected, deselect it
                    const newRating = filters.rating === rating ? 0 : rating;
                    onFilterChange({ rating: newRating });
                  }}
                  className="mr-3 rounded outline-none accent-black"
                />
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`h-3 w-3 ${
                        i < rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-700 stick-regular">
                    {rating}+ stars
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* In Stock Filter */}
        <div>
          <label className="flex items-center cursor-pointer rounded-lg">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => onFilterChange({ inStock: e.target.checked })}
              className="mr-3 rounded outline-none"
            />
            <span className="text-sm text-gray-700 stick-regular">In Stock Only</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default ShopSidebar;
