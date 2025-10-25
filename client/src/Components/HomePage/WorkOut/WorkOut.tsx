import { AnimatePresence, motion } from "framer-motion";
import left from "../../../assets/left.avif";
import mid from "../../../assets/mid.avif";
import right from "../../../assets/right.avif";
import { useRef } from "react";

function WorkOut() {
  const Dress = useRef(null);

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
      <section className="w-full pt-10 h-dvh SectionS relative flex flex-col lg:flex-row p-5 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -200 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="lg:w-1/4   h-full flex justify-evenly max-lg:items-start lg:items-center flex-col"
        >
          <div className="w-64 h-64 lg:h-80 rounded-4xl">
            <img
              className="w-full h-full rounded-4xl object-cover"
              src={right}
              alt="WorkOut"
              loading="lazy"
            />
          </div>

          <div className="text-center w-full hidden lg:block">
            <h3 className="text-sm stick-regular">
              Performance driven gear for men - but for summer heat and winter
              cold
            </h3>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
          className="lg:w-2/4 z-30  h-full flex justify-center items-center flex-col max-lg:absolute max-lg:top-1/2 max-lg:left-1/2 max-lg:transform max-lg:-translate-x-1/2 max-lg:-translate-y-1/2"
        >
          <div className="w-96 max-lg:w-64 max-lg:h-64 h-[30rem] rounded-4xl">
            <img
              className="w-full h-full rounded-4xl object-cover"
              src={mid}
              alt="WorkOut"
              loading="lazy"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="lg:w-1/4   h-full flex justify-evenly items-end lg:items-center flex-col-reverse"
        >
          <div className="w-64 h-80 rounded-4xl">
            <img
              className="w-full h-full rounded-4xl object-cover"
              src={left}
              alt="WorkOut Left"
              loading="lazy"
            />
          </div>

          <div className="text-center w-full hidden lg:block">
            <h3 className="text-sm stick-regular">
              Stay warm, stay fit. Our winter workout wear bleds insulation with
              flexebility to keep you going in the toughest conditions.
            </h3>
          </div>
        </motion.div>

        <motion.div
          ref={Dress}
          variants={parentVariants}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-lg:-rotate-90  text-center text-7xl font-bold stick-bold"
        >
          <h1 className="text-[200px] lg:text-[350px] leading-[300px] text-zinc-400 text-center">
            Dress Up
          </h1>
        </motion.div>
      </section>
    </AnimatePresence>
  );
}

export default WorkOut;
