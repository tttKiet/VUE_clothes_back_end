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
exports.adminController = void 0;
var api_error_1 = __importDefault(require("../../utils/api-error"));
var validate_req_body_1 = require("../../utils/validate-req-body");
var adminServices_1 = require("../../services/adminServices");
var common_1 = require("../../utils/common");
var orderServices_1 = require("../../services/orderServices");
var AdminController = /** @class */ (function () {
    function AdminController() {
        var _this = this;
        this.handleCreateOrUpdateProduct = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _id, ten_HH, mo_ta_HH, gia, so_luong_hang, ghi_chu, image, url, isValid, result, error_1, err;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, _id = _a._id, ten_HH = _a.ten_HH, mo_ta_HH = _a.mo_ta_HH, gia = _a.gia, so_luong_hang = _a.so_luong_hang, ghi_chu = _a.ghi_chu, image = _a.image;
                        // Create
                        if (!_id) {
                            if (!req.file) {
                                return [2 /*return*/, next(new api_error_1.default(400, "Ảnh chưa được tải lên."))];
                            }
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        url = ((_b = req.file) === null || _b === void 0 ? void 0 : _b.path) || image;
                        isValid = (0, validate_req_body_1.validateReqBody)(ten_HH, mo_ta_HH, gia, so_luong_hang);
                        if (!isValid) {
                            // delete file
                            (0, common_1.destroyUploadCloundinary)(req.file.path);
                            return [2 /*return*/, next(new api_error_1.default(400, "Thiếu tham số truyền vào."))];
                        }
                        return [4 /*yield*/, adminServices_1.adminServices.createOrUpdateProduct({
                                _id: _id,
                                ten_HH: ten_HH,
                                mo_ta_HH: mo_ta_HH,
                                gia: gia,
                                so_luong_hang: so_luong_hang,
                                ghi_chu: ghi_chu,
                            }, url)];
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
                        error_1 = _c.sent();
                        err = error_1;
                        console.log(error_1);
                        return [2 /*return*/, next(new api_error_1.default(500, (err === null || err === void 0 ? void 0 : err.message) || ""))];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.handleGetproduct = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var result, error_2, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, adminServices_1.adminServices.getProduct()];
                    case 1:
                        result = _a.sent();
                        if (result.statusCode === 200) {
                            return [2 /*return*/, res.status(200).json(result)];
                        }
                        else {
                            return [2 /*return*/, next(new api_error_1.default(result.statusCode, result.msg))];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        err = error_2;
                        console.log(error_2);
                        return [2 /*return*/, next(new api_error_1.default(500, (err === null || err === void 0 ? void 0 : err.message) || ""))];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.handleGetProductById = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _id, result, error_3, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = req.params._id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, adminServices_1.adminServices.getProductById(_id)];
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
                        error_3 = _a.sent();
                        err = error_3;
                        console.log(error_3);
                        return [2 /*return*/, next(new api_error_1.default(500, (err === null || err === void 0 ? void 0 : err.message) || ""))];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.handleDeleteProduct = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _id, result, error_4, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _id = req.body._id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (!_id) {
                            return [2 /*return*/, next(new api_error_1.default(400, "Thiếu tham số truyền vào."))];
                        }
                        return [4 /*yield*/, adminServices_1.adminServices.deleteProduct(_id)];
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
                        error_4 = _a.sent();
                        err = error_4;
                        console.log(error_4);
                        return [2 /*return*/, next(new api_error_1.default(500, (err === null || err === void 0 ? void 0 : err.message) || ""))];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.handleGetOrder = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var trang_thai_DH, result, error_5, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        trang_thai_DH = req.query.trang_thai_DH;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, orderServices_1.orderServices.getOrder({ trang_thai_DH: trang_thai_DH })];
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
                        error_5 = _a.sent();
                        err = error_5;
                        console.log(error_5);
                        return [2 /*return*/, next(new api_error_1.default(500, (err === null || err === void 0 ? void 0 : err.message) || ""))];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.handleChangeStatusOrder = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, order_id, status, result, error_6, err;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, order_id = _a.order_id, status = _a.status;
                        if (!order_id || !status) {
                            return [2 /*return*/, next(new api_error_1.default(400, "Thiếu tham số truyền vào."))];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, orderServices_1.orderServices.changeStatusOrder({
                                order_id: order_id,
                                status: status,
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
                        console.log(error_6);
                        return [2 /*return*/, next(new api_error_1.default(500, (err === null || err === void 0 ? void 0 : err.message) || ""))];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.handleGetChartRevenue = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, key, value, result, error_7, err;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.query, key = _a.key, value = _a.value;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, orderServices_1.orderServices.getChartRevenue({ key: key, value: value })];
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
                        error_7 = _b.sent();
                        err = error_7;
                        console.log(error_7);
                        return [2 /*return*/, next(new api_error_1.default(500, (err === null || err === void 0 ? void 0 : err.message) || ""))];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return AdminController;
}());
var adminController = new AdminController();
exports.adminController = adminController;
