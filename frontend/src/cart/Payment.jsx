import React from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import CheckoutPath from "./CheckoutPath";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Payment = () => {
  const orderItem = JSON.parse(sessionStorage.getItem("OrderItem"));

  const navigate = useNavigate();
  return (
    <>
      <PageTitle title="Payment Processing" />
      <Navbar />
      <CheckoutPath activePath={2} />

      <div className="min-h-[60vh] bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
          <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Payment
          </h1>

          <div className="space-y-4">
            <Link
              to="/order/confirm"
              className="block w-full rounded-xl border border-gray-300 py-3 text-center text-sm font-semibold uppercase tracking-wider text-gray-700 transition hover:bg-gray-100 active:scale-95 cursor-pointer"
            >
              Back
            </Link>

            <Link to="/process/payment/success">
              <button className="w-full rounded-xl bg-black py-4 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-gray-800 active:scale-95 cursor-pointer">
                {"Place Order (COD)"}
              </button>
            </Link>
          </div>

          <div className="mt-6 rounded-xl bg-gray-100 p-4 text-center">
            <p className="text-sm text-gray-600">Amount Payable</p>
            <p className="mt-1 text-2xl font-bold text-black">
              ₹{orderItem.total}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Payment;
