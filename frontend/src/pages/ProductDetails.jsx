import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Rating from "../components/Rating";
import { RiAddLine, RiSubtractLine } from "@remixicon/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getProductDetails,
  removeErrors,
} from "../features/products/productSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { addItemsToCart, removeMessage } from "../features/cart/cartSlice";

const ProductDetails = () => {
  const [userRating, setUserRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };

  const { loading, error, product } = useSelector((state) => state.product);
  const {
    loading: cartLoading,
    error: cartError,
    success,
    message,
    cartItems,
  } = useSelector((state) => state.cart);
  console.log(cartItems);
  
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
    return () => {
      dispatch(removeErrors());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }

    if (cartError) {
      toast.error(cartError, { position: "top-center", autoClose: 3000 });
    }
  }, [dispatch, error, cartError]);

  useEffect(() => {
    if (success) {
      toast.success(message, { position: "top-center", autoClose: 3000 });
      dispatch(removeMessage());
    }
  }, [dispatch, success, message]);

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader />
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <PageTitle title={"Product Details"} />
        <Navbar />
        <Footer />
      </>
    );
  }

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      toast.error("Quantity must be at least 1.", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
      return;
    }
    setQuantity((quantity) => quantity - 1);
  };

  const increaseQuantity = () => {
    if (product.stock <= quantity) {
      toast.error(
        "You've reached the maximum available stock for this product.",
        { position: "top-center", autoClose: 3000 },
      );
      dispatch(removeErrors());
      return;
    }
    setQuantity((quantity) => quantity + 1);
  };

  const addToCart = () => {
    dispatch(addItemsToCart({ id, quantity }));
  };

  return (
    <>
      <PageTitle title={`${product.name} - Details`} />
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Product Image */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <img
              src={product.images[0].url.replace("./", "/")}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>

            <p className="leading-relaxed text-gray-600">
              {product.description}
            </p>

            <p className="text-3xl font-bold text-black">
              Price: Rs. {product.price}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <Rating value={product.ratings} disabled={true} />
              <span className="text-sm text-gray-500">
                ({product.numOfReviews}
                {product.numOfReviews === 1 ? " Review" : " Reviews"})
              </span>
            </div>

            {/* Stock */}
            <div>
              <span
                className={
                  product.stock > 0
                    ? `"rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700"`
                    : "rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-red-700"
                }
              >
                {product.stock > 0
                  ? `In Stock ${product.stock} Available`
                  : "Out of Stock"}
              </span>
            </div>

            {/* Quantity */}
            {product.stock > 0 && (
              <>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-700">Quantity</span>

                  <div className="flex items-center overflow-hidden rounded-lg border border-gray-300">
                    <button
                      className="flex h-10 w-10 items-center justify-center border-r border-gray-300 transition hover:bg-gray-100"
                      onClick={decreaseQuantity}
                    >
                      <RiSubtractLine />
                    </button>

                    <input
                      type="text"
                      value={quantity}
                      readOnly
                      className="w-14 border-none text-center outline-none"
                    />

                    <button
                      className="flex h-10 w-10 items-center justify-center border-l border-gray-300 transition hover:bg-gray-100"
                      onClick={increaseQuantity}
                    >
                      <RiAddLine />
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Add to Cart */}
            <button
              className="rounded-lg bg-black px-8 py-3 font-medium text-white transition hover:bg-gray-800"
              onClick={addToCart}
              disabled={cartLoading}
            >
              {cartLoading ? "Adding to Cart" : "Add to Cart"}
            </button>

            {/* Review Form */}
            <form className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold">Write a Review</h3>

              <div className="mb-4">
                <Rating
                  value={0}
                  disabled={false}
                  onRatingChange={handleRatingChange}
                />
              </div>

              <textarea
                placeholder="Enter your review"
                className="mb-4 h-32 w-full resize-none rounded-lg border border-gray-300 p-3 outline-none transition focus:border-black"
              ></textarea>

              <button className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800">
                Submit Review
              </button>
            </form>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mt-16">
          <h3 className="mb-6 text-2xl font-bold text-gray-900">
            Customer Reviews
          </h3>

          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-3">
                    <Rating value={review.rating} disabled={true} />
                  </div>

                  <p className="mb-2 text-gray-700">{review.comment}</p>

                  <p className="text-sm font-medium text-gray-500">
                    {review.name}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;
