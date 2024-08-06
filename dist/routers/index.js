"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apiRouter_1 = __importDefault(require("./apiRouter"));
var route = function (app) {
    app.use("/api/v1", apiRouter_1.default);
    // Page not found
    // app.use((req, res, next) => {
    //   return next(new ApiError(404, "Resource not found"));
    // });
};
exports.default = route;
