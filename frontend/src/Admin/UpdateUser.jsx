import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleUser,
  removeErrors,
  removeSuccess,
  updateUser,
} from "../features/admin/adminSlice";
import { toast } from "react-toastify";

const UpdateUser = () => {
  const { user, success, loading, error } = useSelector((state) => state.admin);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    dispatch(getSingleUser(id));
  }, [dispatch]);

  const { name, email, role } = formData;

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id, role }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
    if (success) {
      toast.success("User Updated", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      navigate("/admin/users")
    }
  },[dispatch, error, success]);

  return (
    <>
      <Navbar />
      <PageTitle title="Admin | Update User" />

      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-2xl mt-20">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
            {/* Heading */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                Update User Role
              </h1>
              <p className="mt-2 text-gray-500">
                Manage user permissions and access levels.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  readOnly
                  className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-700 outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  readOnly
                  className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-700 outline-none"
                />
              </div>

              {/* Role */}
              <div>
                <label
                  htmlFor="role"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <select
                  name="role"
                  id="role"
                  value={role}
                  required
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Button */}
              <button className="w-full cursor-pointer rounded-xl bg-black py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-gray-800 active:scale-95">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UpdateUser;
