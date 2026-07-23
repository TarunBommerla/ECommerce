import { Product } from "../models/productModel.js";
import ApiError from "../utils/ApiError.js";
import ApiFunctionality from "../utils/ApiFunctionality.js";
import AsyncHandler from "../utils/AsyncHandler.js";

//CREATING PRODUCTS
export const createProducts = AsyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//GET ALL PRODUCTS
export const getAllProducts = AsyncHandler(async (req, res, next) => {
  const resultsPerPage = 3;
  const APIFunction = new ApiFunctionality(Product.find(), req.query)
    .search()
    .filter();

  //Getting filtered Query before pagination
  const filteredQuery = APIFunction.query.clone();

  // Counting total Products
  const productCount = await filteredQuery.countDocuments();

  //calculating totalpages based on productCount and resultsPerPage
  const totalPages = Math.ceil(productCount / resultsPerPage);
  const page = Number(req.query.page) || 1;

  if (page > totalPages && productCount > 0) {
    throw new ApiError(404, "This Page Doesn't Exists");
  }

  //Apply Pagination
  APIFunction.pagination(resultsPerPage);
  const products = await APIFunction.query;

  // If it Doesn't have any Product or Product Length is equal to 'Zero' it Throws an ERROR
  if (!products || products.length === 0) {
    throw new ApiError(404, "Products Not Found");
  }

  res.status(200).json({
    success: true,
    products,
    productCount,
    resultsPerPage,
    currentPage: page,
    totalPages,
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
