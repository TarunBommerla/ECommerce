import { RiAddLine, RiSubtractLine } from "@remixicon/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addItemsToCart,
  removeErrors,
  removeItemFromCart,
  removeMessage,
} from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const CartItem = ({ item }) => {
  const { success, loading, error, message, cartItems } = useSelector(
    (state) => state.cart,
  );
  const [quantity, setQuantity] = useState(item.quantity);

  const dispatch = useDispatch();

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      toast.error("Quantity must be at least 1.", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
      return;
    }
    setQuantity((quantity) => quantity - 1);
  };

  const increaseQuantity = () => {
    if (item.stock <= quantity) {
      toast.error(
        "You've reached the maximum available stock for this product.",
        { position: "top-center", autoClose: 3000 },
      );
      dispatch(removeErrors());
      return;
    }
    setQuantity((quantity) => quantity + 1);
  };

  const handleUpdate = () => {
    if (loading) return;
    if (quantity !== item.quantity) {
      dispatch(addItemsToCart({ id: item.product, quantity }));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
        toastId: "cart-update",
      });
      dispatch(removeMessage());
    }
  }, [dispatch, success, message]);

  const handleRemove = () => {
    if (loading) return;
    dispatch(removeItemFromCart({ productId: item.product, userId: user._id }));
    toast.success("Item removed from your cart.", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  return (
    <div className="grid grid-cols-1 gap-4 border-b border-gray-200 py-5 md:grid-cols-4 md:items-center">
      {/* Product */}
      <div className="flex items-center gap-4">
        <Link to={`/product/${item.product}`}>
          <img
            src={item.image}
            alt={item.name}
            className="h-30 w-25 object-cover transition duration-300 hover:scale-105 cursor-pointer rounded-md"
          />
        </Link>

        <div>
          <h3 className="text-md font-semibold text-gray-900 mb-1">
            {item.name}
          </h3>

          <p className="text-sm text-gray-600 mb-1">
            <strong>Price:</strong> {item.price.toFixed(2)}
          </p>

          <p className="text-sm text-gray-600 mb-1">
            <strong>Quantity:</strong> {item.quantity}
          </p>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center justify-center gap-2">
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 transition hover:bg-gray-100"
          onClick={decreaseQuantity}
          disabled={loading}
        >
          <RiSubtractLine size={18} />
        </button>

        <input
          type="number"
          value={quantity}
          readOnly
          className="h-10 w-16 rounded-lg border border-gray-300 text-center outline-none"
        />

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 transition hover:bg-gray-100"
          onClick={increaseQuantity}
          disabled={loading}
        >
          <RiAddLine size={18} />
        </button>
      </div>

      {/* Item Total */}
      <div className="text-center">
        <span className="text-lg font-bold text-black">
          ₹{(item.price * item.quantity).toFixed(2)}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-3">
        <button
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 active:scale-95"
          onClick={handleUpdate}
          disabled={loading || quantity === item.quantity}
        >
          Update
        </button>

        <button
          className="active:scale-95 rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
          disabled={loading}
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
