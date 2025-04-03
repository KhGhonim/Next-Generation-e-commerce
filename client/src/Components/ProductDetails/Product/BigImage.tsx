import { motion } from "framer-motion";
import { productImages } from "../../../Context/Context";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { CiMaximize2 } from "react-icons/ci";
import { BigImageProps } from "../../../Types/ProjectTypes";

function BigImage({
  currentImageIndex,
  handlePrevImage,
  handleNextImage,
  setIsFixed,
}: BigImageProps) {
  return (
    <div className="aspect-square relative rounded-3xl overflow-hidden bg-neutral-200">
      <img
        src={productImages[currentImageIndex]}
        alt="Product"
        className="w-full h-full object-cover"
      />
      <motion.button
        onClick={handlePrevImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 backdrop-blur-sm rounded-full p-3 shadow-lg"
        whileHover={{ scale: 1.1, backgroundColor: "#fff" }}
        whileTap={{ scale: 0.9 }}
      >
        <BiChevronLeft className="w-6 h-6" />
      </motion.button>
      <motion.button
        onClick={handleNextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 backdrop-blur-sm rounded-full p-3 shadow-lg"
        whileHover={{ scale: 1.1, backgroundColor: "#fff" }}
        whileTap={{ scale: 0.9 }}
      >
        <BiChevronRight className="w-6 h-6" />
      </motion.button>
      <motion.button
        onClick={() => {
          setIsFixed(true);
        }}
        className="absolute  cursor-pointer right-4 bottom-4 bg-white bg-opacity-80 backdrop-blur-sm rounded-full p-3 shadow-lg"
        whileHover={{ scale: 1.1, backgroundColor: "#fff" }}
        whileTap={{ scale: 0.9 }}
      >
        <CiMaximize2 className="w-6 h-6" />
      </motion.button>
    </div>
  );
}

export default BigImage;
