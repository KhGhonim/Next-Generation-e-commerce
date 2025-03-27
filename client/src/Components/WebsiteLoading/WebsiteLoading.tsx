import { motion } from "framer-motion";

function WebsiteLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex  items-center justify-center">
      <div className="absolute z-50 top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 loader " />

      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          delay: 0,
        }}
        className="fixed left-0 top-0 bottom-0 w-1/2 bg-black origin-left z-40"
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          delay: 0,
        }}
        className="fixed right-0 top-0 bottom-0 w-1/2 bg-black origin-right z-40"
      />
    </div>
  );
}

export default WebsiteLoading;
