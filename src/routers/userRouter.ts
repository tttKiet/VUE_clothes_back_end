import express from "express";
import { userController } from "../app/controllers";

const router = express.Router();

// /api/v1
router.post("/create-user", userController.handleCreateUser);

export default router;
