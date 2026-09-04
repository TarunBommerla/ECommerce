import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessage,
  deleteOrder,
  fetchAllOrders,
  removeErrors,
  removeSuccess,
} from "../features/admin/adminSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const OrdersList = () => {
  const { orders, loading, error, success, message } = useSelector(
    (state) => state.admin,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this order? This action cannot be undone.",
    );
    if (confirm) {
      dispatch(deleteOrder(id));
    }
  };
  useEffect(() => {
    if (success) {
      toast.success(message, { position: "top-center", autoClose: 3000 });
      dispatch(removeSuccess());
      dispatch(clearMessage());
      dispatch(fetchAllOrders());
    }
  }, [dispatch, message, success]);

  if (orders && orders.length === 0) {
    return (
      <>
        <Navbar />
        <PageTitle title="Admin | All Orders" />

        <div className="flex min-h-125 flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white shadow-lg">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            No Orders Found
          </h2>

          <p className="text-center text-gray-500">
            No customer orders are available at the moment.
          </p>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <PageTitle title="Admin | All Orders" />

          <div className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="mx-auto max-w-7xl">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">All Orders</h1>
                <p className="mt-2 text-gray-500">
                  Manage and track all customer orders.
                </p>
              </div>

              {/* Table */}
              <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-black text-white">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          SI No.
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Order ID
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Total Price
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Number of Items
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {orders &&
                        orders.map((order, index) => (
                          <tr
                            key={order._id}
                            className="border-b border-gray-100 transition hover:bg-gray-50"
                          >
                            <td className="px-6 py-4 text-gray-700">
                              {index + 1}
                            </td>

                            <td className="px-6 py-4 font-medium text-gray-900">
                              {order._id}
                            </td>

                            <td className="px-6 py-4">
                              <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                                {order.orderStatus}
                              </span>
                            </td>

                            <td className="px-6 py-4 font-medium text-gray-800">
                              ₹{order.totalPrice}
                            </td>

                            <td className="px-6 py-4 text-gray-600">
                              {order.orderItems.length}
                            </td>

                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center gap-3">
                                <Link
                                  to={`/admin/order/${order._id}`}
                                  className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 active:scale-95 cursor-pointer"
                                >
                                  Edit
                                </Link>

                                <button
                                  className="active:scale-95 cursor-pointer rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                                  onClick={() => handleDelete(order._id)}
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

export default OrdersList;
