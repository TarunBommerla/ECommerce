import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the username"],
      minLength: [3, "Username Should more than 3 Characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your E-mail"],
      unique: true,
      validate: [validator.isEmail, "Please enter your valid E-mail"],
    },
    password: {
      type: String,
      required: [true, "Please enter your Password"],
      minLength: [8, "Password should be greater than 8 Characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true },
);

// -------------------------PASSWORD HASHING
userSchema.pre("save", async function (next) {
  // ONLY IF PASSWORD IS MODIFIED
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

// -------------------------GENERATING ACCESS TOKENS
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );
};

// -------------------------PASSWORD COMPARISION
userSchema.methods.verifyPassword = async function (userEnteredPassword) {
  return await bcrypt.compare(userEnteredPassword, this.password);
};

// -------------------------GENERATING RESET PASSWORD TOKENS
userSchema.methods.generatePasswordResetToken = function () {
  // Generate a random 20-byte token and convert it to a hexadecimal string
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash the token using SHA-256 before storing it in the database. This ensures the actual token is never stored in plain text
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expiration time to 30 minutes from the current time. After this time, the token becomes invalid
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  // Return the original token
  return resetToken;
};

export const User = mongoose.model("User", userSchema);
