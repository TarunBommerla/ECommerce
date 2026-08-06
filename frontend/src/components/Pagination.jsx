import { RiArrowLeftSLine, RiArrowRightSLine, RiSkipLeftLine, RiSkipRightLine } from "@remixicon/react";
import React from "react";
import { useSelector } from "react-redux";

const Pagination = ({ currentPage, onPageChange }) => {
  const { totalPages, products } = useSelector((state) => state.product);

  // Hide pagination if there are no products or only one page
  if (!products?.length || totalPages <= 1) {
    return null;
  }

  // Generate page numbers around the current page
  const getPageNumbers = () => {
    const pageNumbers = [];
    const pageWindow = 2;

    const startPage = Math.max(1, currentPage - pageWindow);
    const endPage = Math.min(totalPages, currentPage + pageWindow);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="mt-12 flex flex-col items-center gap-4">
      {/* Page Info */}
      <p className="text-sm text-gray-500">
        Page{" "}
        <span className="font-semibold text-black">{currentPage}</span>{" "}
        of{" "}
        <span className="font-semibold text-black">{totalPages}</span>
      </p>

      {/* Pagination Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-gray-200 bg-white p-2 shadow-lg">
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="rounded-full p-2 text-sm transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
        >
          <RiSkipLeftLine />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-full p-2 text-sm transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
        >
          <RiArrowLeftSLine />
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`rounded-full py-2 px-4  text-sm font-semibold transition-all duration-200 ${
              currentPage === number
                ? "scale-105 bg-black text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {number}
          </button>
        ))}

        {/* Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-full p-2 text-sm transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
        >
          <RiArrowRightSLine />
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="rounded-full p-2 text-sm transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
        >
          <RiSkipRightLine />
        </button>
      </div>
    </div>
  );
};

export default Pagination;