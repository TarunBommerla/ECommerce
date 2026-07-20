import AsyncHandler from "../utils/AsyncHandler.js";
import { User } from "../models/usersModel.js";
import ApiError from "../utils/ApiError.js";

// USER REGISTERING
export const registerUser = AsyncHandler(async (req, res, next) => {
  // TAKING VALUES FROM BODY
  const { name, email, password } = req.body;

  // CREATING A USER
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is temp ID",
      url: "This is temp URL",
    },
  });

  // GENERATING TOKEN FOR USER
  const token = user.generateAccessToken();

  res.status(201).json({
    success: true,
    user,
    token,
  });
});

// USER LOGIN
export const loginUser = AsyncHandler(async (req, res, next) => {
  // TAKING VALUES FROM BODY
  const { email, password } = req.body;

  // CHECKING IF EMAIL OR PASSEORD IS EMPTY
  if (!email || !password) {
    throw new ApiError(400, "E-mail or Password can't be Empty");
  }

  // FINDING USER USING EMAIL
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid E-mail or Password");
  }

  // VERIFYING PASSWORD
  const isPasswordValid = await user.verifyPassword(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid E-mail or Password");
  }

  // GENERATING TOKEN FOR A USER
  const token = user.generateAccessToken();

  res.status(200).json({
    success: true,
    user,
    token,
  });
});
