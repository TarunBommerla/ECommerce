import AsyncHandler from "../utils/AsyncHandler.js";
import { User } from "../models/usersModel.js";
import ApiError from "../utils/ApiError.js";
import { sendToken } from "../utils/JWTToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";

// -------------------------USER REGISTERING
export const registerUser = AsyncHandler(async (req, res, next) => {
  // TAKING VALUES FROM BODY
  const { name, email, password } = req.body;
  const avatarFile = req.files.avatar;

  // UPLOAD AVATAR IMAGE INTO CLOUDINARY
  const myCloud = await cloudinary.uploader.upload(avatarFile.tempFilePath, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  // CREATING A USER
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  // GENERATING TOKEN FOR USER
  sendToken(user, 201, res);
});

// -------------------------USER LOGIN
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

// -------------------------USER LOGOUT
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

// -------------------------FORGOT PASSWORD
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
  const resetPasswordURL = `${req.protocol}://${req.get("host")}/reset/${resetToken}`;

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

// -------------------------RESET PASSWORD
export const resetPassword = AsyncHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    throw new ApiError(
      400,
      "Reset Password Token is Invalid or has been Expired",
    );
  }

  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    throw new ApiError(400, "Password Doesn't match");
  }
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 201, res);
});

// -------------------------GET USER DETAILS
export const getUserDetails = AsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// -------------------------UPDATE THE PASSWORD
export const updatePassword = AsyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const user = await User.findById(req.user.id).select("+password");
  const checkPasswordMatch = await user.verifyPassword(oldPassword);
  if (!checkPasswordMatch) {
    throw new ApiError(400, "Old Password is Incorrect");
  }
  if (newPassword !== confirmPassword) {
    throw new ApiError(400, "Password Doesn't Match");
  }
  user.password = newPassword;
  await user.save();
  sendToken(user, 200, res);
});

// -------------------------UPDATE USER PROFILE
export const updateProfile = AsyncHandler(async (req, res, next) => {
  const { name, email } = req.body;
  const updateUserProfile = { name, email };
  const avatar = req.files?.avatar;
  if (avatar) {
    const currentUser = await User.findById(req.user.id);
    const imageId = currentUser.avatar.public_id;
    await cloudinary.uploader.destroy(imageId);
    const myCloud = await cloudinary.uploader.upload(avatar.tempFilePath, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    updateUserProfile.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const user = await User.findByIdAndUpdate(req.user.id, updateUserProfile, {
    returnDocument: "after",
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    message: "Profile updated Successfully",
    user,
  });
});

// -------------------------ADMIN - GETTING ALL USERS INFO
export const getUsersList = AsyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// -------------------------ADMIN - GETTING SINGLE USER INFO
export const getSingleUser = AsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ApiError(400, "No User Found");
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// -------------------------ADMIN - CHANGING USER ROLE
export const updateUserRole = AsyncHandler(async (req, res, next) => {
  const { role } = req.body;
  const newUserData = {
    role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!user) {
    throw new ApiError(400, "No User Found");
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// -------------------------ADMIN - DELETE USER PROFILE
export const deleteUser = AsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ApiError(400, "No User Found");
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
