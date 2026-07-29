import { Product } from "../models/productModel.js";
import ApiError from "../utils/ApiError.js";
import ApiFunctionality from "../utils/ApiFunctionality.js";
import AsyncHandler from "../utils/AsyncHandler.js";

// -------------------------CREATING PRODUCTS
export const createProducts = AsyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// -------------------------GET ALL PRODUCTS
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

// -------------------------UPDATE PRODUCTS
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

// -------------------------DELETE PRODUCT
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

// -------------------------ACCESS SINGLE PRODUCT
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

// -------------------------CREATING AND UPDATING PRODUCT REVIEW
export const createReviewForProduct = AsyncHandler(async (req, res, next) => {
  // Extract rating, comment, and product ID from request body
  const { rating, comment, productId } = req.body;

  // Create a review object using the logged-in user's details
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  // Find the product for which the review is being added
  const product = await Product.findById(productId);

  // If product doesn't exist, throw an error
  if (!product) {
    throw new ApiError(400, "No Product Found");
  }

  // Check whether the current user has already reviewed this product
  const reviewExists = product.reviews.find(
    (review) => review.user.toString() === req.user.id.toString(),
  );

  // If user has already reviewed the product
  if (reviewExists) {
    // Update the existing review
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user.id.toString()) {
        // Update rating and comment
        ((review.rating = rating), (review.comment = comment));
      }
    });
  } else {
    // If user hasn't reviewed before, add a new review
    product.reviews.push(review);
  }
  // Update total number of reviews
  product.numOfReviews = product.reviews.length;

  // Calculate total rating sum
  let sum = 0;
  product.reviews.forEach((review) => {
    sum += review.rating;
  });

  // Calculate average rating. If no reviews exist, set rating to 0
  product.ratings =
    product.reviews.length > 0
      ? Number(sum / product.reviews.length).toFixed(1)
      : 0;

  // Save updated product data to database
  await product.save({ validateBeforeSave: true });

  // Send success response
  res.status(200).json({
    success: true,
    product,
  });
});

// -------------------------GETTING PRODUCT REVIEWS
export const getProductReview = AsyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    throw new ApiError(400, "No Product Found");
  }
  let totalReviews = product.reviews.length;
  res.status(200).json({
    success: true,
    totalReviews,
    reviews: product.reviews,
  });
});

// -------------------------DELETE PRODUCT REVIEWS
export const deleteReview = AsyncHandler(async (req, res, next) => {
  // Find the product using the productId passed in query parameters
  const product = await Product.findById(req.query.productId);

  // If product doesn't exist, throw an error
  if (!product) {
    throw new ApiError(400, "No Product Found");
  }

  // Create a new reviews array excluding the review, whose ID matches the provided review ID
  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString(),
  );

  // Calculate the sum of all remaining review ratings
  let sum = 0;
  reviews.forEach((review) => {
    sum += review.rating;
  });

  // Calculate the new average rating, If no reviews remain, set rating to 0
  const ratings =
    reviews.length > 0 ? Number(sum / reviews.length).toFixed(1) : 0;

  // Update the total number of reviews
  const numOfReviews = reviews.length;

  // Update the product document in the database
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews, // Updated reviews array
      ratings, // New average rating
      numOfReviews, // Updated review count
    },
    {
      new: true, // Return updated document
      runValidators: true, // Apply schema validations
    },
  );

  // Send success response
  res.status(200).json({
    success: true,
    message: "Review Deleted Successfully",
  });
});

// -------------------------ADMIN - GETTING ALL PRODUCTS
export const getAdminProducts = AsyncHandler(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});
