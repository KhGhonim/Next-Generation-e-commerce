import { productImages } from "../../../Context/Context";
import { motion } from "framer-motion";
import { SmallImagesProps } from "../../../Types/ProjectTypes";

function SmallImages({ setCurrentImageIndex, currentImageIndex }: SmallImagesProps) {
  return (
    <div className="grid grid-cols-4 gap-3 mt-4">
      {productImages.map((img, index) => (
        <motion.button
          key={index}
          onClick={() => setCurrentImageIndex(index)}
          className={`aspect-square rounded-2xl overflow-hidden ${
            currentImageIndex === index ? "ring-2 ring-gray-300" : ""
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src={img}
            alt={`Thumbnail ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </motion.button>
      ))}
    </div>
  );
}

export default SmallImages;
