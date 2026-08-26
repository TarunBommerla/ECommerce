import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { RiExternalLinkLine } from "@remixicon/react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMyOrders, removeErrors } from "../features/order/orderSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const MyOrders = () => {
  const { orders, loading, error } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMyOrders());
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);
  return (
    <>
      <Navbar />
      <PageTitle title="My Orders" />

      {loading ? (
        <Loader />
      ) : orders.length > 0 ? (
        <div className="min-h-[80vh] bg-gray-50 px-4 py-10">
          <div className="mx-auto max-w-6xl">
            {/* Heading */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="mt-2 text-gray-600">
                View and track all your orders.
              </p>
            </div>

            {/* Orders Table */}
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full min-w-175">
                  <thead>
                    <tr className="border-b bg-black text-white">
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                        Items Count
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                        Total Price
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                        View Order
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((item) => (
                      <tr
                        className="border-b transition hover:bg-gray-50"
                        key={item._id}
                      >
                        <td className="px-6 py-5 font-medium text-gray-900">
                          {item._id}
                        </td>

                        <td className="px-6 py-5 text-center text-gray-700">
                          {item.orderItems.length}
                        </td>

                        <td className="px-6 py-5 text-center">
                          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                            {item.orderStatus}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-center font-semibold text-gray-900">
                          ₹{item.totalPrice}
                        </td>

                        <td className="px-6 py-5 text-center">
                          <Link
                            to={`/order/${item._id}`}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition hover:bg-gray-800"
                          >
                            <RiExternalLinkLine size={18} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-lg">
          <p className="mb-6 text-2xl font-semibold text-gray-800">
            No Orders Found
          </p>

          <p className="mb-8 max-w-md text-gray-500">
            Looks like you haven't placed any orders yet. Start shopping and
            your orders will appear here.
          </p>

          <Link to="/products">
            <button className="rounded-xl bg-black px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-gray-800 active:scale-95 cursor-pointer">
              View Products
            </button>
          </Link>
        </div>
      )}

      <Footer />
    </>
  );
};

export default MyOrders;
