import { AnimatePresence, motion } from "framer-motion";
import Cards from "../Cards/Cards";
import { PhotosAndTitle } from "../../../Context/Context";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  addToWishlist,
  removeFromWishlist,
  WishlistItem,
} from "../../../store/slices/wishlistSlice";
import toast from "react-hot-toast";

function CardsGrid() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);

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

  const handleShopNavigation = () => {
    navigate("/shop");
  };

  const handleWishlistToggle = (card: WishlistItem) => {
    if (!isAuthenticated) {
      toast.error("Please log in to add items to your wishlist");
      navigate("/login");
      return;
    }

    // Check if item is already in wishlist
    const isInWishlist = wishlistItems.some((item) => item.id === card.id);

    if (isInWishlist) {
      // Remove from wishlist
      dispatch(removeFromWishlist(card.id));
      toast.success(`${card.name} removed from wishlist!`);
    } else {
      // Add to wishlist
      dispatch(
        addToWishlist({
          id: card.id.toString(),
          name: card.name,
          price: card.price,
          image: card.image,
          category: card.category,
          brand: "VEXO",
          rating: card.rating,
          reviews: card.reviews,
          sizes: card.sizes,
          colors: card.colors,
          description: card.description,
          inStock: true,
        })
      );
      toast.success(`${card.name} added to wishlist!`);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <section className="w-full pt-20 lg:pt-28 CardsGrid !overflow-hidden relative ">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="w-full h-24 lg:h-32 text-center flex justify-between items-center"
        >
          <motion.h6
            initial={{ opacity: 0, x: 100, y: 100 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="stick-regular w-1/5 text-xs"
          >
            New Arrivals
          </motion.h6>
          <motion.h1
            initial={{ opacity: 0, x: 100, y: 100 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="stick-bold text-lg  w-3/5 lg:text-6xl "
          >
            Fresh Fits For Your Next Workout!
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, x: 100, y: 100 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="stick-regular  w-1/5 text-xs "
          >
            All Brands
          </motion.h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100, y: 100 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100, y: 100 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="w-full h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 my-5 place-items-center  lg:px-24"
        >
          <Cards
            cards={PhotosAndTitle}
            onWishlistToggle={handleWishlistToggle}
            isAuthenticated={isAuthenticated}
          />
        </motion.div>

        <motion.div className="w-full h-32 flex gap-1.5 group justify-center items-center">
          <motion.button
            onClick={handleShopNavigation}
            className="bg-black cursor-pointer text-white px-10 py-3 rounded-3xl font-bold stick-regular"
            aria-label="See all brands in shop"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See All Brands
          </motion.button>
          <motion.button
            onClick={handleShopNavigation}
            className="bg-black cursor-pointer !text-3xl group-hover:animate-bounce text-white p-1.5 rounded-3xl"
            aria-label="Go to shop"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MdOutlineArrowOutward />
          </motion.button>
        </motion.div>
      </section>
    </AnimatePresence>
  );
}

export default CardsGrid;
