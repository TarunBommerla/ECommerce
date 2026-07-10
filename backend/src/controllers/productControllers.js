import { Product } from "../models/productModel.js";
import errorHandler from "../utils/errorHandler.js";

//CREATING PRODUCTS
export const createProducts = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
  console.log(req.body);
};

//GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
};

//UPDATE PRODUCTS
export const updateProduct = async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(new errorHandler("Product Not Found!", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
};

//DELETE PRODUCT
export const deleteProduct = async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new errorHandler("Product Not Found!", 404));
  }

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
};

//ACCESS SINGLE PRODUCT
export const getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new errorHandler("Product Not Found!", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
};
