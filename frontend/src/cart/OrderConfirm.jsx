import React from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckoutPath from "./CheckoutPath";
import { useSelector } from "react-redux";

const OrderConfirm = () => {
  const { ShippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const tax = (subTotal * 0.09).toFixed(2);
  const shipping = subTotal > 500 ? 0 : 50;

  return (
    <>
      <PageTitle title="Order Confirm" />
      <Navbar />
      <CheckoutPath activePath={1} />
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">
            Order Confirmation
          </h1>

          <div className="space-y-6">
            {/* Shipping Details */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
              <table className="w-full">
                <caption className="bg-black px-6 py-4 text-left text-md font-semibold text-white">
                  Shipping Details
                </caption>

                <thead className="bg-gray-100 text-md">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Phone</th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Address
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-t border-gray-200 text-sm">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{ShippingInfo.phoneNumber}</td>
                    <td className="px-6 py-4">
                      {ShippingInfo.address}, {ShippingInfo.city},{" "}
                      {ShippingInfo.state}, {ShippingInfo.country} -{" "}
                      {ShippingInfo.pinCode}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Cart Items */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
              <table className="w-full">
                <caption className="bg-black px-6 py-4 text-left text-md font-semibold text-white">
                  Cart Items
                </caption>

                <thead className="bg-gray-100 text-md">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Image</th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Product Name
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">Price</th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Total Price
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {cartItems.map((item) => (
                    <tr
                      key={item.product}
                      className="border-t border-gray-200 hover:bg-gray-50 text-sm"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-xl border border-gray-200 object-cover"
                        />
                      </td>

                      <td className="px-6 py-4 font-medium">{item.name}</td>

                      <td className="px-6 py-4">₹{item.price}</td>

                      <td className="px-6 py-4">{item.quantity}</td>

                      <td className="px-6 py-4 font-semibold">
                        ₹{item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Order Summary */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
              <table className="w-full">
                <caption className="bg-black px-6 py-4 text-left text-md font-semibold text-white">
                  Order Summary
                </caption>

                <thead className="bg-gray-100 text-md">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">
                      Sub-Total
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Shipping Charges
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">GST</th>
                    <th className="px-6 py-4 text-left font-semibold">Total</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-t border-gray-200 text-sm font-semibold ">
                    <td className="px-6 py-4">₹{subTotal}</td>
                    <td className="px-6 py-4">₹{shipping==0?"Free":shipping}</td>
                    <td className="px-6 py-4">₹{tax}</td>
                    <td className="px-6 py-4 text-green-600">
                      ₹{Number(subTotal) + Number(tax) + Number(shipping)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button className="w-full max-w-md rounded-xl bg-black px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-gray-800">
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderConfirm;
