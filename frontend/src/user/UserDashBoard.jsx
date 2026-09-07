import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout, removeSuccess } from "../features/user/userSlice";

const UserDashBoard = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  function toggleMenu() {
    setMenu(!menu);
  }

  const options = [
    { name: "Orders", funcName: orders },
    { name: "Account", funcName: profile },
    { name: `Cart (${cartItems.length})`, funcName: MyCart },
    { name: "Logout", funcName: logoutUser },
  ];
  if (user.role === "admin") {
    options.unshift({ name: "Admin DashBoard", funcName: dashboard });
  }

  function orders() {
    navigate("/myOrders");
  }

  function profile() {
    navigate("/profile");
  }

  function MyCart(){
    navigate("/cart")
  }

  function logoutUser() {
    dispatch(logout())
      .unwrap()
      .then(() => {
        toast.success("Successfully Logged out", {
          position: "top-center",
          autoClose: 3000,
        });
        dispatch(removeSuccess());
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message || "Logout Failed", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  return (
    <>
      {/* Profile Header */}
      <div
        className="fixed top-2 right-2 z-1000 flex cursor-pointer items-center px-2 py-1 transition-all duration-300 sm:px-3 sm:py-1.5 md:px-4 md:py-2 max-[1920px]:right-2 max-[1440px]:right-2 max-[1280px]:right-2 max-[1024px]:right-4"
        onClick={toggleMenu}
      >
        <img
          src={user?.avatar?.url || "./images/profile.jpg"}
          alt="Profile Picture"
          className="h-8 w-8 rounded-full border-2 border-gray-300 object-cover"
        />
      </div>

      {/* Dropdown Menu */}
      {menu && (
        <div className="fixed right-5 top-18 z-1000 w-50 rounded-xl bg-white p-4 shadow-xl max-[1400px]:right-0 max-[1400px]:top-12">
          {options.map((option) => (
            <button
              key={option.name}
              onClick={option.funcName}
              className="mb-2 w-full rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-gray-800"
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default UserDashBoard;