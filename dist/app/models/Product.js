"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema, models = mongoose_1.default.models;
var productSchema = new Schema({
    ten_HH: { type: String },
    mo_ta_HH: { type: String },
    gia: { type: Number },
    so_luong_hang: { type: Number, min: 0 },
    ghi_chu: { type: String },
}, { timestamps: true });
var Product = models.Product || mongoose_1.default.model("Product", productSchema);
exports.Product = Product;
