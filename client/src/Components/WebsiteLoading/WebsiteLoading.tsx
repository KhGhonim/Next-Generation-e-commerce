import { motion } from "framer-motion";
import { WebsiteLoadingProps } from "../../Types/ProjectTypes";

function WebsiteLoading({ IsClose }: WebsiteLoadingProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex  items-center justify-center">
      {IsClose ? <span className="loader z-50"></span> : null}

      <motion.div
        initial={{ x: 0 }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="fixed left-0 top-0 bottom-0 w-1/2 bg-black origin-left z-40"
      />
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="fixed right-0 top-0 bottom-0 w-1/2 bg-black origin-right z-40"
      />
    </div>
  );
}

export default WebsiteLoading;
