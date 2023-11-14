import express from "express";
import { adminController } from "../app/controllers/AdminController";
import {
  handleUpload,
  upload,
  uploadToCloudinary,
} from "../middleWares/cloundinary";
import { authMiddleWare } from "../middleWares";
const router = express.Router();

// /api/v1
router.get("/product/:_id", adminController.handleGetProductById);
router
  .route("/product")
  .post(
    upload.single("image"),
    handleUpload,
    adminController.handleCreateOrUpdateProduct
  )
  .get(adminController.handleGetproduct)
  .delete(adminController.handleDeleteProduct);

// order
router
  .route("/order")
  .get(
    authMiddleWare.authenticate,
    authMiddleWare.verififyAdmin,
    adminController.handleGetOrder
  )
  .patch(
    authMiddleWare.authenticate,
    authMiddleWare.verififyAdmin,
    adminController.handleChangeStatusOrder
  );

export default router;
