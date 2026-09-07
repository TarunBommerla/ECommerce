import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminProducts,
  getAllReviews,
  removeErrors,
} from "../features/admin/adminSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const ReviewsList = () => {
  const { products, loading, error, reviews } = useSelector(
    (state) => state.admin,
  );
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  const handleReviewButton = (id) => {
    setSelectedProduct(id);
    dispatch(getAllReviews(id));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <PageTitle title="Admin | Product Reviews" />

          {products.length === 0 || !products ? (
            <div className="flex min-h-125 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white shadow-lg">
              <h1 className="mb-3 text-3xl font-bold text-gray-900">
                Admin Reviews
              </h1>
              <p className="text-lg font-medium text-gray-600">
                No Products Found
              </p>
              <p className="mt-2 text-center text-gray-400">
                Products with reviews will appear here once they are available.
              </p>
            </div>
          ) : (
            <div className="min-h-screen bg-gray-50 px-4 py-10">
              <div className="mx-auto max-w-7xl space-y-10">
                {/* Product Reviews Section */}
                <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
                  <h1 className="mb-6 text-3xl font-bold text-gray-900">
                    Product Reviews
                  </h1>

                  <div className="overflow-x-auto">
                    <table className="min-w-full overflow-hidden rounded-2xl">
                      <thead className="bg-black text-white">
                        <tr>
                          <th className="px-6 py-4 text-left">SI No.</th>
                          <th className="px-6 py-4 text-left">Product Name</th>
                          <th className="px-6 py-4 text-left">Product Image</th>
                          <th className="px-6 py-4 text-left">
                            Number of Reviews
                          </th>
                          <th className="px-6 py-4 text-left">Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {products.map((product, index) => (
                          <tr
                            key={product._id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="px-6 py-4">{index + 1}</td>

                            <td className="px-6 py-4 font-medium text-gray-900">
                              {product.name}
                            </td>

                            <td className="px-6 py-4">
                              <img
                                src={product.images[0].url}
                                alt={product.name}
                                className="h-16 w-16 rounded-xl border border-gray-200 object-cover"
                              />
                            </td>

                            <td className="px-6 py-4">
                              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                                {product.numOfReviews} Reviews
                              </span>
                            </td>

                            <td className="px-6 py-4">
                              <button
                                className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                                onClick={() => handleReviewButton(product._id)}
                              >
                                View Reviews
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Reviews of Product Section */}
                {selectedProduct && (
                  <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
                    <h1 className="mb-6 text-3xl font-bold text-gray-900">
                      Reviews of the Product
                    </h1>

                    {!reviews || reviews.length === 0 ? (
                      <div className="flex min-h-75 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white p-10 shadow-lg">
                        <h1 className="mb-3 text-2xl font-bold text-gray-900">
                          No Reviews Found
                        </h1>

                        <p className="max-w-md text-center text-gray-500">
                          Reviews will appear here once customers start
                          submitting feedback for this product.
                        </p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full overflow-hidden rounded-2xl">
                          <thead className="bg-black text-white">
                            <tr>
                              <th className="px-6 py-4 text-left">SI No.</th>
                              <th className="px-6 py-4 text-left">User Name</th>
                              <th className="px-6 py-4 text-left">Rating</th>
                              <th className="px-6 py-4 text-left">Comment</th>
                              <th className="px-6 py-4 text-left">Action</th>
                            </tr>
                          </thead>

                          <tbody>
                            {reviews.map((review, index) => (
                              <tr
                                key={review._id}
                                className="border-b border-gray-100 hover:bg-gray-50"
                              >
                                <td className="px-6 py-4">{index + 1}</td>

                                <td className="px-6 py-4 font-medium text-gray-900">
                                  {review.name}
                                </td>

                                <td className="px-6 py-4">
                                  <span className="rounded-full px-3 py-1 text-sm font-semibold text-yellow-700">
                                    ⭐ {review.rating}
                                  </span>
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                  {review.comment}
                                </td>

                                <td className="px-6 py-4">
                                  <button className="active:scale-95 cursor-pointer rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50">
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          <Footer />
        </>
      )}
    </>
  );
};

export default ReviewsList;
