"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema, models = mongoose_1.default.models;
var userSchema = new Schema({
    ho_ten_KH: { type: String },
    password: { type: String },
    dia_chi: { type: String },
    so_dien_thoai: { type: String, unique: true },
}, { timestamps: true });
var User = models.User || mongoose_1.default.model("User", userSchema);
exports.User = User;
