import { RiErrorWarningLine } from "@remixicon/react";
import React from "react";

const NoProduct = ({ keyword }) => {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4">
      <div className="max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        
        {/* Icon */}
        <div className="mb-5 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <RiErrorWarningLine
              size={36}
              className="text-gray-600"
            />
          </div>
        </div>

        {/* Heading */}
        <h3 className="mb-3 text-2xl font-bold text-gray-900">
          No Products Found
        </h3>

        {/* Description */}
        <p className="leading-relaxed text-gray-600">
          {keyword ? (
            <>
              We couldn't find any products matching{" "}
              <span className="font-semibold text-black">
                "{keyword}"
              </span>
              . Try a different keyword or explore our complete
              collection to discover something you'll love.
            </>
          ) : (
            "No products are available at the moment. Please check back later."
          )}
        </p>
      </div>
    </div>
  );
};

export default NoProduct;