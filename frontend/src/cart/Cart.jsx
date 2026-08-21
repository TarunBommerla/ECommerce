import React from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const tax = (subTotal * 0.09).toFixed(2);
  const shipping = subTotal > 500 ? 0 : 50;
  return (
    <>
      <PageTitle title="Cart" />
      <Navbar />
      {cartItems.length === 0 ? (
        <>
          <div className="flex min-h-[70vh] flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-lg">
            <p className="mb-6 text-2xl font-bold text-gray-800">
              Nothing here yet.
            </p>

            <p className="mb-8 text-gray-500">
              Looks like you haven't added any products to your cart yet.
            </p>

            <Link to="/products">
              <button className="rounded-xl bg-black px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-gray-800">
                View Products
              </button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
              {/* Cart Products */}
              <div className="lg:col-span-2">
                <div className="rounded-3xl border border-gray-200 bg-white shadow-lg">
                  {/* Header */}
                  <div className="border-b border-gray-200 px-6 py-5">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Your Cart
                    </h2>
                  </div>

                  {/* Table Header */}
                  <div className="hidden grid-cols-4 gap-4 border-b border-gray-200 bg-gray-100 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-gray-700 md:grid">
                    <div>Product</div>
                    <div className="text-center">Quantity</div>
                    <div className="text-center">Item Total</div>
                    <div className="text-center">Actions</div>
                  </div>

                  {/* Cart Items */}
                  <div className="p-4">
                    {cartItems &&
                      cartItems.map((item) => (
                        <CartItem item={item} key={item.name} />
                      ))}
                  </div>
                </div>
              </div>

              {/* Price Summary */}
              <div>
                <div className="sticky top-24 rounded-3xl border border-gray-200 bg-white p-6 shadow-lg">
                  <h3 className="mb-6 text-2xl font-bold text-gray-900">
                    Price Summary
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-gray-700">
                      <p>Sub-Total</p>
                      <p className="font-semibold">₹{subTotal.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center justify-between text-gray-700">
                      <p>Tax</p>
                      <p className="font-semibold">₹{tax}</p>
                    </div>

                    <div className="flex items-center justify-between text-gray-700">
                      <p>Shipping</p>
                      <p className="font-semibold">₹{shipping}</p>
                    </div>

                    <hr className="border-gray-200" />

                    <div className="flex items-center justify-between text-lg font-bold text-black">
                      <p>Total</p>
                      <p>
                        ₹{Number(subTotal) + Number(tax) + Number(shipping)}
                      </p>
                    </div>
                  </div>

                  <button className="mt-6 w-full rounded-xl bg-black py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-gray-800 active:scale-95">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Cart;
