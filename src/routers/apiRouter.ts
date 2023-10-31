import express from "express";
const router = express.Router();
import userRouter from "./userRouter";
import authRouter from "./authRouter";

// /api/v1

router.use("/auth", authRouter);
router.use("/", userRouter);
// router.use("/admin", adminRouter);

export default router;
