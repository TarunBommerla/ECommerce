import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  register,
  removeErrors,
  removeSuccess,
} from "../features/user/userSlice";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("./images/profile.jpg");
  const { name, email, password } = user;
  const { success, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      if (e.target.files && e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill the required fields", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    dispatch(
      register({
        name,
        email,
        password,
        avatar,
      }),
    );
  };
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success("Registration Successful", { position: "top-center", autoClose: 3000 });
      dispatch(removeSuccess());
      navigate("/login");
    }
  }, [dispatch, success]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md">
        <form
          className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg"
          onSubmit={registerSubmit}
          encType="multipart/form-data"
        >
          {/* Heading */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-sm text-gray-500">
              {" "}
              Join AXION and start shopping today{" "}
            </p>
          </div>

          {/* Username */}
          <div className="mb-5">
            <input
              type="text"
              placeholder="Username"
              name="name"
              value={name}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              onChange={registerDataChange}
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              onChange={registerDataChange}
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              onChange={registerDataChange}
            />
          </div>

          {/* Avatar Upload */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-gray-700">
              Profile Picture
            </label>

            <div className="flex items-center gap-4">
              <img
                src={avatarPreview}
                alt="avatar-preview"
                className="h-16 w-16 rounded-full border border-gray-300 object-cover"
              />

              <input
                type="file"
                name="avatar"
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-black file:px-4 file:py-2
                file:text-sm file:font-medium file:text-white hover:file:bg-gray-800"
                onChange={registerDataChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-black py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-gray-800"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-black transition hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
