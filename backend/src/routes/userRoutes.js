import express from "express";
import {
  getUserDetails,
  loginUser,
  logout,
  registerUser,
  resetPassword,
  resetPasswordRequest,
  updatePassword,
  updateProfile,
} from "../controllers/userController.js";
import { verifyUserAuth } from "../middlewares/userAuthMiddlewares.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);
router.route("/password/forgot").post(resetPasswordRequest);
router.route("/reset/:token").post(resetPassword);
router.route("/profile").post(verifyUserAuth, getUserDetails);
router.route("/password/update").post(verifyUserAuth, updatePassword);
router.route("/profile/update").post(verifyUserAuth, updateProfile);

export default router;
