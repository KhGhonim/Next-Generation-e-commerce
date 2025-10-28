import { useEffect, useRef, useState } from "react";
import { PhoneDrawerProps } from "../../../Types/ProjectTypes";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { PCHeaderContent } from "../../../Context/Context";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import Theme from "./Theme";
import LanguageComponent from "./language";
import { FaUserCircle, FaUser, FaSignOutAlt, FaHeart, FaThLarge } from "react-icons/fa";
import { useAppDispatch } from "../../../store/hooks";
import { clearUser } from "../../../store/slices/userSlice";
import toast from "react-hot-toast";
import Currency from "./Currency";

function PhoneDrawer({ isDrawerOpen, setisDrawerOpen, user }: PhoneDrawerProps) {
  const [openSectionId, setOpenSectionId] = useState<number | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        dispatch(clearUser());
        toast.success("Logged out successfully!");
        navigate("/login");
        setisDrawerOpen(false);
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred during logout");
    }
  };

  const handleShopNavigation = (category?: string, subcategory?: string) => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (subcategory) params.set('subcategory', subcategory);
    
    const queryString = params.toString();
    navigate(`/shop${queryString ? `?${queryString}` : ''}`);
    setisDrawerOpen(false); // Close drawer after navigation
  };

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
                  className="w-full flex justify-between items-center py-3 border-b stick-regular cursor-pointer rounded-lg"
                  aria-label={`Toggle ${section.title} section`}
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
                        onClick={() => handleShopNavigation(section.title.toLowerCase(), item.title.toLowerCase())}
                        className="w-full text-left py-2 hover:bg-gray-100 stick-regular cursor-pointer rounded-lg"
                        aria-label={`Go to ${item.title} in ${section.title}`}
                      >
                        {item.title}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}

            {/* Account Section */}
            <div className="mt-6 mb-4">
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-900 stick-bold mb-4">Account</h3>
                <div className="space-y-2">
                  {user ? (
                    <>
                      <button
                        onClick={() => {
                          navigate('/profile');
                          setisDrawerOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer stick-regular"
                      >
                        <FaUserCircle className="text-gray-600" />
                        <span>Profile</span>
                      </button>
                      <button
                        onClick={() => {
                          navigate('/wishlist');
                          setisDrawerOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer stick-regular"
                      >
                        <FaHeart className="text-gray-600" />
                        <span>Wishlist</span>
                      </button>
                      {user?.role === "admin" && (
                        <button
                          onClick={() => {
                            navigate('/dashboard');
                            setisDrawerOpen(false);
                          }}
                          className="w-full flex items-center space-x-3 py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer stick-regular"
                        >
                          <FaThLarge className="text-gray-600" />
                          <span>Dashboard</span>
                        </button>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer stick-regular text-red-600"
                      >
                        <FaSignOutAlt />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        navigate('/login');
                        setisDrawerOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer stick-regular"
                    >
                      <FaUser className="text-gray-600" />
                      <span>Login</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Settings Section */}
            <div className="mt-6 space-y-4 stick-regular">
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
