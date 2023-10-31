import express from "express";
import { authController } from "../app/controllers";

const router = express.Router();

// /api/v1/auth
router.post("/login", authController.handleLogin);

export default router;
