import express from "express";
const router = express.Router();
import userRouter from "./userRouter";
import authRouter from "./authRouter";
import adminRouter from "./adminRouter";

// /api/v1

router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/", userRouter);

export default router;
