import { IoIosHeartEmpty } from "react-icons/io";
import { CardProps } from "../../../Types/ProjectTypes";
import { useState } from "react";
import { IoHeartSharp } from "react-icons/io5";
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
        <div key={idx} className="w-72 h-96 rounded-4xl relative">
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
        </div>
      ))}
    </>
  );
}

export default Cards;
