import express from "express";
import { authController } from "../app/controllers";
import { authMiddleWare } from "../middleWares";
const router = express.Router();

// /api/v1/auth
router.post("/login", authController.handleLogin);
router.post("/refresh", authController.handleRefresh);
router.get(
  "/profile",
  authMiddleWare.authenticate,
  authController.handleGetProfileLogin
);

router.delete("/logout", authController.handleLogout);

export default router;
