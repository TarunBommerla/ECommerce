import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

// PASSWORD HASHING
userSchema.pre("save", async function () {
  // ONLY IF PASSWORD IS MODIFIED
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

// GENERATING ACCESS TOKENS
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

//PASSWORD COMPARISION
userSchema.methods.verifyPassword = async function (userEnteredPassword) {
  return await bcrypt.compare(userEnteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
