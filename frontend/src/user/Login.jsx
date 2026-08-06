import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, removeErrors, removeSuccess } from "../features/user/userSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { loading, error, success, isAuthenticated } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const loginSubmit = (e) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      toast.error("Please enter email and password");
      return;
    }

    dispatch(login({ email: loginEmail, password: loginPassword }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(()=>{
    if(isAuthenticated){
        navigate("/")
    }
  },[isAuthenticated])

  useEffect(() => {
    if (success) {
      toast.success("Login Successful", { position: "top-center", autoClose: 3000 });
      dispatch(removeSuccess());
    }
  }, [dispatch, success]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md">
        <form
          className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg"
          onSubmit={loginSubmit}
        >
          {/* Heading */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-sm text-gray-500">
              Sign in to your AXION account
            </p>
          </div>

          {/* Email */}
          <div className="mb-5">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-black py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-gray-800"
          >
            Sign In
          </button>

          {/* Forgot Password */}
          <p className="mt-5 text-center text-sm text-gray-600">
            Forgot your password?{" "}
            <Link
              to="/password/forgot"
              className="font-semibold text-black transition hover:underline"
            >
              Reset Here
            </Link>
          </p>

          {/* Register Link */}
          <p className="mt-3 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-black transition hover:underline"
            >
              Sign Up Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
