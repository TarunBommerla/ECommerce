import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../features/order/orderSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import {
  removeErrors,
  removeSuccess,
  updateOrderStatus,
} from "../features/admin/adminSlice";

const UpdateOrder = () => {
  const [status, setStatus] = useState("");
  const { id } = useParams();

  const { order, loading: orderLoading } = useSelector((state) => state.order);
  const {
    success,
    loading: adminLoading,
    error,
  } = useSelector((state) => state.admin);
  const loading = orderLoading || adminLoading;
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, id]);

  const { shippingInfo = {}, orderItems = [], orderStatus, totalPrice } = order;

  const handleUpdateStatus = () => {
    if (!status) {
      toast.error("Please select a status", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    dispatch(updateOrderStatus({ id, status }));
  };
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
    if (success) {
      toast.success("status updated.", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, error, success, id]);

  return (
    <>
      <Navbar />
      <PageTitle title="Admin | Update Order" />

      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-gray-50 px-4 py-10">
          <div className="mx-auto max-w-6xl space-y-8">
            {/* Page Heading */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Update Order</h1>
              <p className="mt-2 text-gray-500">
                Manage customer orders and update delivery status.
              </p>
            </div>

            {/* Order Information */}
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-semibold text-gray-900">
                Order Information
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <p className="text-gray-700">
                  <strong>Order ID: </strong> {id}
                </p>

                <p className="text-gray-700">
                  <strong>Shipping Address: </strong> {shippingInfo.address},{" "}
                  {shippingInfo.city}, {shippingInfo.state},{" "}
                  {shippingInfo.country} - {shippingInfo.pinCode}
                </p>

                <p className="text-gray-700">
                  <strong>Phone: </strong>
                  {shippingInfo.phoneNo}
                </p>

                <p className="text-gray-700">
                  <strong>Order Status: </strong>
                  <span className="ml-2 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                    {orderStatus}
                  </span>
                </p>

                <p className="text-gray-700">
                  <strong>Payment Status: </strong>
                  <span className="ml-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Cash on Delivery
                  </span>
                </p>

                <p className="text-gray-700">
                  <strong>Total Price: </strong> ₹{totalPrice}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
              <div className="p-8">
                <h2 className="mb-6 text-2xl font-semibold text-gray-900">
                  Order Items
                </h2>

                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-black text-white">
                      <tr>
                        <th className="px-6 py-4 text-left">Image</th>
                        <th className="px-6 py-4 text-left">Product Name</th>
                        <th className="px-6 py-4 text-left">Quantity</th>
                        <th className="px-6 py-4 text-left">Price</th>
                      </tr>
                    </thead>

                    <tbody>
                      {orderItems.map((item) => (
                        <tr
                          key={item._id}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="px-6 py-4">
                            <img
                              src={item.image}
                              alt="Product Image"
                              className="h-16 w-16 rounded-lg border border-gray-200 object-cover"
                            />
                          </td>

                          <td className="px-6 py-4 font-medium text-gray-900">
                            {item.name}
                          </td>

                          <td className="px-6 py-4 text-gray-700">
                            {item.quantity}
                          </td>

                          <td className="px-6 py-4 text-gray-700">
                            ₹{item.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Update Status */}
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-semibold text-gray-900">
                Update Status
              </h2>

              <div className="flex flex-col gap-4 md:flex-row">
                <select
                  className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  disabled={orderStatus === "Delivered"}
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>

                <button
                  className="rounded-xl bg-black px-8 py-3 font-semibold text-white transition hover:bg-gray-800 active:scale-95"
                  onClick={handleUpdateStatus}
                  disabled={orderStatus === "Delivered"}
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default UpdateOrder;
