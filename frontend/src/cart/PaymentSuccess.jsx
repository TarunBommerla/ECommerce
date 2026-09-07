import { RiCheckLine } from "@remixicon/react";
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createOrder,
  removeErrors,
  removeSuccess,
} from "../features/order/orderSlice";
import { clearCart } from "../features/cart/cartSlice";
import Loader from "../components/Loader";

const PaymentSuccess = () => {
  const { cartItems, ShippingInfo } = useSelector((state) => state.cart);
  const { loading, error, success } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    const createOrderData = async () => {
      try {
        const OrderItem = JSON.parse(sessionStorage.getItem("OrderItem"));
        if (!OrderItem) return;
        const orderData = {
          shippingInfo: {
            address: ShippingInfo.address,
            city: ShippingInfo.city,
            country: ShippingInfo.country,
            phoneNo: ShippingInfo.phoneNumber,
            state: ShippingInfo.state,
            pinCode: ShippingInfo.pinCode,
          },
          orderItems: cartItems.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
            product: item.product,
          })),
          paymentInfo: {
            id: "123456789",
            status: "Succeeded",
          },
          itemPrice: OrderItem.subTotal,
          taxPrice: OrderItem.tax,
          shippingPrice: OrderItem.shipping,
          totalPrice: OrderItem.total,
        };
        dispatch(createOrder(orderData));
        sessionStorage.removeItem("OrderItem");
      } catch (error) {
        toast.error(error.message || "create order Error", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    };
    createOrderData();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success("Your order has been placed successfully.", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(clearCart());
      dispatch(removeSuccess());
    }
  }, [dispatch, success]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="Payment Status" />
          <Navbar />
          <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-lg">
              {/* Success Icon */}
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                <RiCheckLine className="text-5xl text-green-600" />
              </div>

              {/* Success Message */}
              <div>
                <h1 className="mb-3 text-3xl font-bold text-gray-900">
                  Payment Successful!
                </h1>

                <p className="mb-8 text-gray-600">
                  Your order has been placed successfully.
                </p>
              </div>

              {/* Button */}
              <Link to="/MyOrders">
                <button className="w-full rounded-xl bg-black py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-gray-800 active:scale-95 cursor-pointer">
                  View Order
                </button>
              </Link>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default PaymentSuccess;
