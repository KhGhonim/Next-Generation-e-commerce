import { AnimatePresence, motion } from "framer-motion";
import LevelUPImg from "../../../assets/LevelUP.avif";
import LevelUP2 from "../../../assets/LevelUP2.avif";
import LevelUP3 from "../../../assets/LevelUP3.avif";

function LevelUP() {
  const parentVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 10,
        duration: 1.5,
        staggerChildren: 0.2,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: 100,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };
  return (
    <AnimatePresence mode="wait">
      <section className="w-full pt-20 lg:pt-28 h-dvh SectionS px-8 lg:px-16 !overflow-hidden relative flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}

          transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
          className="w-56 lg:w-96 cursor-pointer z-40 lg:h-[30rem] z-40"
        >
          <img
            src={LevelUPImg}
            className="w-full h-full rounded-4xl  object-cover"
            alt=""
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}

          transition={{ duration: 0.5, delay: 1, ease: "easeInOut" }}
          className="w-52  lg:h-80 z-40 cursor-pointer absolute left-20 top-2/12 rotate-45"
        >
          <img
            src={LevelUP2}
            className="w-full h-full rounded-4xl  object-cover"
            alt=""
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, delay: 1.5, ease: "easeInOut" }}
          className="w-52  lg:h-80 z-40 cursor-pointer absolute right-20 bottom-1/12 -rotate-45"
        >
          <img
            src={LevelUP3}
            className="w-full h-full rounded-4xl  object-cover"
            alt=""
          />
        </motion.div>
        <motion.div
          variants={parentVariants}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:-rotate-12  text-center max-w-7xl  w-full font-bold stick-bold"
        >
          <h1 className="text-[100px] lg:text-[150px]  z-20 leading-[220px] lg:leading-[240px] text-zinc-400 text-center">
            Welcome to VEXO
          </h1>
        </motion.div>
      </section>
    </AnimatePresence>
  );
}

export default LevelUP;
