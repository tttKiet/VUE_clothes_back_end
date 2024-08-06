"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetails = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema, models = mongoose_1.default.models;
var orderDetailsSchema = new Schema({
    order_id: { type: mongoose_1.default.Types.ObjectId, ref: "Order" },
    product_id: { type: mongoose_1.default.Types.ObjectId, ref: "Product" },
    size: { type: String },
    so_luong: { type: Number },
    gia_Dat_hang: { type: Number },
    giam_gia: { type: Number, default: 0 },
}, { timestamps: false });
var OrderDetails = models.OrderDetails ||
    mongoose_1.default.model("OrderDetails", orderDetailsSchema);
exports.OrderDetails = OrderDetails;
