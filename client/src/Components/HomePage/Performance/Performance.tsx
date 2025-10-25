import { AnimatePresence, motion } from "framer-motion";
import Performance1 from "../../../assets/Performance1.avif";
import Performance2 from "../../../assets/Performance2.avif";
import { Link } from "react-router-dom";

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

const childVariants = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

function Performance() {
  return (
    <AnimatePresence mode="wait">
      <section className="w-full pt-20 lg:pt-28 h-dvh SectionS px-8 lg:px-16 !overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="w-full h-24 lg:h-32"
        >
          <motion.h6 variants={childVariants} className="stick-regular text-xs">
            Our Top Picks
          </motion.h6>

          <div className="flex flex-col lg:flex-row gap-1.5 justify-between w-full pt-2.5">
            <motion.h1
              variants={childVariants}
              className="stick-bold text-xl lg:text-5xl lg:w-3/6"
            >
              Top Dress up Gear for Peak Performance!
            </motion.h1>

            <motion.h6
              variants={childVariants}
              className="stick-regular text-sm hidden lg:block"
            >
              Discover the best of our collections, all in one place
            </motion.h6>
          </div>
        </motion.div>

        <div className="relative lg:pt-3 flex gap-2.5 lg:gap-7 flex-col lg:flex-row w-full h-full">
          <div className="w-full lg:w-1/2 rounded-3xl h-72 lg:min-h-5/6 relative overflow-hidden">
            <motion.img
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              src={Performance1}
              className="w-full h-full object-cover rounded-4xl"
              alt="Performance 1"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-full h-full">
              <h1 className="stick-bold text-base lg:text-5xl w-4/6 px-5 mb-5">
                Top Dress up Gear for Peak Performance
              </h1>
              <Link
                className="stick-bold text-xs p-2 px-6 mx-10  rounded-full bg-transparent border cursor-pointer hover:bg-gray-50 transition-colors duration-300 ease-in-out stick-regular"
                to={"/shop"}
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2 rounded-3xl h-72 lg:min-h-5/6 relative">
            <motion.img
              initial={{ opacity: 0, scale: 1.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              src={Performance2}
              className="w-full h-full object-cover rounded-4xl"
              alt="Performance 2"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/12 w-full h-full">
              <h1 className="stick-bold text-base lg:text-5xl mb-5 w-4/6 px-5">
                Top Dress up Gear for Peak Performance
              </h1>
              <Link
                className="stick-bold text-xs p-2 px-6 mx-10 mt-10 rounded-full bg-transparent border cursor-pointer hover:bg-gray-50 transition-colors duration-300 ease-in-out stick-regular"
                to={"/shop"}
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </AnimatePresence>
  );
}

export default Performance;
