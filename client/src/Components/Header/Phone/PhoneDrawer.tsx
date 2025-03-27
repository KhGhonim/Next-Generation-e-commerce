import { useEffect, useRef, useState } from "react";
import { PhoneDrawerProps } from "../../../Types/ProjectTypes";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { PCHeaderContent } from "../../../Context/Context";
import { CgClose } from "react-icons/cg";
import Theme from "./Theme";
import LanguageComponent from "./language";
import Currency from "./Currency";

function PhoneDrawer({ isDrawerOpen, setisDrawerOpen }: PhoneDrawerProps) {
  const [openSectionId, setOpenSectionId] = useState<number | null>(null);

  const toggleSection = (id: number) => {
    setOpenSectionId(openSectionId === id ? null : id);
  };

  const Ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (Ref.current && !Ref.current.contains(event.target as Node | null)) {
        setisDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          ref={Ref}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl h-[80vh] overflow-hidden"
        >
          {/* Drawer Handle */}
          <div className="w-full h-2  rounded-full my-2 flex justify-center items-center">
            <button
              onClick={() => setisDrawerOpen(false)}
              className="absolute top-4 right-4"
            >
              <CgClose size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Main Content */}
          <div className="h-full overflow-y-auto px-4 pt-8">
            {PCHeaderContent.map((section) => (
              <div key={section.id} className="mb-4">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex justify-between items-center py-3 border-b"
                >
                  <span className="font-semibold">{section.title}</span>
                  {openSectionId === section.id ? (
                    <BiChevronDown size={20} />
                  ) : (
                    <BiChevronRight size={20} />
                  )}
                </button>

                {openSectionId === section.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        className="w-full text-left py-2 hover:bg-gray-100 rounded"
                      >
                        {item.title}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}

            {/* Settings Section */}
            <div className="mt-6 space-y-4">
              <Theme />
              <LanguageComponent />
              <Currency />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PhoneDrawer;
