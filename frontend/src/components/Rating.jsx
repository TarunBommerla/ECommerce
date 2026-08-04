import { RiStarFill } from "@remixicon/react";
import React, { useState } from "react";

const Rating = ({ value = 0, onRatingChange, disabled }) => {
  // Stores the rating currently being hovered over
  const [hoverRating, setHoverRating] = useState(0);

  // Stores the selected rating
  const [selectedRating, setSelectedRating] = useState(value);

  // Display hovered rating if available, otherwise display the selected rating
  const displayRating = hoverRating || selectedRating;

  // ======================================================
  // Handle mouse hover on a star
  // Shows temporary rating preview
  // ======================================================
  const handleMouseEnter = (rating) => {
    if (!disabled) {
      setHoverRating(rating);
    }
  };

  // ======================================================
  // Reset hover rating when mouse leaves star
  // ======================================================
  const handleMouseLeave = () => {
    if (!disabled) {
      setHoverRating(0);
    }
  };

  // ======================================================
  // Handle star click
  // Updates selected rating and notifies parent component
  // ======================================================
  const handleClick = (rating) => {
    if (!disabled) {
      // Save selected rating
      setSelectedRating(rating);

      // Send selected rating to parent component
      if (onRatingChange) {
        onRatingChange(rating);
      }
    }
  };

  // ======================================================
  // Generate 5 stars dynamically
  // Supports decimal ratings like:
  // 3.5, 4.2, 4.8 etc.
  // ======================================================
  const generateStars = () => {
    const stars = [];

    // Loop through 5 stars
    for (let i = 1; i <= 5; i++) {
      const fillPercentage =
        Math.min(Math.max(displayRating - i + 1, 0), 1) * 100;

      stars.push(
        <span
          key={i}
          // Star styling
          className={`relative inline-block cursor-pointer transition-transform duration-200 hover:scale-110 ${disabled ? "cursor-not-allowed" : ""}`}
          // Hover events
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          // Click event
          onClick={() => handleClick(i)}
        >
          {/* ================= Empty Star ================= */}
          <RiStarFill size={16} className="text-gray-300 fill-gray-300" />

          {/* ================= Filled Star =================
              Width changes based on fillPercentage
              to support decimal ratings
          */}
          <span
            className="absolute left-0 top-0 overflow-hidden"
            style={{
              width: `${fillPercentage}%`,
            }}
          >
            <RiStarFill size={16} className="text-yellow-400 fill-yellow-400" />
          </span>
        </span>,
      );
    }

    return stars;
  };

  // ======================================================
  // Render Rating Component
  // ======================================================
  return (
    <div className="flex items-center gap-1">
      {/* ================= Display generated stars ================= */}
      {generateStars()}
    </div>
  );
};

export default Rating;
