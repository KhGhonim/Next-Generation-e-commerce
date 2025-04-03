import { IoIosHeartEmpty } from "react-icons/io";
import { CardProps } from "../../../Types/ProjectTypes";
import { useState } from "react";
import { IoHeartSharp } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
function Cards({ cards }: CardProps) {
  const [likedCards, setLikedCards] = useState(new Set());

  const handleLikeToggle = (id: number) => {
    setLikedCards((prevLikedCards) => {
      const newLikedCards = new Set(prevLikedCards);
      if (newLikedCards.has(id)) {
        newLikedCards.delete(id);
      } else {
        newLikedCards.add(id);
      }
      return newLikedCards;
    });
  };

  return (
    <>
      {cards.map((card, idx) => (
        <div key={idx} className="w-72 h-96 rounded-4xl relative stick-regular">
          <img
            src={card.image}
            loading="lazy"
            className="w-full h-full object-cover rounded-4xl"
            alt={`${card.title}`}
          />

          <div
            onClick={() => handleLikeToggle(card.id)}
            className="absolute cursor-pointer top-5 right-5 bg-zinc-200 w-10 h-10 flex justify-center items-center  rounded-4xl"
          >
            {likedCards.has(card.id) ? (
              <IoHeartSharp size={20} className="text-red-600" />
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
