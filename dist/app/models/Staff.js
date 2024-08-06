"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Staff = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema, models = mongoose_1.default.models;
var staffSchema = new Schema({
    ho_ten_KH: { type: String },
    password: { type: String },
    dia_chi: { type: String },
    so_dien_thoai: { type: String, unique: true },
    chuc_vu: {
        type: String,
    },
}, { timestamps: true });
var Staff = models.Staff || mongoose_1.default.model("Staff", staffSchema);
exports.Staff = Staff;
