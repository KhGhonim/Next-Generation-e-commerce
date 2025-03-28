import { AnimatePresence, motion } from "framer-motion";
import LevelUPImg from "../../../assets/LevelUP.avif";

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
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
          className="w-[30rem] h-[30rem] z-40"
        >
          <img
            src={LevelUPImg}
            className="w-full h-full rounded-4xl z-40 object-cover"
            alt=""
          />
        </motion.div>{" "}
        <motion.div
          variants={parentVariants}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-12  text-center max-w-7xl  w-full font-bold stick-bold"
        >
          <h1 className="text-[100px] lg:text-[150px] leading-[150px] text-zinc-400 text-center">
          Welcome to VEXO
          </h1>
        </motion.div>

        
      </section>
    </AnimatePresence>
  );
}

export default LevelUP;
