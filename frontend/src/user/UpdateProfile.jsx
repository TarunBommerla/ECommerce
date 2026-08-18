import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeErrors,
  removeSuccess,
  updateProfile,
} from "../features/user/userSlice";
import Loader from "../components/Loader";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("./images/profile.jpg");

  const { user, error, success, message, loading } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileUpdate = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(e.target.files[0]);
      }
    };
    reader.onerror = (error) => {
      toast.error("error reading file");
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const updateSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
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
      navigate("/profile");
    }
  }, [dispatch, success]);

  useEffect(()=>{
    if(user){
        setName(user.name)
        setEmail(user.email)
        setAvatarPreview(user.avatar.url || "./images/profile.jpg")
    }
  },[user])
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />

          <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
            <div className="mx-auto max-w-md">
              <form
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg"
                encType="multipart/form-data"
                onSubmit={updateSubmit}
              >
                {/* Heading */}
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Update Profile
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Update your account information
                  </p>
                </div>

                {/* Profile Picture */}
                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-gray-700">
                    Profile Picture
                  </label>

                  <div className="flex items-center gap-4">
                    <img
                      src={avatarPreview}
                      alt="User Profile"
                      className="h-16 w-16 rounded-full border border-gray-300 object-cover"
                    />

                    <input
                      type="file"
                      accept="image/*"
                      name="avatar"
                      className="block w-full text-sm text-gray-500
                  file:mr-4 file:rounded-lg file:border-0
                  file:bg-black file:px-4 file:py-2
                  file:text-sm file:font-medium
                  file:text-white hover:file:bg-gray-800"
                      onChange={profileUpdate}
                    />
                  </div>
                </div>

                {/* Name */}
                <div className="mb-5">
                  <input
                    value={name}
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Email */}
                <div className="mb-6">
                  <input
                    value={email}
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Update Button */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-black py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-gray-800"
                >
                  Update Profile
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

export default UpdateProfile;
