import express from "express";
import { adminController } from "../app/controllers/AdminController";

const router = express.Router();

// /api/v1
router.post("/product", adminController.handleCreateOrUpdateProduct);

export default router;
