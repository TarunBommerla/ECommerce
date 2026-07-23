import express from "express";
import {
  createProducts,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} from "../controllers/productControllers.js";
import {
  roleBasedAccess,
  verifyUserAuth,
} from "../middlewares/userAuthMiddlewares.js";

const router = express.Router();

// FOR PRODUCTS
router
  .route("/products")
  .get(verifyUserAuth, getAllProducts)
  .post(verifyUserAuth, roleBasedAccess("admin"), createProducts);

// FOR PRODUCT ID
router
  .route("/product/:id")
  .put(verifyUserAuth,roleBasedAccess("admin"), updateProduct)
  .delete(verifyUserAuth,roleBasedAccess("admin"), deleteProduct)
  .get(verifyUserAuth, getSingleProduct);

export default router;
