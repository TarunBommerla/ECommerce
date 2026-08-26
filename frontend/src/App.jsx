import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Register from "./user/Register";
import Login from "./user/Login";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./features/user/userSlice";
import UserDashBoard from "./user/UserDashBoard";
import Profile from "./user/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateProfile from "./user/UpdateProfile";
import UpdatePassword from "./user/UpdatePassword";
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";
import Cart from "./cart/Cart";
import Shipping from "./cart/Shipping";
import OrderConfirm from "./cart/OrderConfirm";
import Payment from "./cart/Payment";
import PaymentSuccess from "./cart/PaymentSuccess";
import MyOrders from "./Orders/MyOrders";
import OrderDetails from "./Orders/OrderDetails";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path="/profile/update"
          element={<ProtectedRoute element={<UpdateProfile />} />}
        />
        <Route
          path="/password/update"
          element={<ProtectedRoute element={<UpdatePassword />} />}
        />
        <Route
          path="/shipping"
          element={<ProtectedRoute element={<Shipping />} />}
        />
        <Route
          path="/order/confirm"
          element={<ProtectedRoute element={<OrderConfirm />} />}
        />
        <Route
          path="/process/payment"
          element={<ProtectedRoute element={<Payment />} />}
        />
        <Route
          path="/process/payment/success"
          element={<ProtectedRoute element={<PaymentSuccess />} />}
        />
        <Route
          path="/MyOrders"
          element={<ProtectedRoute element={<MyOrders />} />}
        />
        <Route
          path="/order/:orderId"
          element={<ProtectedRoute element={<OrderDetails />} />}
        />
      </Routes>
      {isAuthenticated && <UserDashBoard user={user} />}
    </div>
  );
};

export default App;
