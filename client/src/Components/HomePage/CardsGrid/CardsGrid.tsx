import { AnimatePresence, motion } from "framer-motion";
import Cards from "../Cards/Cards";
import { PhotosAndTitle } from "../../../Context/Context";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";

function CardsGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <section className="w-full pt-20 lg:pt-28  SectionS   !overflow-hidden relative ">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="w-full h-24 lg:h-32 text-center flex justify-between items-center"
        >
          <motion.h6
            initial={{ opacity: 0, x: 100, y: 100 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="stick-regular w-1/5 text-xs"
          >
            New Arrivals
          </motion.h6>
          <motion.h1
            initial={{ opacity: 0, x: 100, y: 100 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="stick-bold text-lg  w-3/5 lg:text-6xl "
          >
            Fresh Fits For Your Next Workout!
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, x: 100, y: 100 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="stick-regular  w-1/5 text-xs "
          >
            All Brands
          </motion.h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100, y: 100 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100, y: 100 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="w-full h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 my-5 place-items-center  lg:px-24"
        >
          <Cards cards={PhotosAndTitle} />
        </motion.div>

        <motion.div className="w-full h-32 flex gap-1.5 group justify-center items-center">
          <Link
            className="bg-black cursor-pointer text-white px-10 py-3 rounded-3xl font-bold stick-regular"
            to={"/shop"}
          >
            See All Brands
          </Link>
          <MdOutlineArrowOutward className="bg-black cursor-pointer !text-3xl group-hover:animate-bounce text-white p-1.5  rounded-3xl" />
        </motion.div>
      </section>
    </AnimatePresence>
  );
}

export default CardsGrid;
