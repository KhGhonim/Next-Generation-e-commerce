import { AnimatePresence, motion } from "framer-motion";
import Cards from "../Cards/Cards";
import { PhotosAndTitle } from "../../../Context/Context";
import { MdOutlineArrowOutward } from "react-icons/md";

function CardsGrid() {
  return (
    <AnimatePresence mode="wait">
      <section className="w-full pt-20 lg:pt-28  h-full SectionS   !overflow-hidden relative ">
        <div className="w-full h-24 lg:h-32 text-center flex justify-between items-center">
          <motion.h6 className="stick-regular w-1/5 text-xs">
            New Arrivals
          </motion.h6>
          <motion.h1 className="stick-bold text-lg  w-3/5 lg:text-6xl ">
            Fresh Fits For Your Next Workout!
          </motion.h1>
          <motion.h1 className="stick-regular  w-1/5 text-xs ">
            All Brands
          </motion.h1>
        </div>

        <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 my-5 place-items-center  lg:px-24">
          <Cards cards={PhotosAndTitle} />
        </div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-full h-32 flex gap-1.5 justify-center items-center"
        >
          <button className="bg-black cursor-pointer text-white px-10 py-3 rounded-3xl">
            See All Brands
          </button>
          <MdOutlineArrowOutward className="bg-black cursor-pointer !text-3xl text-white p-1.5  rounded-3xl" />
        </motion.div>
      </section>
    </AnimatePresence>
  );
}

export default CardsGrid;
