import { IoIosHeartEmpty } from "react-icons/io";
import { CardProps } from "../../../Types/ProjectTypes";
import { IoHeartSharp } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { WishlistItem } from "../../../store/slices/wishlistSlice";
import { useAppSelector } from "../../../store/hooks";

interface CardsProps extends CardProps {
  onWishlistToggle?: (card: WishlistItem) => void;
  isAuthenticated?: boolean;
}

function Cards({ cards, onWishlistToggle, isAuthenticated }: CardsProps) {
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);

  const isInWishlist = (cardId: string) => {
    return wishlistItems.some(item => item.id === cardId);
  };

  const handleLikeToggle = (card: WishlistItem) => {
    
    if (onWishlistToggle) {
      onWishlistToggle(card);
    }
  };

  return (
    <>
      {cards.map((card, idx) => (
        <div key={idx} className="w-72 h-96 rounded-4xl relative stick-regular">
          <img
            src={card.image}
            loading="lazy"
            className="w-full h-full object-cover rounded-4xl"
            alt={`${card.title} Image`}
          />

          <div
            onClick={() => handleLikeToggle({
              id: card.id.toString(),
              name: card.title,
              price: card.price,
              image: card.image,
              category: card.category,
              brand: 'VEXO',
              rating: card.rating,
              reviews: card.reviews,
              sizes: card.sizes,
              colors: card.colors,
              description: card.description,
              inStock: true,
              addedAt: new Date().toISOString(),
            })}
            className={`absolute cursor-pointer top-5 right-5 w-10 h-10 flex justify-center items-center rounded-4xl transition-colors ${
              isInWishlist(card.id.toString()) 
                ? 'bg-red-500' 
                : 'bg-zinc-200'
            } ${
              !isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isInWishlist(card.id.toString()) ? (
              <IoHeartSharp size={20} className="text-white" />
            ) : (
              <IoIosHeartEmpty size={20} className="text-black" />
            )}
          </div>

          <Link
            to={`/product/${card.id}?size=S`}
            className="absolute bottom-5 left-5 cursor-pointer group right-5 rounded-4xl bg-zinc-200 transition-all hover:bg-zinc-300 duration-300 ease-in-out h-12 flex justify-between items-center  px-4"
          >
            <div className="flex gap-1.5 flex-col ">
              <p className="font-bold text-sm text-black">{card.title}</p>
              <p className="text-xs text-black">{card.price}</p>
            </div>
            <MdOutlineKeyboardArrowRight
              size={20}
              className="text-black group-hover:translate-x-1 transition-all duration-300 ease-in-out"
            />
          </Link>
        </div>
      ))}
    </>
  );
}

export default Cards;
