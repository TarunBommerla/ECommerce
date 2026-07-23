import { User } from "../models/usersModel.js";
import ApiError from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

// TO CHECK USER IS AUTHENTICATED
export const verifyUserAuth = AsyncHandler(async (req, res, next) => {
  // EXTRACTS JWT TOKEN FROM BROWSER COOKIES
  const { token } = req.cookies;
  console.log(token);

  // IF NO TOKEN IS PRESENT< USER IS NOT AUTHENTICATED
  if (!token) {
    throw new ApiError(
      400,
      "Authentication is missing! Please login to access resource",
    );
  }

  // VERIFY THE TOKEN USING THE ACCESS TOKEN SECRET
  const decodeData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  console.log(decodeData);

  // FIND THE USER IN DATABASE USING THE ID STORED IN TOKEN PAYLOAD
  req.user = await User.findById(decodeData.id);

  // PASS CONTROL TO THE NEXT MIDDLEWARE/ CONTROLLER
  next();
});

export const roleBasedAccess = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        403,
        `Role - ${req.user.role} is not allowed to access the resource`,
      );
    }
    next();
  };
};
