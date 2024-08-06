"use strict";
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
exports.userController = void 0;
var services_1 = require("../../services");
var api_error_1 = __importDefault(require("../../utils/api-error"));
var validate_req_body_1 = require("../../utils/validate-req-body");
var orderServices_1 = require("../../services/orderServices");
var UserController = /** @class */ (function () {
    function UserController() {
        var _this = this;
        this.handleCreateUser = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, ho_ten_KH, password, dia_chi, so_dien_thoai, chuc_vu, isValid, result, error_1, err;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, ho_ten_KH = _a.ho_ten_KH, password = _a.password, dia_chi = _a.dia_chi, so_dien_thoai = _a.so_dien_thoai, chuc_vu = _a.chuc_vu;
                        if (chuc_vu) {
                            // check permissions
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        isValid = (0, validate_req_body_1.validateReqBody)(ho_ten_KH, password, dia_chi, so_dien_thoai);
                        if (!isValid) {
                            return [2 /*return*/, next(new api_error_1.default(400, "Thiếu tham số truyền vào."))];
                        }
                        return [4 /*yield*/, services_1.userServices.createUser({
                                ho_ten_KH: ho_ten_KH,
                                password: password,
                                dia_chi: dia_chi,
                                so_dien_thoai: so_dien_thoai,
                            }, chuc_vu)];
                    case 2:
                        result = _b.sent();
                        if (result.statusCode === 200) {
                            return [2 /*return*/, res.status(200).json(result)];
                        }
                        else {
                            return [2 /*return*/, next(new api_error_1.default(result.statusCode, result.msg))];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        err = error_1;
                        return [2 /*return*/, next(new api_error_1.default(500, (err === null || err === void 0 ? void 0 : err.message) || ""))];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.handleAddCart = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, product_id, so_luong, size, user_id, result, error_2, err;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, product_id = _a.product_id, so_luong = _a.so_luong, size = _a.size;
                        if (!product_id || !so_luong || !size) {
                            return [2 /*return*/, next(new api_error_1.default(400, "Thiếu tham số truyền vào."))];
                        }
                        else if (so_luong <= 0) {
                            return [2 /*return*/, next(new api_error_1.default(400, "Số lượng phải lớn hơn 0."))];
                        }
                        user_id = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, services_1.userServices.addCart({
                                product_id: product_id,
                                so_luong: so_luong,
                                user_id: user_id,
                                size: size,
                            })];
                    case 2:
                        result = _c.sent();
                        if (result.statusCode === 200) {
                            return [2 /*return*/, res.status(200).json(result)];
                        }
                        else {
                            return [2 /*return*/, next(new api_error_1.default(result.statusCode, result.msg))];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _c.sent();
                        err = error_2;
                        return [2 /*return*/, next(new api_error_1.default(500, (err === null || err === void 0 ? void 0 : err.message) || ""))];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.handleEditCart = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, product_id, so_luong, size, size_old, user_id, result, error_3, err;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, product_id = _a.product_id, so_luong = _a.so_luong, size = _a.size, size_old = _a.size_old;
                        if (!product_id && !so_luong && !size) {
                            return [2 /*return*/, next(new api_error_1.default(400, "Thiếu tham số truyền vào."))];
                        }
                        else if (so_luong <= 0) {
                            return [2 /*return*/, next(new api_error_1.default(400, "Số lượng phải lớn hơn 0."))];
                        }
                        user_id = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, services_1.userServices.updateCart({
                                product_id: product_id,
                                so_luong: so_luong,
                                user_id: user_id,
                                size_old: size_old,
                                size: size,
                            })];
                    case 2:
                        result = _c.sent();
                        if (result.statusCode === 200) {
                            return [2 /*return*/, res.status(200).json(result)];
                        }
                        else {
                            return [2 /*return*/, next(new api_error_1.default(result.statusCode, result.msg))];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _c.sent();
                        err = error_3;
                        return [2 /*return*/, next(new api_error_1.default(500, (err === null || err === void 0 ? void 0 : err.message) || ""))];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.handleDeleteProductCart = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var product_id, user_id, result, error_4, err;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        product_id = req.body.product_id;
                        if (!product_id) {
                            return [2 /*return*/, next(new api_error_1.default(400, "Thiếu tham số truyền vào."))];
                        }
                        user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, services_1.userServices.deleteCart({
                                product_id: product_id,
                                user_id: user_id,
                            })];
                    case 2:
                        result = _b.sent();
                        if (result.statusCode === 200) {
                            return [2 /*return*/, res.status(200).json(result)];
                        }
                        else {
                            return [2 /*return*/, next(new api_error_1.default(result.statusCode, result.msg))];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _b.sent();
                        err = error_4;
                        return [2 /*return*/, next(new api_error_1.default(500, (err === null || err === void 0 ? void 0 : err.message) || ""))];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.handleGetCart = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var user_id, result, error_5, err;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, services_1.userServices.getCart({
                                user_id: user_id,
                            })];
                    case 2:
                        result = _b.sent();
                        if (result.statusCode === 200) {
                            return [2 /*return*/, res.status(200).json(result)];
                        }
                        else {
                            return [2 /*return*/, next(new api_error_1.default(result.statusCode, result.msg))];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _b.sent();
                        err = error_5;
                        return [2 /*return*/, next(new api_error_1.default(500, (err === null || err === void 0 ? void 0 : err.message) || ""))];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        // Order
        this.handleGetOrder = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var user_id, result, error_6, err;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, orderServices_1.orderServices.getOrder({
                                user_id: user_id,
                            })];
                    case 2:
                        result = _b.sent();
                        if (result.statusCode === 200) {
                            return [2 /*return*/, res.status(200).json(result)];
                        }
                        else {
                            return [2 /*return*/, next(new api_error_1.default(result.statusCode, result.msg))];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _b.sent();
                        err = error_6;
                        return [2 /*return*/, next(new api_error_1.default(500, (err === null || err === void 0 ? void 0 : err.message) || ""))];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.handleOrderProductCart = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var user_id, _a, cart_product_ids, so_dien_thoai_dat_hang, dia_chi_nhan, isValid, result, error_7, err;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        user_id = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
                        _a = req.body, cart_product_ids = _a.cart_product_ids, so_dien_thoai_dat_hang = _a.so_dien_thoai_dat_hang, dia_chi_nhan = _a.dia_chi_nhan;
                        isValid = (0, validate_req_body_1.validateReqBody)(so_dien_thoai_dat_hang, dia_chi_nhan);
                        if (!isValid) {
                            return [2 /*return*/, next(new api_error_1.default(400, "Thiếu tham số truyền vào."))];
                        }
                        if (!Array.isArray(cart_product_ids))
                            cart_product_ids = [cart_product_ids];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, orderServices_1.orderServices.orderProductInCart({
                                cart_product_ids: cart_product_ids,
                                user_id: user_id,
                                so_dien_thoai_dat_hang: so_dien_thoai_dat_hang,
                                dia_chi_nhan: dia_chi_nhan,
                            })];
                    case 2:
                        result = _c.sent();
                        if (result.statusCode === 200) {
                            return [2 /*return*/, res.status(200).json(result)];
                        }
                        else {
                            return [2 /*return*/, next(new api_error_1.default(result.statusCode, result.msg))];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _c.sent();
                        err = error_7;
                        return [2 /*return*/, next(new api_error_1.default(500, (err === null || err === void 0 ? void 0 : err.message) || ""))];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.handleOrderOneItem = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var user_id, _a, product_id, size, so_luong, so_dien_thoai_dat_hang, dia_chi_nhan, isValid, result, error_8, err;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        user_id = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
                        _a = req.body, product_id = _a.product_id, size = _a.size, so_luong = _a.so_luong, so_dien_thoai_dat_hang = _a.so_dien_thoai_dat_hang, dia_chi_nhan = _a.dia_chi_nhan;
                        isValid = (0, validate_req_body_1.validateReqBody)(product_id, size, so_luong, so_dien_thoai_dat_hang, dia_chi_nhan);
                        if (!isValid) {
                            return [2 /*return*/, next(new api_error_1.default(400, "Thiếu tham số truyền vào."))];
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, orderServices_1.orderServices.orderOnlyProduct({
                                product_id: product_id,
                                size: size,
                                so_luong: so_luong,
                                user_id: user_id,
                                so_dien_thoai_dat_hang: so_dien_thoai_dat_hang,
                                dia_chi_nhan: dia_chi_nhan,
                            })];
                    case 2:
                        result = _c.sent();
                        if (result.statusCode === 200) {
                            return [2 /*return*/, res.status(200).json(result)];
                        }
                        else {
                            return [2 /*return*/, next(new api_error_1.default(result.statusCode, result.msg))];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_8 = _c.sent();
                        err = error_8;
                        return [2 /*return*/, next(new api_error_1.default(500, (err === null || err === void 0 ? void 0 : err.message) || ""))];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.handleGetOrderDetail = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _id, result, error_9, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = req.params._id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, orderServices_1.orderServices.getOrderDetail({ _id: _id })];
                    case 2:
                        result = _a.sent();
                        if (result.statusCode === 200) {
                            return [2 /*return*/, res.status(200).json(result)];
                        }
                        else {
                            return [2 /*return*/, next(new api_error_1.default(result.statusCode, result.msg))];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_9 = _a.sent();
                        err = error_9;
                        console.log(error_9);
                        return [2 /*return*/, next(new api_error_1.default(500, (err === null || err === void 0 ? void 0 : err.message) || ""))];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.handleGetCancelOrder = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _id, result, error_10, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = req.params._id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, orderServices_1.orderServices.getCancelOrder({ _id: _id })];
                    case 2:
                        result = _a.sent();
                        if (result.statusCode === 200) {
                            return [2 /*return*/, res.status(200).json(result)];
                        }
                        else {
                            return [2 /*return*/, next(new api_error_1.default(result.statusCode, result.msg))];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_10 = _a.sent();
                        err = error_10;
                        console.log(error_10);
                        return [2 /*return*/, next(new api_error_1.default(500, (err === null || err === void 0 ? void 0 : err.message) || ""))];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return UserController;
}());
var userController = new UserController();
exports.userController = userController;
