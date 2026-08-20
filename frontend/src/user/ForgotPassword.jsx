import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassword,
  removeErrors,
  removeSuccess,
} from "../features/user/userSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { success, loading, error, message } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();
  const forgotPasswordEmail = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    console.log(email);
    dispatch(forgotPassword(myForm));
    setEmail("");
  };
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);
  useEffect(() => {
    if (success) {
      toast.success(message, { position: "top-center", autoClose: 3000 });
      dispatch(removeSuccess());
    }
  }, [dispatch, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="Forgot Password" />
          <Navbar />

          <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 py-10">
            <div className="w-full max-w-md">
              <form
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg"
                onSubmit={forgotPasswordEmail}
              >
                {/* Heading */}
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Forgot Password
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Enter your registered email address to receive a password
                    reset link.
                  </p>
                </div>

                {/* Email Input */}
                <div className="mb-6">
                  <input
                    type="email"
                    placeholder="Enter your registered email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-black py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-gray-800"
                >
                  Send Reset Link
                </button>
              </form>
            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
};

export default ForgotPassword;
