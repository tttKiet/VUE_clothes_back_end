"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var userRouter_1 = __importDefault(require("./userRouter"));
var authRouter_1 = __importDefault(require("./authRouter"));
var adminRouter_1 = __importDefault(require("./adminRouter"));
// /api/v1
router.use("/auth", authRouter_1.default);
router.use("/admin", adminRouter_1.default);
router.use("/", userRouter_1.default);
exports.default = router;
