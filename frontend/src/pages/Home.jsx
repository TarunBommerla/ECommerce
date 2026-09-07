import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ImageSlider from "../components/ImageSlider";
import Product from "../components/Product";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, removeErrors } from "../features/products/productSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Home = () => {
  const { loading, error, products, productCount } = useSelector((state) => {
    return state.product;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct({ keyword: "" }));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="AXION - Home" />
          <Navbar />
          <ImageSlider />

          <div className="mx-auto max-w-8xl px-4 py-8 sm:px-6 sm:py-10 md:px-8 lg:px-12 xl:px-16">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-bold uppercase tracking-[0.15em] text-gray-900 sm:text-3xl md:text-4xl md:tracking-[0.2em]">
                Trending Now
              </h2>

              <Link
                to="/products"
                className="text-sm uppercase tracking-widest text-gray-600 transition hover:text-black"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {products.map((product, index) => {
                return <Product key={index} product={product} />;
              })}
            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
