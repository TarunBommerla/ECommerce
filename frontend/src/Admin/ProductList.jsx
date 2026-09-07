import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  fetchAdminProducts,
  removeErrors,
  removeSuccess,
} from "../features/admin/adminSlice";
import { RiDeleteBinLine, RiPencilLine } from "@remixicon/react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const ProductList = () => {
  const { products, loading, error, deleteLoading } = useSelector(
    (state) => state.admin,
  );
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

  const handleDelete = (productId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product? This action cannot be undone.",
    );

    if (isConfirmed) {
      dispatch(deleteProduct(productId))
        .unwrap()
        .then(() => {
          toast.success("Product Deleted.", {
            position: "top-center",
            autoClose: 3000,
          });
          dispatch(removeSuccess());
        })
        .catch((error) => {
          toast.error(error?.message || "Failed to delete product", {
            position: "top-center",
            autoClose: 3000,
          });
          dispatch(removeErrors());
        });
    }
  };

  if (!products || products.length === 0) {
    return (
      <>
      <Navbar/>
      <PageTitle title="Admin | Products"/>
        <div className="flex min-h-[70vh] flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-lg">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Admin Products
          </h1>
          <p className="mb-8 text-lg text-gray-500">No Products Found</p>
          <p className="max-w-md text-sm text-gray-400">
            There are currently no products available. Create a new product to
            start managing your inventory.
          </p>
        </div>
        <Footer/>
      </>
    );
  }

  return (
    <>
      {loading || deleteLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <PageTitle title="Admin | Products" />

          <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="mx-auto max-w-7xl">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                  All Products
                </h1>
                <p className="mt-2 text-gray-600">
                  Manage all products available in AXION.
                </p>
              </div>

              {/* Products Table */}
              <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-300">
                    <thead>
                      <tr className="bg-black text-white">
                        <th className="px-4 py-4 text-left text-sm font-semibold uppercase">
                          SI No.
                        </th>
                        <th className="px-4 py-4 text-left text-sm font-semibold uppercase">
                          Product Image
                        </th>
                        <th className="px-4 py-4 text-left text-sm font-semibold uppercase">
                          Product Name
                        </th>
                        <th className="px-4 py-4 text-center text-sm font-semibold uppercase">
                          Price
                        </th>
                        <th className="px-4 py-4 text-center text-sm font-semibold uppercase">
                          Ratings
                        </th>
                        <th className="px-4 py-4 text-center text-sm font-semibold uppercase">
                          Category
                        </th>
                        <th className="px-4 py-4 text-center text-sm font-semibold uppercase">
                          Stock
                        </th>
                        <th className="px-4 py-4 text-center text-sm font-semibold uppercase">
                          Created At
                        </th>
                        <th className="px-4 py-4 text-center text-sm font-semibold uppercase">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {products.map((item, index) => (
                        <tr
                          className="border-b border-gray-200 transition hover:bg-gray-50"
                          key={item._id}
                        >
                          <td className="px-4 py-4 font-medium text-gray-900">
                            {index + 1}
                          </td>

                          <td className="px-4 py-4">
                            <img
                              src={item.images[0].url}
                              alt="product Image"
                              className="h-16 w-16 rounded-xl border border-gray-200 object-cover"
                            />
                          </td>

                          <td className="px-4 py-4 font-medium text-gray-800">
                            {item.name}
                          </td>

                          <td className="px-4 py-4 text-center font-semibold text-gray-900">
                            ₹{item.price}
                          </td>

                          <td className="px-4 py-4 text-center">
                            <span className="rounded-full px-3 py-1 text-sm font-medium">
                              {item.ratings}
                            </span>
                          </td>

                          <td className="px-4 py-4 text-center">
                            <span className="rounded-full px-3 py-1 text-sm font-medium">
                              {item.category}
                            </span>
                          </td>

                          <td className="px-4 py-4 text-center">
                            <span className="rounded-full px-3 py-1 text-sm font-medium">
                              {item.stock}
                            </span>
                          </td>

                          <td className="px-4 py-4 text-center text-gray-600">
                            {new Date(item.createdAt).toLocaleString()}
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <Link
                                to={`/admin/product/${item._id}`}
                                className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 active:scale-95 cursor-pointer"
                              >
                                Edit
                              </Link>

                              <button
                                className="active:scale-95 cursor-pointer rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                                onClick={() => handleDelete(item._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
};

export default ProductList;
