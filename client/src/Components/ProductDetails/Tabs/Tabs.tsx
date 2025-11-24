import { motion } from "framer-motion";
import { TabsProps } from "../../../Types/ProjectTypes";

const defaultMaterials = ["Premium cotton blend", "Machine wash cold", "Lay flat to dry", "Ethically produced"];

function Tabs({ activeTab, setActiveTab, product }: TabsProps) {
  const materials = product.tags && product.tags.length ? product.tags.slice(0, 4) : defaultMaterials;
  const sizesToShow = product.sizes && product.sizes.length ? product.sizes : ["XS", "S", "M", "L", "XL"];
  const colorsToShow = product.colors && product.colors.length ? product.colors : ["Black", "White"];
  const ratingValue = product.rating ?? 0;
  const reviewsCount = product.reviews ?? 0;
  const trendViews = Math.max(25000, Math.round(Math.max(reviewsCount, 10) * 3200));

  const tabs = ["Description", "Reviews & Ratings 🔥"];

  return (
    <div className="mt-16">
      <div className="border-b border-gray-200">
        <div className="flex gap-8 flex-wrap">
          {tabs.map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 relative ${
                activeTab === tab ? "text-black font-bold" : "text-gray-500"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  layoutId="activeTab"
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="py-8">
        {activeTab === "Description" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-3">{product.name}</h3>
              <p className="text-gray-600 text-lg">
                {product.description ||
                  "Designed for movement with breathable fabrics, a sculpted fit, and strength-tested seams. Pair it with your daily rotation or dress it up for a night run downtown."}
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-neutral-100 p-5 rounded-xl">
                  <h3 className="font-bold mb-3 text-xl">Material & Care</h3>
                  <ul className="space-y-2 text-gray-600">
                    {materials.map((entry) => (
                      <li key={entry} className="flex items-center gap-2">
                        <span className="text-black">✓</span> {entry}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-neutral-100 p-5 rounded-xl">
                  <h3 className="font-bold mb-3 text-xl">Fit & Sizing</h3>
                  <ul className="space-y-2 text-gray-600">
                    {sizesToShow.slice(0, 4).map((size) => (
                      <li key={size} className="flex items-center gap-2">
                        <span className="text-black">✓</span> Available in {size}
                      </li>
                    ))}
                    <li className="flex items-center gap-2">
                      <span className="text-black">✓</span> Colors: {colorsToShow.join(", ")}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-5 rounded-xl">
                <h3 className="font-bold mb-3 text-xl">Community Score</h3>
                <div className="flex items-center gap-3">
                  <div className="w-2/3 bg-gray-200 rounded-full h-4">
                    <motion.div
                      className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${Math.min(100, (ratingValue / 5) * 100)}%` }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    />
                  </div>
                  <span className="font-bold">{ratingValue.toFixed(1)}/5</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Rated by {reviewsCount || "new"} shoppers for comfort, durability, and fit.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Reviews & Ratings 🔥" && (
          <div className="space-y-6">
            <div className="bg-neutral-100 p-5 rounded-xl">
              <div className="flex justify-between mb-4">
                <h3 className="font-bold text-xl">Customer Reviews</h3>
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-yellow-400 text-lg">
                    {"★".repeat(Math.round(ratingValue)) || "☆"}
                  </span>
                  <span className="text-gray-600">({reviewsCount})</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {reviewsCount > 0
                  ? `Verified buyers rated this ${ratingValue.toFixed(1)} / 5 for quality, comfort, and style.`
                  : "No reviews yet—be the first to drop your fit check."}
              </p>
              <button className="w-full mt-4 border border-black py-2 rounded-full font-medium hover:bg-black hover:text-white transition-colors">
                {reviewsCount > 0 ? "Read community reviews" : "Leave the first review"}
              </button>
            </div>

            <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-5 rounded-xl">
              <h3 className="font-bold mb-3 text-xl">TikTok Trend Status</h3>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">🔥</span>
                <div>
                  <div className="text-xl font-bold">{trendViews.toLocaleString()}+</div>
                  <p className="text-sm text-gray-600">
                    Views on #{product.name.replace(/\s+/g, "")}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Tag @vexo for a chance to be featured across our socials.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tabs;
