import React, { useEffect } from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderDetails, removeErrors } from "../features/order/orderSlice";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { orderId } = useParams();
  const { order, loading, error } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderDetails(orderId));
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error, orderId]);

  const {
    shippingInfo = {},
    orderItems = [],
    paymentInfo = {},
    orderStatus,
    totalPrice,
    taxPrice,
    shippingPrice,
    itemPrice,
    paidAt,
  } = order;

  const paymentStatus =
    paymentInfo?.status === "Succeeded" ? "Paid" : "Not Paid";
  const finalOrderStatus =
    paymentStatus === "Not Paid" ? "Cancelled" : orderStatus;

  return (
    <>
      <PageTitle title="Order Details" />
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Order Items Table */}
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
            <div className="border-b border-gray-200 px-6 py-5">
              <h2 className="text-2xl font-bold text-gray-900">Order Items</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Image</th>
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-center font-semibold">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-center font-semibold">
                      Price
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {orderItems.map((item) => (
                    <tr
                      className="border-b border-gray-200 hover:bg-gray-50"
                      key={item.product}
                    >
                      <td className="px-6 py-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-xl border border-gray-200 object-cover"
                        />
                      </td>

                      <td className="px-6 py-4 font-medium text-gray-900">
                        {item.name}
                      </td>

                      <td className="px-6 py-4 text-center">{item.quantity}</td>

                      <td className="px-6 py-4 text-center font-semibold">
                        ₹{item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
            <div className="border-b border-gray-200 px-6 py-5">
              <h2 className="text-2xl font-bold text-gray-900">
                Shipping Info
              </h2>
            </div>

            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-200">
                  <th className="w-1/3 px-6 py-4 text-left font-semibold text-gray-700">
                    Address
                  </th>
                  <td className="px-6 py-4 text-gray-600">
                    {shippingInfo.address}, {shippingInfo.city},{" "}
                    {shippingInfo.state}, {shippingInfo.country}-{" "}
                    {shippingInfo.pinCode}
                  </td>
                </tr>

                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">
                    Phone No
                  </th>
                  <td className="px-6 py-4 text-gray-600">
                    {shippingInfo.phoneNo}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Order Summary */}
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
            <div className="border-b border-gray-200 px-6 py-5">
              <h2 className="text-2xl font-bold text-gray-900">
                Order Summary
              </h2>
            </div>

            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-200">
                  <th className="w-1/3 px-6 py-4 text-left font-semibold text-gray-700">
                    Order Status
                  </th>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      {finalOrderStatus}
                    </span>
                  </td>
                </tr>

                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">
                    Payment Status
                  </th>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                      Cash on Delivery
                    </span>
                  </td>
                </tr>

                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">
                    Paid At
                  </th>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(paidAt).toLocaleString()}
                  </td>
                </tr>

                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">
                    Product Price
                  </th>
                  <td className="px-6 py-4">₹{itemPrice}</td>
                </tr>

                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">
                    Tax
                  </th>
                  <td className="px-6 py-4">₹{taxPrice}</td>
                </tr>

                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">
                    Shipping
                  </th>
                  <td className="px-6 py-4">₹{shippingPrice}</td>
                </tr>

                <tr className="bg-gray-50">
                  <th className="px-6 py-5 text-left text-lg font-bold text-gray-900">
                    Total Price
                  </th>
                  <td className="px-6 py-5 text-lg font-bold text-green-600">
                    ₹{totalPrice}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetails;
