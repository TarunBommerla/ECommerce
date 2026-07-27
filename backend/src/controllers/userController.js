import AsyncHandler from "../utils/AsyncHandler.js";
import { User } from "../models/usersModel.js";
import ApiError from "../utils/ApiError.js";
import { sendToken } from "../utils/JWTToken.js";
import { sendEmail } from "../utils/sendEmail.js";

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
  sendToken(user, 201, res);
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
  sendToken(user, 200, res);
});

// USER LOGOUT
export const logout = AsyncHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Successfully Logged Out",
  });
});

// RESET PASSWORD
export const resetPasswordRequest = AsyncHandler(async (req, res, next) => {
  // Extract email from the request body
  const { email } = req.body;

  // Find user by email address
  const user = await User.findOne({ email });

  // If no user is found, throw an error
  if (!user) {
    throw new ApiError(400, "User Doesn't exist");
  }

  // Variable to store the generated reset token
  let resetToken;
  try {
    // Generate a password reset token
    resetToken = user.generatePasswordResetToken();

    // Save token and expiry to the database. Skip validations because we're only updating reset fields
    await user.save({ validateBeforeSave: false });
  } catch (error) {
    // If token generation or saving fails
    throw new ApiError(
      500,
      "Couldn't save reset password token, Please try again later",
    );
  }
  // Creates the password reset URL
  const resetPasswordURL = `http://localhost:8000/api/v1/reset/${resetToken}`;

  // Email message containing the reset link
  const message = `Use the following link to reset your password: ${resetPasswordURL}. \n\n This link will be expire in 30 minutes`;

  try {
    // Send password reset email to the user
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });

    // Send success response if email is delivered
    res.status(200).json({
      success: true,
      message: `Email is sent to ${user.email} successfully`,
    });
  } catch (error) {
    // If email sending fails: Remove reset token and expiration from database, to avoid leaving unused reset tokens
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    // Throw error response
    throw new ApiError(500, "Couldn't send mail, Please try again later");
  }
});
