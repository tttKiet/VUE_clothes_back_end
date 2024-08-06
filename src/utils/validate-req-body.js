"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReqBody = void 0;
function validateReqBody() {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i] = arguments[_i];
    }
    var isValid = data.every(function (d) {
        return !!d;
    });
    return !!isValid;
}
exports.validateReqBody = validateReqBody;
