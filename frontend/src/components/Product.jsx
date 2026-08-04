import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  // State to store rating value (Currently not being used because Rating component is disabled)
  const [rating, setRating] = useState(0);

  // Function to update rating state
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    // Entire card acts as a link to the product details page
    <Link to={product._id} className="group block">
      {/* ================= Product Card Container ================= */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* ================= Product Image Section ================= */}
        <div className="overflow-hidden bg-gray-100">
          <img
            // Display first image from product images array
            src={product.images[0].url}
            // Alternative text for accessibility
            alt={product.name}
            // Product image styling and hover animation
            className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-90"
          />
        </div>

        {/* ================= Product Details Section ================= */}
        <div className="space-y-1 p-2">
          {/* ================= Product Name =================*/}
          <h2 className="line-clamp-2 text-md font-semibold text-gray-900 flex items-center justify-center">
            {product.name}
          </h2>

          {/* ================= Product Price ================= */}
          <div className="flex items-center justify-center">
            <p className="text-sm font-bold text-black">Rs. {product.price}</p>
          </div>

          {/* ================= Rating and Reviews Section ================= */}
          <div className="mt-1 flex flex-col items-center gap-3">
            {/* ================= Rating Stars ================= */}
            <div className="flex items-center rounded-md px-2 py-1">
              <Rating
                // Average rating value of the product
                value={product.ratings}
                // Callback function when rating changes
                onRatingChange={handleRatingChange}
                // Disabled because this card only displays ratings
                disabled={true}
              />
            </div>

            {/* =================Number of Reviews ================= */}
            <span className="text-xs text-gray-500 -mt-2">
              ({product.numOfReviews}{" "}
              {product.numOfReviews === 1 ? "review" : "reviews"})
            </span>
          </div>

          {/* ================= View Details Button ================= */}
          <button className="w-full rounded-full bg-black py-3 text-xs font-medium uppercase tracking-wider text-white transition-all duration-300 hover:bg-gray-800">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Product;
