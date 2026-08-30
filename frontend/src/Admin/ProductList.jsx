import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAdminProducts } from "../features/admin/adminSlice";
import { RiDeleteBinLine, RiPencilLine } from "@remixicon/react";

const ProductList = () => {
  const { products, loading, errors } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  console.log(products);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <PageTitle title="Admin Products" />

      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
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
                      <td className="px-4 py-4 font-medium text-gray-900">{index+1}</td>

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
                            className="rounded-full bg-black p-4 text-sm font-medium text-white transition hover:bg-gray-800"
                          >
                            <RiPencilLine size={18}/>
                          </Link>

                          <button className="rounded-full bg-red-500 p-4 text-sm font-medium text-white transition hover:bg-red-600">
                            <RiDeleteBinLine size={18}/>
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
  );
};

export default ProductList;
