"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../app/controllers");
var middleWares_1 = require("../middleWares");
var router = express_1.default.Router();
// /api/v1/auth
router.post("/login", controllers_1.authController.handleLogin);
router.post("/refresh", controllers_1.authController.handleRefresh);
router.get("/profile", middleWares_1.authMiddleWare.authenticate, controllers_1.authController.handleGetProfileLogin);
router.delete("/logout", controllers_1.authController.handleLogout);
exports.default = router;
