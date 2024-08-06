"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiError = /** @class */ (function () {
    function ApiError(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }
    return ApiError;
}());
exports.default = ApiError;
