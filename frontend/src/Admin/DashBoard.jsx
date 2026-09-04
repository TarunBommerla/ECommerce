import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import {
  RiAddBoxLine,
  RiCashLine,
  RiCheckboxCircleLine,
  RiDashboardLine,
  RiErrorWarningLine,
  RiInbox2Line,
  RiShoppingCart2Line,
  RiStarLine,
  RiTeamLine,
} from "@remixicon/react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminProducts,
  fetchAllOrders,
} from "../features/admin/adminSlice";

const DashBoard = () => {
  const { products, orders, totalAmount } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const outOfStock = products.filter((product) => product.stock === 0).length;
  const inStock = products.filter((product) => product.stock > 0).length;
  const totalReviews = products.reduce(
    (acc, product) => acc + (product.reviews.length || 0),
    0,
  );
  return (
    <>
      <Navbar />
      <PageTitle title="Admin | Dashboard" />

      <div className="min-h-screen bg-gray-50 px-8 py-10">
        <div className="mx-auto flex max-w-8xl gap-6">
          {/* Sidebar */}
          <div className="w-72 rounded-3xl border border-gray-200 bg-white p-6 shadow-lg">
            <div className="mb-8 flex items-center gap-3 border-b border-gray-200 pb-4 text-lg font-bold text-black">
              <RiDashboardLine className="text-2xl" />
              Admin Dashboard
            </div>

            <nav className="space-y-8">
              {/* Products */}
              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                  Products
                </h3>

                <div className="space-y-2">
                  <Link
                    to="/admin/products"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition hover:bg-black hover:text-white"
                  >
                    <RiInbox2Line />
                    All Products
                  </Link>

                  <Link
                    to="/admin/products/create"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition hover:bg-black hover:text-white"
                  >
                    <RiAddBoxLine />
                    Create Product
                  </Link>
                </div>
              </div>

              {/* Users */}
              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                  Users
                </h3>

                <Link
                  to="/admin/users"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition hover:bg-black hover:text-white"
                >
                  <RiTeamLine />
                  All Users
                </Link>
              </div>

              {/* Orders */}
              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                  Orders
                </h3>

                <Link
                  to="/admin/orders"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition hover:bg-black hover:text-white"
                >
                  <RiShoppingCart2Line />
                  All Orders
                </Link>
              </div>

              {/* Reviews */}
              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                  Reviews
                </h3>

                <Link
                  to="/admin/reviews"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition hover:bg-black hover:text-white"
                >
                  <RiStarLine />
                  All Reviews
                </Link>
              </div>
            </nav>
          </div>

          {/* Dashboard Content */}
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {/* Total Products */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                <RiInbox2Line className="mb-4 text-4xl text-black" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Total Products
                </h3>
                <p className="mt-3 text-3xl font-bold text-black">{totalProducts}</p>
              </div>

              {/* Total Orders */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                <RiShoppingCart2Line className="mb-4 text-4xl text-black" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Total Orders
                </h3>
                <p className="mt-3 text-3xl font-bold text-black">{totalOrders}</p>
              </div>

              {/* Total Reviews */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                <RiStarLine className="mb-4 text-4xl text-black" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Total Reviews
                </h3>
                <p className="mt-3 text-3xl font-bold text-black">{totalReviews}</p>
              </div>

              {/* Revenue */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                <RiCashLine className="mb-4 text-4xl text-black" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Total Revenue
                </h3>
                <p className="mt-3 text-3xl font-bold text-black">₹{totalAmount}</p>
              </div>

              {/* Out of Stock */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                <RiErrorWarningLine className="mb-4 text-4xl text-red-500" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Out Of Stock
                </h3>
                <p className="mt-3 text-3xl font-bold text-red-500">{outOfStock}</p>
              </div>

              {/* In Stock */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                <RiCheckboxCircleLine className="mb-4 text-4xl text-green-500" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  In Stock
                </h3>
                <p className="mt-3 text-3xl font-bold text-green-500">{inStock}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DashBoard;
