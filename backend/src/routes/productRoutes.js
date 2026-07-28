import express from "express";
import {
  createProducts,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getAdminProducts,
  createReviewForProduct,
} from "../controllers/productControllers.js";
import {
  roleBasedAccess,
  verifyUserAuth,
} from "../middlewares/userAuthMiddlewares.js";

const router = express.Router();

// -------------------------TO GET ALL PRODUCTS
router.route("/products").get(getAllProducts);

// -------------------------GET ALL PRODUCTS BY ADMIN
router
  .route("/admin/products")
  .get(verifyUserAuth, roleBasedAccess("admin"), getAdminProducts);

// -------------------------PRODUCT CREATION
router
  .route("/admin/products/create")
  .post(verifyUserAuth, roleBasedAccess("admin"), createProducts);

// -------------------------TO UPDATE AND DELETE PRODUCT
router
  .route("/admin/product/:id")
  .put(verifyUserAuth, roleBasedAccess("admin"), updateProduct)
  .delete(verifyUserAuth, roleBasedAccess("admin"), deleteProduct);

// -------------------------GET PRODUCT BY ID
router.route("/product/:id").get(getSingleProduct);

// -------------------------PRODUCT REVIEW
router.route("/review").put(verifyUserAuth, createReviewForProduct);

export default router;
