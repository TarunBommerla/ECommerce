import express from "express";
import {
  createProducts,
  getAllProducts,
} from "../controllers/productControllers.js";

const router = express.Router();

router.route("/products").get(getAllProducts).post(createProducts);

export default router;
