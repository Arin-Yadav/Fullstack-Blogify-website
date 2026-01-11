import React from "react";

const Card = ({ card }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl p-5 flex flex-col space-y-6 cursor-pointer">
      <div className="flex justify-between">
        <h4 className="font-bold text-xs sm:text-sm">{card.category}</h4>
        <p className="text-xs">{card.views} views</p>
      </div>
      <div className="flex flex-col space-y-2">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
          {card.title}
        </h2>
        <p className="text-xs sm:text-sm text-gray-800">{card.description}</p>
      </div>
      <div className="flex justify-between">
        <h4 className="font-bold text-xs sm:text-sm">
          👩‍💻 <span>{card.author}</span>
        </h4>
        <p className="text-xs">{card.date}</p>
      </div>
    </div>
  );
};

export default Card;
