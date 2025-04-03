import { useEffect, useState } from "react";
import { CardImages } from "../../../Context/Context";
import { AnimatePresence, motion } from "framer-motion";
function FloatingWords() {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % CardImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full pt-20 lg:pt-28  h-full SectionS flex justify-center items-center !overflow-hidden relative ">
      <div className="w-96 h-[30rem] lg:min-w-[35rem] lg:min-h-[40rem] bg-[#D6AD92] rounded-4xl overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={CardImages[imageIndex].id}
            src={CardImages[imageIndex].image}
            loading="lazy"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-4xl"
            alt={`Image ${imageIndex + 1}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </AnimatePresence>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-zinc-900/20 to-zinc-900/0" />
      </div>
      <div className="absolute top-1/5 max-lg:left-1/3 lg:left-1/2  w-full h-full  pointer-events-none">
        <h1 className="text-3xl max-lg:rotate-90  lg:text-9xl font-bold stick-bold text-zinc-300 fromLeftToRight">
          {" "}
          Dress Up As You Please
        </h1>
      </div>
      <div className="absolute top-9/12 max-lg:right-1/3 lg:right-1/2  w-full h-full pointer-events-none">
        <h1 className="text-3xl lg:text-8xl max-lg:rotate-90 font-bold stick-bold text-zinc-300 fromRightToLeft">
          {" "}
          Keep It Simple And Elegant
        </h1>
      </div>
    </section>
  );
}

export default FloatingWords;
