"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../app/controllers");
var middleWares_1 = require("../middleWares");
var router = express_1.default.Router();
// /api/v1
// regiser
router.post("/create-user", controllers_1.userController.handleCreateUser);
// cart
router
    .route("/cart")
    .post(middleWares_1.authMiddleWare.authenticate, controllers_1.userController.handleAddCart)
    .patch(middleWares_1.authMiddleWare.authenticate, controllers_1.userController.handleEditCart)
    .delete(middleWares_1.authMiddleWare.authenticate, controllers_1.userController.handleDeleteProductCart)
    .get(middleWares_1.authMiddleWare.authenticate, controllers_1.userController.handleGetCart);
// order
router.post("/order/one-item", middleWares_1.authMiddleWare.authenticate, controllers_1.userController.handleOrderOneItem);
router
    .route("/order/:_id")
    .get(controllers_1.userController.handleGetOrderDetail)
    .patch(controllers_1.userController.handleGetCancelOrder);
router
    .route("/order")
    .get(middleWares_1.authMiddleWare.authenticate, controllers_1.userController.handleGetOrder)
    .post(middleWares_1.authMiddleWare.authenticate, controllers_1.userController.handleOrderProductCart);
exports.default = router;
