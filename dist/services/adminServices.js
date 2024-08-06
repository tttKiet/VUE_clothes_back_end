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
exports.adminServices = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var Product_1 = require("../app/models/Product");
var ProductImage_1 = require("../app/models/ProductImage");
var common_1 = require("../utils/common");
var orderServices_1 = require("./orderServices");
dotenv_1.default.config();
var AdminServices = /** @class */ (function () {
    function AdminServices() {
    }
    AdminServices.prototype.createOrUpdateProduct = function (product, imageUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var productImg, productDoc, productDoc, doc, productImg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(product === null || product === void 0 ? void 0 : product._id)) return [3 /*break*/, 4];
                        if (!imageUrl) return [3 /*break*/, 2];
                        return [4 /*yield*/, ProductImage_1.ProductImage.updateMany({
                                product_id: product._id,
                            }, {
                                url: imageUrl,
                            })];
                    case 1:
                        productImg = _a.sent();
                        if (!productImg) {
                            return [2 /*return*/, {
                                    statusCode: 400,
                                    msg: "Cập nhật hình ảnh thất bại.",
                                }];
                        }
                        _a.label = 2;
                    case 2: return [4 /*yield*/, Product_1.Product.findOneAndUpdate({
                            _id: product._id,
                        }, __assign({}, product))];
                    case 3:
                        productDoc = _a.sent();
                        if (productDoc) {
                            return [2 /*return*/, {
                                    statusCode: 200,
                                    msg: "Cập nhật hàng hóa thành công.",
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    statusCode: 400,
                                    msg: "Hàng hóa đã tồn tại.",
                                }];
                        }
                        return [3 /*break*/, 9];
                    case 4: return [4 /*yield*/, Product_1.Product.findOne({
                            ten_HH: product.ten_HH,
                        })];
                    case 5:
                        productDoc = _a.sent();
                        if (productDoc) {
                            return [2 /*return*/, {
                                    statusCode: 400,
                                    msg: "Hàng hóa đã tồn tại.",
                                }];
                        }
                        return [4 /*yield*/, Product_1.Product.create(__assign({}, product))];
                    case 6:
                        doc = _a.sent();
                        if (!doc) return [3 /*break*/, 8];
                        return [4 /*yield*/, ProductImage_1.ProductImage.create({
                                product_id: doc._id,
                                url: imageUrl,
                            })];
                    case 7:
                        productImg = _a.sent();
                        if (!productImg) {
                            return [2 /*return*/, {
                                    statusCode: 400,
                                    msg: "Thêm hình ảnh thất bại.",
                                }];
                        }
                        doc.imageUrl = imageUrl;
                        return [2 /*return*/, {
                                statusCode: 200,
                                msg: "Đã thêm hàng hóa.",
                                data: doc,
                            }];
                    case 8: return [2 /*return*/, {
                            statusCode: 400,
                            msg: "Lỗi tạo hàng hóa, vui lòng thử lại!",
                        }];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    AdminServices.prototype.deleteProduct = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, pro, proImg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            Product_1.Product.findOneAndRemove({
                                _id: _id,
                            }),
                            ProductImage_1.ProductImage.findOneAndRemove({
                                product_id: _id,
                            }),
                        ])];
                    case 1:
                        _a = _b.sent(), pro = _a[0], proImg = _a[1];
                        if (!proImg) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, common_1.destroyUploadCloundinary)(proImg.url)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        if (pro || proImg) {
                            return [2 /*return*/, {
                                    statusCode: 200,
                                    msg: "Đã xóa thành công.",
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    statusCode: 400,
                                    msg: "Xóa thất bại, vui lòng thử lại.",
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminServices.prototype.getProduct = function () {
        return __awaiter(this, void 0, void 0, function () {
            var productDoc, promiseAll, data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Product_1.Product.find().sort({ createdAt: "desc" }).lean()];
                    case 1:
                        productDoc = _a.sent();
                        promiseAll = productDoc.map(function (product) { return __awaiter(_this, void 0, void 0, function () {
                            var newP, imgDoc, availableOrder;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        newP = product;
                                        return [4 /*yield*/, ProductImage_1.ProductImage.findOne({
                                                product_id: product._id,
                                            }).lean()];
                                    case 1:
                                        imgDoc = _a.sent();
                                        return [4 /*yield*/, orderServices_1.orderServices.checkAvailableOrder(product._id, 0)];
                                    case 2:
                                        availableOrder = _a.sent();
                                        console.log("availableOrder-- ", availableOrder);
                                        newP.ProductImage = imgDoc;
                                        newP.availableOrder = availableOrder.quantityAvailable;
                                        return [2 /*return*/, newP];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(promiseAll)];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, {
                                statusCode: 200,
                                msg: "Lấy thành công.",
                                data: data,
                            }];
                }
            });
        });
    };
    AdminServices.prototype.getProductById = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var productDoc, newP, imgDoc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Product_1.Product.findById(_id).lean()];
                    case 1:
                        productDoc = _a.sent();
                        if (!productDoc) return [3 /*break*/, 3];
                        newP = productDoc;
                        return [4 /*yield*/, ProductImage_1.ProductImage.findOne({
                                product_id: productDoc._id,
                            }).lean()];
                    case 2:
                        imgDoc = _a.sent();
                        newP.ProductImage = imgDoc;
                        return [2 /*return*/, {
                                statusCode: 200,
                                msg: "Lấy thành công.",
                                data: newP,
                            }];
                    case 3: return [2 /*return*/, {
                            statusCode: 400,
                            msg: "Không tim thấy.",
                            data: null,
                        }];
                }
            });
        });
    };
    return AdminServices;
}());
var adminServices = new AdminServices();
exports.adminServices = adminServices;
