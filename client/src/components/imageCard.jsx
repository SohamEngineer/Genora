"use client";
import React from "react";
import { cn } from "../lib/utils";
import { Download, Heart } from "lucide-react";

const ImageCard = React.memo(({ card, index, hovered, setHovered, user, toggleLike }) => (
  <div
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    className={cn(
      "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
      hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
    )}
  >
    {/* Image */}
    <img
      src={card.content}
      alt={card.prompt}
      className="object-cover absolute inset-0 w-full h-full"
    />

    {/* Overlay */}
    <div
      className={cn(
        "absolute inset-0 bg-black/50 flex flex-col justify-end py-6 px-4 transition-opacity duration-300",
        hovered === index ? "opacity-100" : "opacity-0"
      )}
    >
      <p className="text-base md:text-lg font-medium text-gray-200 mb-3">
        {card.prompt}
      </p>

      <div className="flex items-center justify-between ">
      <div className="flex items-center gap-2">

        <p className="text-sm text-gray-300">{card.likes?.length || 0}</p>
        <Heart
          onClick={() => toggleLike(card.id)}
          className={cn(
            "w-5 h-5 cursor-pointer transition-transform duration-200 hover:scale-125",
            card.likes?.includes(user?.id)
              ? "fill-red-500 text-red-500"
              : "text-gray-200"
          )}
        />
      </div>
        <div className="c"><Download/></div>
      </div>
    </div>
  </div>
));

ImageCard.displayName = "ImageCard";
export default ImageCard;
