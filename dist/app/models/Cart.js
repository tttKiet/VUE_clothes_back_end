"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema, models = mongoose_1.default.models;
var cartSchema = new Schema({
    product_id: { type: mongoose_1.default.Types.ObjectId, ref: "Product" },
    so_luong: { type: Number },
    user_id: { type: mongoose_1.default.Types.ObjectId, ref: "User" },
    size: { type: String },
}, { timestamps: false });
var Cart = models.Cart || mongoose_1.default.model("Cart", cartSchema);
exports.Cart = Cart;
