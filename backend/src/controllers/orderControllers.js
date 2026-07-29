import { Order } from "../models/orderModel.js";
import { Product } from "../models/productModel.js";
import { User } from "../models/usersModel.js";
import ApiError from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";

// -------------------------CREATE NEW ORDER
export const createNewOrder = AsyncHandler(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    order,
  });
});

// -------------------------GET SINGLE ORDER INFO
export const getSingleOrder = AsyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );
  if (!order) {
    throw new ApiError(404, "No Order Found");
  }
  res.status(200).json({
    success: true,
    order,
  });
});

// -------------------------GET ALL MY ORDERS
export const getAllMyOrders = AsyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  if (!orders) {
    throw new ApiError(404, "No Orders Found");
  }
  let totalOrders = orders.length;
  res.status(200).json({
    success: true,
    totalOrders,
    orders,
  });
});

// -------------------------GET ALL ORDERS - ADMIN
export const getAllOrders = AsyncHandler(async (req, res, next) => {
  const orders = await Order.find();
  if (!orders) {
    throw new ApiError(404, "No Orders Found");
  }
  let totalOrders = orders.length;
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalOrders,
    totalAmount,
    orders,
  });
});

// -------------------------UPDATE ORDER STATUS
export const updateOrderStatus = AsyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new ApiError(404, "No Order Found");
  }
  if (order.orderStatus === "Delivered") {
    throw new ApiError(400, "This Order Has Been Already Delivered");
  }
  await Promise.all(
    order.orderItems.map((item) => updateQuantity(item.product, item.quantity)),
  );
  order.orderStatus = req.body.status;
  if (order.orderStatus === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    order,
  });
});
async function updateQuantity(id, quantity) {
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "No Product Found");
  }
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// -------------------------DELETE ORDER
export const deleteOrder = AsyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new ApiError(404, "No Order Found");
  }
  if (order.orderStatus !== "Delivered") {
    throw new ApiError(
      400,
      `This Order is under ${order.orderStatus}, Can't be Deleted`,
    );
  }
  await Order.deleteOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: "Order Successfully Deleted",
  });
});
