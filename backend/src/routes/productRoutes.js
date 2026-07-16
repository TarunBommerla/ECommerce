import express from "express";
import {
  createProducts,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} from "../controllers/productControllers.js";

const router = express.Router();

// FOR PRODUCTS
router.route("/products").get(getAllProducts).post(createProducts);

// FOR PRODUCT ID
router
  .route("/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getSingleProduct);

export default router;
