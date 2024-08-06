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
exports.orderServices = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var Cart_1 = require("../app/models/Cart");
var ProductImage_1 = require("../app/models/ProductImage");
var Order_1 = require("../app/models/Order");
var OrderDetails_1 = require("../app/models/OrderDetails");
var Product_1 = require("../app/models/Product");
dotenv_1.default.config();
var OrderServices = /** @class */ (function () {
    function OrderServices() {
    }
    OrderServices.prototype.getOrder = function (_a) {
        var user_id = _a.user_id, trang_thai_DH = _a.trang_thai_DH;
        return __awaiter(this, void 0, void 0, function () {
            var where, orderDoc, promiseRawOrder, data, orderDoc, promiseRawOrder, data;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        where = {};
                        if (trang_thai_DH) {
                            where.trang_thai_DH = trang_thai_DH;
                        }
                        if (!!user_id) return [3 /*break*/, 3];
                        return [4 /*yield*/, Order_1.Order.find(__assign({}, where))
                                .populate("user_id")
                                .lean()];
                    case 1:
                        orderDoc = _b.sent();
                        promiseRawOrder = orderDoc.map(function (o) { return __awaiter(_this, void 0, void 0, function () {
                            var order, orderDetails;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        order = o;
                                        return [4 /*yield*/, this.getOrderDetails(o._id)];
                                    case 1:
                                        orderDetails = _a.sent();
                                        return [2 /*return*/, {
                                                order: order,
                                                orderDetails: orderDetails,
                                            }];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(promiseRawOrder)];
                    case 2:
                        data = _b.sent();
                        return [2 /*return*/, {
                                statusCode: 200,
                                msg: "Lấy danh sách đặt hàng thành công.",
                                data: data,
                            }];
                    case 3: return [4 /*yield*/, Order_1.Order.find({ user_id: user_id }).lean()];
                    case 4:
                        orderDoc = _b.sent();
                        if (!orderDoc)
                            return [2 /*return*/, {
                                    statusCode: 400,
                                    msg: "Không tìm thấy.",
                                }];
                        promiseRawOrder = orderDoc.map(function (o) { return __awaiter(_this, void 0, void 0, function () {
                            var order, orderDetails;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        order = o;
                                        return [4 /*yield*/, this.getOrderDetails(o._id)];
                                    case 1:
                                        orderDetails = _a.sent();
                                        return [2 /*return*/, {
                                                order: order,
                                                orderDetails: orderDetails,
                                            }];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(promiseRawOrder)];
                    case 5:
                        data = _b.sent();
                        return [2 /*return*/, {
                                statusCode: 200,
                                msg: "Lấy danh sách đặt hàng thành công.",
                                data: data,
                            }];
                }
            });
        });
    };
    OrderServices.prototype.getOrderDetails = function (order_id) {
        return __awaiter(this, void 0, void 0, function () {
            var orderDetailsDoc, promiseAll, data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, OrderDetails_1.OrderDetails.find({
                            order_id: order_id,
                        })
                            .populate("product_id")
                            .lean()];
                    case 1:
                        orderDetailsDoc = _a.sent();
                        promiseAll = orderDetailsDoc.map(function (OrderDetails) { return __awaiter(_this, void 0, void 0, function () {
                            var newP, imgDoc;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        newP = OrderDetails;
                                        return [4 /*yield*/, ProductImage_1.ProductImage.findOne({
                                                product_id: OrderDetails.product_id._id,
                                            }).lean()];
                                    case 1:
                                        imgDoc = _a.sent();
                                        newP.product_id.ProductImage = imgDoc;
                                        return [2 /*return*/, newP];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(promiseAll)];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    OrderServices.prototype.checkAvailableOrder = function (product_id, quantity) {
        return __awaiter(this, void 0, void 0, function () {
            var productDoc, quantityMax, orderTotalDoc, orderTotal, orderCancelDocPromise, orderCancelDoc, orderCancelTotal, ordered;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Product_1.Product.findOne({
                            _id: product_id,
                        }).lean()];
                    case 1:
                        productDoc = _a.sent();
                        if (!productDoc) return [3 /*break*/, 4];
                        quantityMax = productDoc.so_luong_hang || 0;
                        return [4 /*yield*/, OrderDetails_1.OrderDetails.find({
                                product_id: product_id,
                            })
                                .populate("order_id")
                                .lean()];
                    case 2:
                        orderTotalDoc = _a.sent();
                        orderTotal = orderTotalDoc.reduce(function (init, value) { return init + value.so_luong; }, 0);
                        orderCancelDocPromise = orderTotalDoc.filter(function (order) {
                            return order.order_id.trang_thai_DH == "CANCEL";
                        });
                        return [4 /*yield*/, Promise.all(orderCancelDocPromise)];
                    case 3:
                        orderCancelDoc = _a.sent();
                        orderCancelTotal = orderCancelDoc.reduce(function (init, value) { return init + value.so_luong; }, 0);
                        ordered = orderTotal - orderCancelTotal;
                        if (ordered + quantity > quantityMax)
                            return [2 /*return*/, {
                                    isAvailable: false,
                                    quantityAvailable: quantityMax - ordered,
                                }];
                        return [2 /*return*/, {
                                isAvailable: true,
                                quantityAvailable: quantityMax - ordered,
                            }];
                    case 4: return [2 /*return*/, {
                            isAvailable: false,
                            quantityAvailable: 0,
                        }];
                }
            });
        });
    };
    OrderServices.prototype.orderProductInCart = function (_a) {
        var cart_product_ids = _a.cart_product_ids, user_id = _a.user_id, so_dien_thoai_dat_hang = _a.so_dien_thoai_dat_hang, dia_chi_nhan = _a.dia_chi_nhan;
        return __awaiter(this, void 0, void 0, function () {
            var cartProductDoc, promiseCheckAvailable, checkOrderMap, productNotOrder, msgText, order, product_in_cart_details, orderDetailsDoc;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Cart_1.Cart.find({
                            _id: {
                                $in: cart_product_ids,
                            },
                        }).populate("product_id")];
                    case 1:
                        cartProductDoc = _b.sent();
                        if (cartProductDoc.length != cart_product_ids.length) {
                            return [2 /*return*/, {
                                    statusCode: 400,
                                    msg: "Bạn phải order các sản phẩm sản phẩm trong giỏ hàng của bạn.",
                                }];
                        }
                        else if (cartProductDoc.length <= 0) {
                            return [2 /*return*/, {
                                    statusCode: 400,
                                    msg: "Không có sản phẩm order.",
                                }];
                        }
                        promiseCheckAvailable = cartProductDoc.map(function (p) { return __awaiter(_this, void 0, void 0, function () {
                            var orderAvailable;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.checkAvailableOrder(p.product_id, p.so_luong)];
                                    case 1:
                                        orderAvailable = _a.sent();
                                        return [2 /*return*/, {
                                                productCart: p,
                                                isAvailable: orderAvailable.isAvailable,
                                                quantityAvailable: orderAvailable.quantityAvailable,
                                            }];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(promiseCheckAvailable)];
                    case 2:
                        checkOrderMap = _b.sent();
                        productNotOrder = checkOrderMap.filter(function (c) { return c.isAvailable == false; });
                        msgText = productNotOrder.reduce(function (acc, item) {
                            return (acc +
                                item.productCart.product_id.ten_HH +
                                ": " +
                                item.quantityAvailable +
                                "; ");
                        }, "");
                        if (productNotOrder.length > 0) {
                            return [2 /*return*/, {
                                    statusCode: 400,
                                    msg: "\u0110\u00E3 c\u00F3 ng\u01B0\u1EDDi v\u1EEBa \u0111\u1EB7t s\u1ED1 l\u01B0\u1EE3ng kh\u00F4ng \u0111\u1EE7 c\u1EA5p cho b\u1EA1n.\nS\u1ED1 l\u01B0\u1EE3ng c\u00F3 th\u1EC3 \u0111\u1EB7t:\n".concat(msgText),
                                }];
                        }
                        return [4 /*yield*/, Order_1.Order.create({
                                user_id: user_id,
                                ngay_giao_hang: null,
                                trang_thai_DH: "NEW",
                                so_dien_thoai_dat_hang: so_dien_thoai_dat_hang,
                                dia_chi_nhan: dia_chi_nhan,
                            })];
                    case 3:
                        order = _b.sent();
                        return [4 /*yield*/, Cart_1.Cart.deleteMany({
                                _id: {
                                    $in: cart_product_ids,
                                },
                            })];
                    case 4:
                        _b.sent();
                        // Remove order product in cart
                        if (!order) {
                            return [2 /*return*/, {
                                    statusCode: 500,
                                    msg: "Lỗi đặt hàng, xin thử lại! ",
                                }];
                        }
                        product_in_cart_details = cartProductDoc.map(function (productCart) {
                            return {
                                order_id: order._id,
                                size: productCart.size,
                                so_luong: productCart.so_luong,
                                product_id: productCart.product_id,
                                gia_Dat_hang: productCart.product_id.gia,
                            };
                        });
                        return [4 /*yield*/, OrderDetails_1.OrderDetails.insertMany(product_in_cart_details)];
                    case 5:
                        orderDetailsDoc = _b.sent();
                        return [2 /*return*/, {
                                statusCode: 200,
                                msg: "Đặt thành công.",
                                data: {
                                    order: order,
                                    order_details: orderDetailsDoc,
                                },
                            }];
                }
            });
        });
    };
    OrderServices.prototype.changeStatusOrder = function (_a) {
        var order_id = _a.order_id, status = _a.status;
        return __awaiter(this, void 0, void 0, function () {
            var ngay_giao_hang, oldDoc, productDetailDoc, promiseAll, docs, productNotOrder, msgText, updatedOrder;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ngay_giao_hang = null;
                        if (status === "DELIVERED") {
                            ngay_giao_hang = new Date();
                        }
                        if (!Order_1.StatusArray.includes(status)) {
                            return [2 /*return*/, {
                                    statusCode: 400,
                                    msg: "Trạng thái không đúng! ",
                                }];
                        }
                        return [4 /*yield*/, Order_1.Order.findOne({
                                _id: order_id,
                                trang_thai_DH: "CANCEL",
                            })];
                    case 1:
                        oldDoc = _b.sent();
                        if (!oldDoc) return [3 /*break*/, 4];
                        return [4 /*yield*/, OrderDetails_1.OrderDetails.find({
                                order_id: oldDoc._id,
                            })
                                .populate("product_id")
                                .lean()];
                    case 2:
                        productDetailDoc = _b.sent();
                        promiseAll = productDetailDoc.map(function (d) { return __awaiter(_this, void 0, void 0, function () {
                            var avail;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.checkAvailableOrder(d.product_id._id, d.so_luong)];
                                    case 1:
                                        avail = _a.sent();
                                        return [2 /*return*/, {
                                                orderDetails: d,
                                                available: avail,
                                            }];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(promiseAll)];
                    case 3:
                        docs = _b.sent();
                        productNotOrder = docs.filter(function (c) { return c.available.isAvailable == false; });
                        msgText = docs.reduce(function (acc, item) {
                            return (acc +
                                item.orderDetails.product_id.ten_HH +
                                ": " +
                                item.available.quantityAvailable +
                                "; ");
                        }, "");
                        if (productNotOrder.length > 0) {
                            return [2 /*return*/, {
                                    statusCode: 400,
                                    msg: "Kh\u00F4ng \u0111\u1EE7 s\u1ED1 l\u01B0\u1EE3ng cung c\u1EA5p.\nS\u1ED1 l\u01B0\u1EE3ng c\u00F3 th\u1EC3 \u0111\u1EB7t:\n".concat(msgText),
                                }];
                        }
                        _b.label = 4;
                    case 4: return [4 /*yield*/, Order_1.Order.updateOne({
                            _id: order_id,
                        }, {
                            ngay_giao_hang: ngay_giao_hang,
                            trang_thai_DH: status,
                        })];
                    case 5:
                        updatedOrder = _b.sent();
                        if (updatedOrder.modifiedCount > 0) {
                            return [2 /*return*/, {
                                    statusCode: 200,
                                    msg: "Thay đổi trạng thái thành công! ",
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    statusCode: 400,
                                    msg: "Dữ liệu không thay đổi! ",
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderServices.prototype.getOrderDetail = function (_a) {
        var _id = _a._id;
        return __awaiter(this, void 0, void 0, function () {
            var orderDoc, orderDetails;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Order_1.Order.findById(_id)
                            .populate("user_id")
                            .lean()];
                    case 1:
                        orderDoc = _b.sent();
                        if (!orderDoc) {
                            return [2 /*return*/, {
                                    statusCode: 400,
                                    msg: "Không tìm thấy order này.",
                                }];
                        }
                        return [4 /*yield*/, this.getOrderDetails(orderDoc._id)];
                    case 2:
                        orderDetails = _b.sent();
                        return [2 /*return*/, {
                                statusCode: 200,
                                msg: "Lấy chi tiết order thành công.",
                                data: {
                                    order: orderDoc,
                                    orderDetails: orderDetails,
                                },
                            }];
                }
            });
        });
    };
    OrderServices.prototype.getCancelOrder = function (_a) {
        var _id = _a._id;
        return __awaiter(this, void 0, void 0, function () {
            var orderDoc, orderUpdated;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Order_1.Order.findById(_id)
                            .populate("user_id")
                            .lean()];
                    case 1:
                        orderDoc = _b.sent();
                        if (!orderDoc) {
                            return [2 /*return*/, {
                                    statusCode: 400,
                                    msg: "Không tìm thấy order này.",
                                }];
                        }
                        if (orderDoc.trang_thai_DH !== "NEW") {
                            return [2 /*return*/, {
                                    statusCode: 400,
                                    msg: "Bạn không thể hủy. Đơn hàng đang di chuyển.",
                                }];
                        }
                        return [4 /*yield*/, Order_1.Order.updateOne({
                                _id: _id,
                            }, {
                                trang_thai_DH: "CANCEL",
                            })];
                    case 2:
                        orderUpdated = _b.sent();
                        if (orderUpdated.modifiedCount > 0)
                            return [2 /*return*/, {
                                    statusCode: 200,
                                    msg: "Hủy đơn thành công.",
                                }];
                        else {
                            return [2 /*return*/, {
                                    statusCode: 200,
                                    msg: "Dữ liệu không thay đổi.",
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderServices.prototype.orderOnlyProduct = function (_a) {
        var product_id = _a.product_id, so_luong = _a.so_luong, user_id = _a.user_id, size = _a.size, so_dien_thoai_dat_hang = _a.so_dien_thoai_dat_hang, dia_chi_nhan = _a.dia_chi_nhan;
        return __awaiter(this, void 0, void 0, function () {
            var productDoc, orderAvailable, msg, order, orderDetailsDoc;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Product_1.Product.findById(product_id).lean()];
                    case 1:
                        productDoc = _b.sent();
                        if (!productDoc)
                            return [2 /*return*/, {
                                    statusCode: 400,
                                    msg: "Không tìm thấy sản phẩm. Hãy f5 lại trang! ",
                                }];
                        return [4 /*yield*/, this.checkAvailableOrder(product_id, so_luong)];
                    case 2:
                        orderAvailable = _b.sent();
                        if (!orderAvailable.isAvailable) {
                            msg = productDoc.ten_HH + ": " + orderAvailable.quantityAvailable + ".";
                            return [2 /*return*/, {
                                    statusCode: 400,
                                    msg: "\u0110\u00E3 c\u00F3 ng\u01B0\u1EDDi v\u1EEBa \u0111\u1EB7t s\u1ED1 l\u01B0\u1EE3ng kh\u00F4ng \u0111\u1EE7 c\u1EA5p cho b\u1EA1n.\nS\u1ED1 l\u01B0\u1EE3ng c\u00F3 th\u1EC3 \u0111\u1EB7t:\n".concat(msg),
                                }];
                        }
                        return [4 /*yield*/, Order_1.Order.create({
                                user_id: user_id,
                                ngay_giao_hang: null,
                                trang_thai_DH: "NEW",
                                so_dien_thoai_dat_hang: so_dien_thoai_dat_hang,
                                dia_chi_nhan: dia_chi_nhan,
                            })];
                    case 3:
                        order = _b.sent();
                        return [4 /*yield*/, OrderDetails_1.OrderDetails.create({
                                order_id: order._id,
                                size: size,
                                so_luong: so_luong,
                                product_id: product_id,
                                gia_Dat_hang: productDoc.gia,
                            })];
                    case 4:
                        orderDetailsDoc = _b.sent();
                        return [2 /*return*/, {
                                statusCode: 200,
                                msg: "Đặt thành công.",
                                data: {
                                    order: order,
                                    order_details: orderDetailsDoc,
                                },
                            }];
                }
            });
        });
    };
    OrderServices.prototype.getChartRevenue = function (_a) {
        var key = _a.key, value = _a.value;
        return __awaiter(this, void 0, void 0, function () {
            var op, order, arrayData_1, valueToMonth, result;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        op = {};
                        if (!(key == "year")) return [3 /*break*/, 3];
                        op.$and = [{ $eq: [{ $year: "$ngay_giao_hang" }, value] }];
                        return [4 /*yield*/, Order_1.Order.find({
                                trang_thai_DH: "DELIVERED",
                                $expr: __assign({}, op),
                            }).lean()];
                    case 1:
                        order = _b.sent();
                        arrayData_1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                        valueToMonth = order.map(function (o) { return __awaiter(_this, void 0, void 0, function () {
                            var month, orderDetails, totalPrice;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        month = new Date(o.ngay_dat_hang).getMonth();
                                        return [4 /*yield*/, OrderDetails_1.OrderDetails.find({
                                                order_id: o._id,
                                            }).lean()];
                                    case 1:
                                        orderDetails = _a.sent();
                                        totalPrice = orderDetails.reduce(function (init, item) {
                                            return init + item.gia_Dat_hang * item.so_luong;
                                        }, 0);
                                        arrayData_1[month] += totalPrice;
                                        return [2 /*return*/, o];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(valueToMonth)];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, {
                                statusCode: 200,
                                msg: "ok",
                                data: arrayData_1,
                                t: result,
                            }];
                    case 3: return [2 /*return*/, {
                            statusCode: 200,
                            msg: "ok",
                            data: [],
                        }];
                }
            });
        });
    };
    return OrderServices;
}());
var orderServices = new OrderServices();
exports.orderServices = orderServices;
