"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
var models_1 = require("../app/models");
var bcrypt_1 = __importDefault(require("bcrypt"));
var dotenv_1 = __importDefault(require("dotenv"));
var Staff_1 = require("../app/models/Staff");
var Cart_1 = require("../app/models/Cart");
var ProductImage_1 = require("../app/models/ProductImage");
dotenv_1.default.config();
var UserServices = /** @class */ (function () {
    function UserServices() {
    }
    UserServices.prototype.saveToken = function (user, token) {
        return __awaiter(this, void 0, void 0, function () {
            var docs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.User.updateOne({
                            _id: user._id,
                        }, {
                            token: token,
                        })];
                    case 1:
                        docs = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserServices.prototype.createUser = function (user, chuc_vu) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var userExists, staffExists, saft, hashPassword, data, staffDoc, data, userDoc;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, models_1.User.findOne({
                            so_dien_thoai: user.so_dien_thoai,
                        })];
                    case 1:
                        userExists = _b.sent();
                        return [4 /*yield*/, Staff_1.Staff.findOne({
                                so_dien_thoai: user.so_dien_thoai,
                            })];
                    case 2:
                        staffExists = _b.sent();
                        if (userExists || staffExists) {
                            return [2 /*return*/, {
                                    statusCode: 406,
                                    msg: "Người dùng đã tồn tại.",
                                }];
                        }
                        saft = Number.parseInt(((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.SALT_ROUNDS) || "10");
                        return [4 /*yield*/, bcrypt_1.default.hash(user.password, saft)];
                    case 3:
                        hashPassword = _b.sent();
                        if (!chuc_vu) return [3 /*break*/, 5];
                        data = __assign(__assign({}, user), { password: hashPassword, chuc_vu: chuc_vu });
                        return [4 /*yield*/, Staff_1.Staff.create(data)];
                    case 4:
                        staffDoc = _b.sent();
                        return [2 /*return*/, {
                                statusCode: 200,
                                msg: "Tạo nhân viên thành công.",
                                data: staffDoc,
                            }];
                    case 5:
                        data = __assign(__assign({}, user), { password: hashPassword });
                        return [4 /*yield*/, models_1.User.create(data)];
                    case 6:
                        userDoc = _b.sent();
                        return [2 /*return*/, {
                                statusCode: 200,
                                msg: "Tạo người dùng thành công.",
                                data: userDoc,
                            }];
                }
            });
        });
    };
    UserServices.prototype.addCart = function (_a) {
        var product_id = _a.product_id, so_luong = _a.so_luong, user_id = _a.user_id, size = _a.size;
        return __awaiter(this, void 0, void 0, function () {
            var productCart, productCart_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Cart_1.Cart.findOneAndUpdate({
                            product_id: product_id,
                            user_id: user_id,
                            size: size,
                        }, {
                            $inc: {
                                so_luong: so_luong,
                            },
                        })];
                    case 1:
                        productCart = _b.sent();
                        if (!productCart) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                statusCode: 200,
                                msg: "Thêm thành công.",
                            }];
                    case 2: return [4 /*yield*/, Cart_1.Cart.create({
                            product_id: product_id,
                            user_id: user_id,
                            so_luong: so_luong,
                            size: size,
                        })];
                    case 3:
                        productCart_1 = _b.sent();
                        if (productCart_1) {
                            return [2 /*return*/, {
                                    statusCode: 200,
                                    msg: "Thêm thành công.",
                                    data: productCart_1,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    statusCode: 400,
                                    msg: "Thêm thất bại.",
                                }];
                        }
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserServices.prototype.updateCart = function (_a) {
        var product_id = _a.product_id, so_luong = _a.so_luong, user_id = _a.user_id, size = _a.size, size_old = _a.size_old;
        return __awaiter(this, void 0, void 0, function () {
            var productCart;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!size_old) return [3 /*break*/, 2];
                        return [4 /*yield*/, Cart_1.Cart.findOneAndUpdate({
                                product_id: product_id,
                                user_id: user_id,
                                size: size_old,
                            }, {
                                size: size,
                            })];
                    case 1:
                        productCart = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, Cart_1.Cart.findOneAndUpdate({
                            product_id: product_id,
                            user_id: user_id,
                            size: size,
                        }, {
                            so_luong: so_luong,
                        })];
                    case 3:
                        productCart = _b.sent();
                        _b.label = 4;
                    case 4:
                        if (productCart) {
                            return [2 /*return*/, {
                                    statusCode: 200,
                                    msg: "Cập nhật thành công.",
                                    data: productCart,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    statusCode: 400,
                                    msg: "Cập nhật thất bại.",
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserServices.prototype.deleteCart = function (_a) {
        var product_id = _a.product_id, user_id = _a.user_id;
        return __awaiter(this, void 0, void 0, function () {
            var productCart;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Cart_1.Cart.deleteOne({
                            product_id: product_id,
                            user_id: user_id,
                        })];
                    case 1:
                        productCart = _b.sent();
                        if (productCart) {
                            return [2 /*return*/, {
                                    statusCode: 200,
                                    msg: "Xóa thành công.",
                                    data: productCart,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    statusCode: 400,
                                    msg: "Xóa thất bại.",
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserServices.prototype.getCart = function (_a) {
        var user_id = _a.user_id;
        return __awaiter(this, void 0, void 0, function () {
            var productCart, promiseAll, data;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Cart_1.Cart.find({
                            user_id: user_id,
                        })
                            .populate("product_id")
                            .lean()];
                    case 1:
                        productCart = _b.sent();
                        promiseAll = productCart.map(function (productCartItem) { return __awaiter(_this, void 0, void 0, function () {
                            var newP, imgDoc;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        newP = productCartItem;
                                        return [4 /*yield*/, ProductImage_1.ProductImage.findOne({
                                                product_id: (_a = productCartItem === null || productCartItem === void 0 ? void 0 : productCartItem.product_id) === null || _a === void 0 ? void 0 : _a._id,
                                            }).lean()];
                                    case 1:
                                        imgDoc = _b.sent();
                                        newP.product_id.ProductImage = imgDoc;
                                        return [2 /*return*/, newP];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(promiseAll)];
                    case 2:
                        data = _b.sent();
                        if (productCart) {
                            return [2 /*return*/, {
                                    statusCode: 200,
                                    msg: "Lấy thành công.",
                                    data: data,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    statusCode: 400,
                                    msg: "Lấy thất bại.",
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserServices;
}());
var userServices = new UserServices();
exports.userServices = userServices;
