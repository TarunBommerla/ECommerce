import express from "express";
import {
  createNewOrder,
  deleteOrder,
  getAllMyOrders,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
} from "../controllers/orderControllers.js";
import {
  roleBasedAccess,
  verifyUserAuth,
} from "../middlewares/userAuthMiddlewares.js";

const router = express.Router();

router.route("/new/order").post(verifyUserAuth, createNewOrder);
router.route("/order/:id").get(verifyUserAuth, getSingleOrder);

router
  .route("/admin/order/:id")
  .put(verifyUserAuth, roleBasedAccess("admin"), updateOrderStatus)
  .delete(verifyUserAuth, roleBasedAccess("admin"), deleteOrder);

router.route("/myOrders").get(verifyUserAuth, getAllMyOrders);

router
  .route("/admin/orders")
  .get(verifyUserAuth, roleBasedAccess("admin"), getAllOrders);

export default router;
