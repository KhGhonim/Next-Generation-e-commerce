import { motion } from "framer-motion";
import { BiStar, BiMinus, BiPlus } from "react-icons/bi";
import { BsTwitter } from "react-icons/bs";
import { CgMail } from "react-icons/cg";
import { FaFire, FaTiktok, FaInstagram } from "react-icons/fa";
import { SiSnapchat } from "react-icons/si";
import { DetailsProps } from "../../../Types/ProjectTypes";
import { useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoHeartSharp } from "react-icons/io5";

function Details({
  isVibing,
  addToCart,
  quantity,
  setQuantity,
  selectedSize,
  setSelectedSize,
}: DetailsProps) {
  const [IsLiked, setIsLiked] = useState(false);

  const HandleLike = () => {
    setIsLiked(true);
  };

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium px-3 py-1 rounded-full">
          Trending
        </span>
        <span className="bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
          ⚡ 72 people copped today
        </span>
      </div>

      <h1 className="text-4xl font-bold mb-3 font-sans">Ridley High Waist</h1>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-2xl font-semibold">$36.00</span>
        <div className="flex items-center">
          {[1, 2, 3, 4, 4.5].map((rating, index) => (
            <BiStar
              key={index}
              className={`w-5 h-5 ${
                rating <= 4.5 ? "text-yellow-400 fill-current" : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-gray-600 text-sm">(7 reviews)</span>
        </div>
      </div>

      <p className="text-gray-600 mb-6 text-lg">
        The ultimate core piece for your aesthetic wardrobe. This
        vintage-inspired fit gives major clean girl energy while staying comfy
        enough for your TikTok dance challenges.
      </p>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">
            SIZE: <span className="font-bold">{selectedSize}</span>
          </h3>
          <button className="text-sm underline">Size Guide</button>
        </div>
        <div className="flex gap-3">
          {["XS", "S", "M", "L", "XL"].map((size) => (
            <motion.button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-12 cursor-pointer rounded-2xl border-2 font-medium ${
                selectedSize === size
                  ? "border-black bg-black text-white"
                  : "border-gray-200 hover:border-gray-400"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {size}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="flex items-center border-2 border-gray-200 rounded-xl">
          <motion.button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-3"
            whileTap={{ scale: 0.9 }}
          >
            <BiMinus className="w-5 h-5 cursor-pointer" />
          </motion.button>
          <input
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="w-16  text-center border-x border-gray-200 bg-transparent"
          />
          <motion.button
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            className="p-3"
            whileTap={{ scale: 0.9 }}
          >
            <BiPlus className="w-5 h-5 cursor-pointer" />
          </motion.button>
        </div>

        <motion.button
          className={`flex-1 cursor-pointer bg-black text-white py-4 px-6 rounded-xl font-medium text-lg flex items-center justify-center gap-2`}
          onClick={addToCart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isVibing ? (
            <motion.span
              layoutId="isVibing"
              className="animate-bounce text-amber-300"
            >
              🔥
            </motion.span>
          ) : (
            <motion.span layoutId="isVibing">
              <FaFire className={`w-5 h-5 `} />
            </motion.span>
          )}
          ADD TO CART
        </motion.button>

        <motion.button
          className="px-4 rounded-full border border-gray-50"
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            HandleLike();
          }}
        >
          {IsLiked ? (
            <IoHeartSharp size={20} className="text-red-600" />
          ) : (
            <IoIosHeartEmpty size={20} className="text-black" />
          )}
        </motion.button>
      </div>

      <div className="mb-8 bg-neutral-100 p-4 rounded-xl">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">⚡</span>
          <div>
            <p className="font-medium">Fast Shipping</p>
            <p className="text-sm text-gray-500">
              Order now to get by April {new Date().getDay() + 3}th
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-4xl">💯</span>
          <div>
            <p className="font-medium">Verified Authentic</p>
            <p className="text-sm text-gray-500">
              No cap, only real deals here
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 text-gray-700">
        <p className="text-sm mr-2">Share your fit:</p>
        <motion.button className="hover:text-black" whileHover={{ scale: 1.2 }}>
          <FaTiktok className="w-5 h-5" />
        </motion.button>
        <motion.button className="hover:text-black" whileHover={{ scale: 1.2 }}>
          <FaInstagram className="w-5 h-5" />
        </motion.button>
        <motion.button className="hover:text-black" whileHover={{ scale: 1.2 }}>
          <SiSnapchat className="w-5 h-5" />
        </motion.button>
        <motion.button className="hover:text-black" whileHover={{ scale: 1.2 }}>
          <BsTwitter className="w-5 h-5" />
        </motion.button>
        <motion.button className="hover:text-black" whileHover={{ scale: 1.2 }}>
          <CgMail className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}

export default Details;
