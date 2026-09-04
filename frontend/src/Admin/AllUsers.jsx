import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessage,
  deleteUser,
  fetchUsers,
  removeErrors,
} from "../features/admin/adminSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const AllUsers = () => {
  const { users, loading, error, message } = useSelector(
    (state) => state.admin,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  console.log(users);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user? This action cannot be undone.",
    );
    if (confirm) {
      dispatch(deleteUser(id));
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
    if (message) {
      toast.success(message, { position: "top-center", autoClose: 3000 });
      dispatch(clearMessage());
      navigate("/admin/dashboard");
    }
  }, [dispatch, error, message]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <PageTitle title="Admin | All Users" />

          <div className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="mx-auto max-w-7xl">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">All Users</h1>
                <p className="mt-2 text-gray-500">
                  Manage all registered users in your AXION store.
                </p>
              </div>

              {/* Table Container */}
              <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-black text-white">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          SI No.
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Name
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Email
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Role
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Created At
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {users.map((user, index) => (
                        <tr
                          key={user._id}
                          className="border-b border-gray-100 transition hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 text-gray-700">
                            {index + 1}
                          </td>

                          <td className="px-6 py-4 font-medium text-gray-900">
                            {user.name}
                          </td>

                          <td className="px-6 py-4 text-gray-600">
                            {user.email}
                          </td>

                          <td className="px-6 py-4">
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                              {user.role}
                            </span>
                          </td>

                          <td className="px-6 py-4 text-gray-600">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-3">
                              <Link
                                to={`/admin/user/${user._id}`}
                                className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 active:scale-95 cursor-pointer"
                              >
                                Edit
                              </Link>

                              <button
                                className="active:scale-95 cursor-pointer rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                                onClick={() => handleDelete(user._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default AllUsers;
