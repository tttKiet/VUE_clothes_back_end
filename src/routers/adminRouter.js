"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var AdminController_1 = require("../app/controllers/AdminController");
var cloundinary_1 = require("../middleWares/cloundinary");
var middleWares_1 = require("../middleWares");
var router = express_1.default.Router();
// /api/v1
router.get("/product/:_id", AdminController_1.adminController.handleGetProductById);
router
    .route("/product")
    .post(cloundinary_1.upload.single("image"), cloundinary_1.handleUpload, AdminController_1.adminController.handleCreateOrUpdateProduct)
    .get(AdminController_1.adminController.handleGetproduct)
    .delete(AdminController_1.adminController.handleDeleteProduct);
// order
router
    .route("/order")
    .get(middleWares_1.authMiddleWare.authenticate, middleWares_1.authMiddleWare.verififyAdmin, AdminController_1.adminController.handleGetOrder)
    .patch(middleWares_1.authMiddleWare.authenticate, middleWares_1.authMiddleWare.verififyAdmin, AdminController_1.adminController.handleChangeStatusOrder);
// chart
router.get("/chart/revennue", 
// authMiddleWare.authenticate,
// authMiddleWare.verififyAdmin,
AdminController_1.adminController.handleGetChartRevenue);
exports.default = router;
