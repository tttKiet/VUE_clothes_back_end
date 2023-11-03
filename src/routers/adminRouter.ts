import express from "express";
import { adminController } from "../app/controllers/AdminController";
import {
  handleUpload,
  upload,
  uploadToCloudinary,
} from "../middleWares/cloundinary";
const router = express.Router();

// /api/v1
router
  .route("/product")
  .post(
    upload.single("image"),
    handleUpload,
    adminController.handleCreateOrUpdateProduct
  )
  .get(adminController.handleGetproduct)
  .delete(adminController.handleDeleteProduct);

export default router;
