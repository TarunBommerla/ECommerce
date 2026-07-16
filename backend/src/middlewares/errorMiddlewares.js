import ApiError from "../utils/ApiError.js";

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // CAST ERROR HANDLING
  if (err.name === "CastError") {
    const message = `This is invalid resource ${err.path}`;
    err = new ApiError(404, message);
  }

  // COMMON ERROR HANDLING
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    data: err.data || null,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorMiddleware;
