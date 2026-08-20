import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeErrors,
  removeSuccess,
  resetPassword,
} from "../features/user/userSlice";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { loading, success, error } = useSelector((state) => state.user);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const data = {
      password,
      confirmPassword,
    };
    dispatch(resetPassword({ token, userData: data }));
  };
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success("Password Reset Successful", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      navigate("/login");
    }
  }, [dispatch, success]);
  return (
    <>
      <PageTitle title="Reset Password" />
      <Navbar />

      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
        <div className="w-full max-w-md">
          <form
            className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg"
            onSubmit={resetPasswordSubmit}
          >
            {/* Heading */}
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                Reset Password
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Secure your account with a new password
              </p>
            </div>

            {/* New Password */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter new password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* Update Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-black py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ResetPassword;
