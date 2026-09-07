import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import { getProduct, removeErrors } from "../features/products/productSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import NoProduct from "../components/NoProduct";
import Pagination from "../components/Pagination";

const Products = () => {
  const { loading, error, products, resultsPerPage, productCount } =
    useSelector((state) => state.product);
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "";
  const page = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(page);
  const navigate = useNavigate();
  const categories = [
    "T-Shirts",
    "Shirts",
    "Hoodies",
    "Jackets",
    "Jeans",
    "Trousers",
    "Shorts",
    "Sneakers",
    "Accessories",
  ];

  useEffect(() => {
    dispatch(getProduct({ keyword, page, category }));
  }, [dispatch, keyword, page, category]);

  useEffect(() => {
    if (error) {
      toast.error(error?.message || error, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword]);

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      const newSearchParams = new URLSearchParams(location.search);
      if (page === 1) {
        newSearchParams.delete("page");
      } else {
        newSearchParams.set("page", page);
      }
      navigate(`/products?${newSearchParams.toString()}`);
    }
  };

  const handleCategoryClick = (category) => {
    const params = new URLSearchParams();
    if (category !== "All") {
      params.set("category", category);
    }
    params.set("page", "1");
    navigate(`/products?${params.toString()}`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="All Products" />
          <Navbar />

          <div className="mx-auto w-full max-w-screen-2xl px-3 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
              {/* Categories Section */}
              <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <h3 className="mb-5 text-lg font-bold uppercase tracking-wider text-gray-900">
                  Categories
                </h3>

                <ul className="flex flex-wrap gap-2 lg:block lg:space-y-2">
                  {categories.map((category) => {
                    return (
                      <li
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-black hover:text-white"
                      >
                        {category}
                      </li>
                    );
                  })}
                </ul>
              </aside>

              {/* Products Section */}
              <section>
                {/* Products Count / Heading */}
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Products</h2>

                  {products?.length > 0 && (
                    <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
                      {products.length} Products
                    </span>
                  )}
                </div>

                {/* Products Grid */}
                {Array.isArray(products) && products?.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                    {products.map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
                  </div>
                ) : (
                  <NoProduct keyword={keyword} />
                )}

                {/* Pagination */}
                <div className="mt-8 flex justify-center overflow-x-auto">
                  <Pagination
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              </section>
            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
};

export default Products;
