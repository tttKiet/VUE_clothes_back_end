import express from "express";
import { userController } from "../app/controllers";
import { authMiddleWare } from "../middleWares";

const router = express.Router();

// /api/v1
router.post("/create-user", userController.handleCreateUser);
router
  .route("/cart")
  .post(authMiddleWare.authenticate, userController.handleAddCart)
  .patch(authMiddleWare.authenticate, userController.handleEditCart)
  .delete(authMiddleWare.authenticate, userController.handleDeleteProductCart)
  .get(authMiddleWare.authenticate, userController.handleGetCart);

export default router;
