import { motion } from "framer-motion";
import { TabsProps } from "../../../Types/ProjectTypes";

function Tabs({ activeTab, setActiveTab }: TabsProps) {
  return (
    <div className="mt-16">
      <div className="border-b border-gray-200">
        <div className="flex gap-8 flex-wrap">
          {[
            "The Tea ☕",
            "Specs & Deets",
            "The Vibe Check",
            "Hot Takes 🔥",
          ].map((tab) => (
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
        {activeTab === "The Tea ☕" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-3 text-xl">
                The Main Character Energy
              </h3>
              <p className="text-gray-600 text-lg">
                This fit is giving period piece protagonist with a modern twist.
                Perfect for your coffee shop study aesthetic TikToks or that
                casual OOTD when you want to look effortlessly put together.
              </p>
            </div>
            <div className="p-4 bg-neutral-100 rounded-xl">
              <h3 className="font-bold mb-3 text-xl">No Cap Review</h3>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="/api/placeholder/40/40"
                  alt="User"
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">@maincharacter_energy</p>
                  <p className="text-sm text-gray-500">
                    Living for this piece fr fr
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Specs & Deets" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-neutral-100 p-5 rounded-xl">
                <h3 className="font-bold mb-3 text-xl">Material & Care</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="text-black">✓</span> 95% Cotton, 5%
                    Elastane
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-black">✓</span> Machine wash cold
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-black">✓</span> Tumble dry low
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-black">✓</span> Sustainable production
                  </li>
                </ul>
              </div>
              <div className="bg-neutral-100 p-5 rounded-xl">
                <h3 className="font-bold mb-3 text-xl">Fit & Sizing</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="text-black">✓</span> High-waisted design
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-black">✓</span> True to size fit
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-black">✓</span> Model wears size S
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-black">✓</span> Model height: 5'9"
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-5 rounded-xl">
              <h3 className="font-bold mb-3 text-xl">Sustainability Score</h3>
              <div className="flex items-center gap-3">
                <div className="w-2/3 bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
                <span className="font-bold">8.5/10</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Made with ethically sourced materials and low-impact dyes.
              </p>
            </div>
          </div>
        )}

        {activeTab === "The Vibe Check" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="font-bold mb-3 text-xl">Aesthetic Match</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Clean Girl</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-pink-500">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Old Money</span>
                    <div className="flex">
                      {[1, 2, 3, 4].map((star) => (
                        <span key={star} className="text-pink-500">
                          ★
                        </span>
                      ))}
                      <span className="text-gray-300">★</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Y2K</span>
                    <div className="flex">
                      {[1, 2, 3].map((star) => (
                        <span key={star} className="text-pink-500">
                          ★
                        </span>
                      ))}
                      {[1, 2].map((star) => (
                        <span key={star} className="text-gray-300">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Dark Academia</span>
                    <div className="flex">
                      {[1, 2, 3, 4].map((star) => (
                        <span key={star} className="text-pink-500">
                          ★
                        </span>
                      ))}
                      <span className="text-gray-300">★</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-neutral-100 p-5 rounded-xl">
                <h3 className="font-bold mb-3 text-xl">Mood Board Inspo</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((img) => (
                    <div
                      key={img}
                      className="aspect-square rounded-lg overflow-hidden"
                    >
                      <img
                        src={`/api/placeholder/100/100`}
                        alt="Mood"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-sm text-gray-500 text-center">
                  Tap to expand mood board
                </p>
              </div>
            </div>
            <div className="p-4 bg-black text-white rounded-xl">
              <h3 className="font-bold mb-3 text-xl">
                Core Memories Made With This Fit
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white bg-opacity-20 text-sm rounded-full px-3 py-1">
                  Coffee dates
                </span>
                <span className="bg-white bg-opacity-20 text-sm rounded-full px-3 py-1">
                  Museum trips
                </span>
                <span className="bg-white bg-opacity-20 text-sm rounded-full px-3 py-1">
                  City walks
                </span>
                <span className="bg-white bg-opacity-20 text-sm rounded-full px-3 py-1">
                  Friend catch-ups
                </span>
                <span className="bg-white bg-opacity-20 text-sm rounded-full px-3 py-1">
                  Casual dinners
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Hot Takes 🔥" && (
          <div className="space-y-6">
            <div className="bg-neutral-100 p-5 rounded-xl">
              <div className="flex justify-between mb-4">
                <h3 className="font-bold text-xl">Customer Reviews</h3>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="text-sm text-gray-600">(24)</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <img
                        src="/api/placeholder/32/32"
                        alt="User"
                        className="rounded-full"
                      />
                      <p className="font-medium">@fashion_girlie</p>
                    </div>
                    <span className="text-yellow-400">★★★★★</span>
                  </div>
                  <p className="text-gray-600">
                    obsessed is an understatement!!! this is literally my
                    personality now 💅
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                      Verified Purchase
                    </span>
                    <span className="text-xs text-gray-500">
                      Posted 3 days ago
                    </span>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <img
                        src="/api/placeholder/32/32"
                        alt="User"
                        className="rounded-full"
                      />
                      <p className="font-medium">@rizz_wizard</p>
                    </div>
                    <span className="text-yellow-400">
                      ★★★★<span className="text-gray-300">★</span>
                    </span>
                  </div>
                  <p className="text-gray-600">
                    fr these go hard with my air forces, the fit is immaculate
                    no cap
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                      Verified Purchase
                    </span>
                    <span className="text-xs text-gray-500">
                      Posted 1 week ago
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <img
                        src="/api/placeholder/32/32"
                        alt="User"
                        className="rounded-full"
                      />
                      <p className="font-medium">@aesthetic_queen</p>
                    </div>
                    <span className="text-yellow-400">★★★★★</span>
                  </div>
                  <p className="text-gray-600">
                    the way these jeans understand the assignment?? literal
                    slay, 10/10 would recommend to my besties
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                      Verified Purchase
                    </span>
                    <span className="text-xs text-gray-500">
                      Posted 2 weeks ago
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 border border-black py-2 rounded-full font-medium hover:bg-black hover:text-white transition-colors">
                Read All Reviews
              </button>
            </div>

            <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-5 rounded-xl">
              <h3 className="font-bold mb-3 text-xl">TikTok Trend Status</h3>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">🔥</span>
                <div>
                  <div className="text-xl font-bold">142.8M</div>
                  <p className="text-sm text-gray-600">
                    Views on #RidleyHighWaist
                  </p>
                </div>
              </div>
              <p className="text-sm">
                As seen on: @emma_chamberlain, @addisonre, @charlidamelio
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tabs;
