"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImage = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema, models = mongoose_1.default.models;
var productImageSchema = new Schema({
    url: { type: String },
    product_id: { type: mongoose_1.default.Types.ObjectId, ref: "Product" },
}, { timestamps: true });
var ProductImage = models.ProductImage ||
    mongoose_1.default.model("ProductImage", productImageSchema);
exports.ProductImage = ProductImage;
