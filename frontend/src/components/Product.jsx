import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  const [rating, setRating] = useState(0);
  const handleRatingChange = (newRating) => {
    setRating(rating);
  };

  return (
    <Link to={product._id} className="group block">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Product Image */}
        <div className="overflow-hidden bg-gray-100">
          <img
            src={product.images[0].url}
            alt={product.name}
            className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-90"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-1 p-5">
          <h2 className="line-clamp-2 text-lg font-semibold text-gray-900 flex items-center justify-center">
            {product.name}
          </h2>

          <div className="flex items-center justify-center">
            <p className="text-xl font-bold text-black">₹{product.price}</p>
          </div>

          <div className="mt-1 flex flex-col items-center gap-3">
            {/* Rating Stars */}
            <div className="flex items-center rounded-md px-2 py-1">
              <Rating
                value={product.ratings}
                onRatingChange={handleRatingChange}
                disabled={true}
              />
            </div>

            {/* Review Count */}
            <span className="text-sm text-gray-500 -mt-2">
              ({product.numOfReviews}{" "}
              {product.numOfReviews === 1 ? "review" : "reviews"})
            </span>
          </div>
          <button className="w-full rounded-lg bg-black py-3 text-sm font-medium uppercase tracking-wider text-white transition-all duration-300 hover:bg-gray-800">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Product;
