import ApiError from "../utils/ApiError.js";

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // CAST ERROR HANDLING
  if (err.name === "CastError") {
    const message = `This is invalid resource ${err.path}`;
    err = new ApiError(404, message);
  }

  // DUPLICATE KEY ERROR
  if (err.code === 11000) {
    const message = `This ${Object.keys(err.keyValue)} is already registered, Please Login to continue`;
    err = new ApiError(400, message);
  }

  // COMMON ERROR HANDLING
  res.status(err.statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    data: err.data || null,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorMiddleware;
