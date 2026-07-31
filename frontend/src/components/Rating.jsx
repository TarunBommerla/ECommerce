import { RiStarFill } from "@remixicon/react";
import React, { useState } from "react";

const Rating = ({ value = 0, onRatingChange, disabled }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(value);

  const displayRating = hoverRating || selectedRating;

  // Handle Star Hover
  const handleMouseEnter = (rating) => {
    if (!disabled) {
      setHoverRating(rating);
    }
  };

  // Mouse Leave
  const handleMouseLeave = () => {
    if (!disabled) {
      setHoverRating(0);
    }
  };

  // Handle Click
  const handleClick = (rating) => {
    if (!disabled) {
      setSelectedRating(rating);

      if (onRatingChange) {
        onRatingChange(rating);
      }
    }
  };


  const generateStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {

      const fillPercentage = Math.min(
        Math.max(displayRating - i + 1, 0),
        1
      ) * 100;


      stars.push(
        <span
          key={i}
          className={`
            relative 
            inline-block
            cursor-pointer
            transition-transform
            duration-200
            hover:scale-110
            ${disabled ? "cursor-not-allowed" : ""}
          `}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(i)}
        >

          {/* Empty Star */}
          <RiStarFill
            size={18}
            className="text-gray-300"
          />


          {/* Filled Star */}
          <span
            className="absolute left-0 top-0 overflow-hidden"
            style={{
              width: `${fillPercentage}%`,
            }}
          >
            <RiStarFill
              size={18}
              className="text-yellow-400 fill-yellow-400"
            />
          </span>

        </span>
      );
    }

    return stars;
  };


  return (
    <div className="flex items-center gap-1">
      {generateStars()}
    </div>
  );
};


export default Rating;