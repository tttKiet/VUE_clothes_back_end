import express from "express";
import { userController } from "../app/controllers";
import { authMiddleWare } from "../middleWares";

const router = express.Router();

// /api/v1

// regiser
router.post("/create-user", userController.handleCreateUser);

// cart
router
  .route("/cart")
  .post(authMiddleWare.authenticate, userController.handleAddCart)
  .patch(authMiddleWare.authenticate, userController.handleEditCart)
  .delete(authMiddleWare.authenticate, userController.handleDeleteProductCart)
  .get(authMiddleWare.authenticate, userController.handleGetCart);

// order
router.post(
  "/order/one-item",
  authMiddleWare.authenticate,
  userController.handleOrderOneItem
);
router
  .route("/order/:_id")
  .get(userController.handleGetOrderDetail)
  .patch(userController.handleGetCancelOrder);
router
  .route("/order")
  .get(authMiddleWare.authenticate, userController.handleGetOrder)
  .post(authMiddleWare.authenticate, userController.handleOrderProductCart);

export default router;
