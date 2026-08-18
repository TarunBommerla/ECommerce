import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div className="min-h-screen bg-gray-50 px-4 py-10">
            <PageTitle title={`${user.name} - Profile`} />
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-8 md:grid-cols-3 mt-20">
                {/* Left Section */}
                <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm flex flex-col justify-center">
                  <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">
                    My Profile
                  </h1>

                  <div className="flex flex-col items-center">
                    <img
                      src={
                        user.avatar.url
                          ? user.avatar.url
                          : "./images/profile.jpg"
                      }
                      alt="User Profile"
                      className="h-40 w-40 rounded-full border-4 border-gray-200 object-cover"
                    />

                    <Link
                      to="/profile/update"
                      className="mt-6 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                      Edit Profile
                    </Link>
                  </div>
                </div>

                {/* Right Section */}
                <div className="md:col-span-2 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                  <h2 className="mb-8 text-2xl font-bold text-gray-900">
                    Account Information
                  </h2>

                  <div className="space-y-8">
                    <div className="border-b border-gray-200 pb-4">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                        Username
                      </h3>
                      <p className="mt-2 text-lg font-medium text-gray-900">
                        {user.name}
                      </p>
                    </div>

                    <div className="border-b border-gray-200 pb-4">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                        Email
                      </h3>
                      <p className="mt-2 text-lg font-medium text-gray-900">
                        {user.email}
                      </p>
                    </div>

                    <div className="border-b border-gray-200 pb-4">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                        Joined On
                      </h3>
                      <p className="mt-2 text-lg font-medium text-gray-900">
                        {user?.createdAt?.split("T")[0]}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <Link
                      to="/myOrders"
                      className="flex-1 rounded-xl border border-black px-6 py-3 text-center font-semibold text-black transition hover:bg-black hover:text-white"
                    >
                      My Orders
                    </Link>

                    <Link
                      to="/password/update"
                      className="flex-1 rounded-xl bg-black px-6 py-3 text-center font-semibold text-white transition hover:bg-gray-800"
                    >
                      Change Password
                    </Link>
                  </div>
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

export default Profile;
