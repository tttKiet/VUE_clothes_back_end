"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserToken = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema, models = mongoose_1.default.models;
var userTokenSchema = new Schema({
    userId: { type: String, refPath: "userType" },
    userType: {
        type: String,
        required: true,
        enum: ["User", "Staff"],
    },
    refresh_token: { type: String },
}, { timestamps: true });
var UserToken = models.UserToken || mongoose_1.default.model("UserToken", userTokenSchema);
exports.UserToken = UserToken;
