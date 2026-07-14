import { Product } from "../models/productModel.js";
import ApiError from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";

//CREATING PRODUCTS
export const createProducts = AsyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//GET ALL PRODUCTS
export const getAllProducts = AsyncHandler(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});

//UPDATE PRODUCTS
export const updateProduct = AsyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new ApiError(404, "Product Not Found!");
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//DELETE PRODUCT
export const deleteProduct = AsyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    throw new ApiError(404, "Product Not Found!");
  }

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

//ACCESS SINGLE PRODUCT
export const getSingleProduct = AsyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new ApiError(404, "Product Not Found!");
  }

  res.status(200).json({
    success: true,
    product,
  });
});
