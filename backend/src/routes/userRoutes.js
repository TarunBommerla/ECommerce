import express from "express";
import {
  deleteUser,
  getSingleUser,
  getUserDetails,
  getUsersList,
  loginUser,
  logout,
  registerUser,
  resetPassword,
  resetPasswordRequest,
  updatePassword,
  updateProfile,
  updateUserRole,
} from "../controllers/userController.js";
import {
  roleBasedAccess,
  verifyUserAuth,
} from "../middlewares/userAuthMiddlewares.js";

const router = express.Router();

// -------------------------USER ROUTES
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);
router.route("/password/forgot").post(resetPasswordRequest);
router.route("/reset/:token").post(resetPassword);
router.route("/profile").get(verifyUserAuth, getUserDetails);
router.route("/password/update").post(verifyUserAuth, updatePassword);
router.route("/profile/update").post(verifyUserAuth, updateProfile);

// -------------------------ADMIN ROUTES
router
  .route("/admin/users")
  .get(verifyUserAuth, roleBasedAccess("admin"), getUsersList);
router
  .route("/admin/user/:id")
  .get(verifyUserAuth, roleBasedAccess("admin"), getSingleUser)
  .put(verifyUserAuth, roleBasedAccess("admin"), updateUserRole)
  .delete(verifyUserAuth, roleBasedAccess("admin"), deleteUser);

export default router;
