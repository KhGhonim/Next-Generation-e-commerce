import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { avatars } from "../../../Context/Context";
import Herosection from "../../../assets/Herosection.svg";
import VEXOVideo from "../../../assets/VEXO - Futuristic E-commerce Website by Muhammad Shofiuddoula for Zeyox Studio on Dribbble.mp4";

function HeroSection() {
  const [hero, sethero] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      sethero(prev => !prev);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleShopNavigation = () => {
    navigate('/shop');
  };

  return (
    <section className="w-full h-screen relative overflow-hidden SectionS">
      <div
        style={{
          clipPath:
            "polygon(0 0, 27% 0, 36% 10%, 64% 10%, 74% 0, 100% 0, 100% 88%, 100% 100%, 85% 100%, 0 100%, 0 100%)",
        }}
        className="absolute inset-5 z-10 overflow-hidden rounded-4xl bg-gradient-to-t from-gray-200 to-rose-100"
      >
        <div className="absolute top-2/12 lg:top-1/4 lg:flex lg:flex-col lg:-translate-y-1/4 lg:left-1/2 left-0 right-0 lg:-translate-x-1/2 lg:bottom-1/2">
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5, delay: 1, ease: "easeInOut" }}
            className=" text-center w-full"
          >
            <h1 className="text-3xl md:text-5xl  px-2 lg:text-7xl font-bold stick-bold">
              Dress Up Every Day
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5, delay: 1.2, ease: "easeInOut" }}
            className="flex gap-5 z-30 mt-10 justify-center items-center"
          >
            <motion.button
              onClick={handleShopNavigation}
              className="bg-gray-900 z-50 stick-regular hover:bg-amber-800 transition-all duration-300 ease-in-out cursor-pointer text-white px-5 py-2 rounded-4xl"
              aria-label="Go to shop"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now
            </motion.button>
            <motion.button
              onClick={handleShopNavigation}
              className="bg-zinc-500 z-50 stick-regular hover:bg-amber-800 transition-all duration-300 ease-in-out cursor-pointer text-white px-5 py-2 rounded-4xl"
              aria-label="Explore shop"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore now
            </motion.button>
          </motion.div>
        </div>

        {/* Hero Section for MD & LG Devices */}
        <motion.img
          initial={{
            scale: 1,
            opacity: 0,
          }}
          animate={{
            scale: 0.8,
            opacity: 1,
            transition: {
              duration: 0.5,
              ease: "easeInOut",
            },
          }}
          className={`hidden lg:block absolute object-cover ${
            hero
              ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3"
              : "top-11/12 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          } transition-all duration-1000 ease-in-out`}
          src={Herosection}
          alt="Hero Section"
        />

        {/* Hero Section for Mobile Devices */}
        <motion.img
          initial={{
            scale: 1,
            opacity: 0,
          }}
          animate={{
            scale: 0.8,
            opacity: 1,
            transition: {
              duration: 0.5,
              ease: "easeInOut",
            },
          }}
          className={` lg:hidden absolute object-cover top-7/12 left-1/2 transform -translate-x-1/2 -translate-y-1/4 transition-all duration-1000 ease-in-out`}
          src={Herosection}
          alt="Hero Section"
        />
        {/*Hero Section's Video */}
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5, delay: 1, ease: "easeInOut" }}
          className="absolute hidden lg:flex top-8/12 rounded-4xl left-1/2 transform translate-x-10/12 h-60 w-96 -translate-y-1/2"
        >
          <video
            autoPlay
            loop
            muted
            className="w-full rounded-4xl h-full object-cover"
            src={VEXOVideo}
          ></video>
        </motion.div>
        {/* Hero Section's Avatars */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5, delay: 1, ease: "easeInOut" }}
          className="absolute hidden lg:flex top-10/12 right-1/2 transform -translate-x-10/12  h-60 w-96 -translate-y-1/2"
        >
          <div className="flex items-center flex-col space-y-2">
            <div className="flex -space-x-3">
              {avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <p className="text-sm text-gray-600 stick-regular">
              Stay cozy without compromising your range of motion. Our women's
              winter range is perfect for those chilly outdoor workouts.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
