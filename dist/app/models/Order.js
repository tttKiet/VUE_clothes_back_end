"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.StatusArray = exports.StatusEnum = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema, models = mongoose_1.default.models;
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["NEW"] = "Ch\u1EDD x\u00E1c nh\u1EADn";
    StatusEnum["CONFIRMED"] = "\u0110\u00E3 x\u00E1c nh\u1EADn";
    StatusEnum["PICKED_UP"] = "\u0110\u00E3 l\u1EA5y h\u00E0ng";
    StatusEnum["DELIVERING"] = "\u0110ang giao h\u00E0ng";
    StatusEnum["DELIVERED"] = "\u0110\u00E3 giao";
    StatusEnum["CANCEL"] = "\u0110\u00E3 h\u1EE7y";
})(StatusEnum || (exports.StatusEnum = StatusEnum = {}));
exports.StatusArray = [
    "NEW",
    "CONFIRMED",
    "PICKED_UP",
    "DELIVERING",
    "DELIVERED",
    "CANCEL",
];
var orderSchema = new Schema({
    user_id: { type: mongoose_1.default.Types.ObjectId, ref: "User" },
    staff_id: { type: mongoose_1.default.Types.ObjectId, ref: "Staff" },
    ngay_dat_hang: { type: Date, default: new Date() },
    ngay_giao_hang: { type: Date, default: null },
    so_dien_thoai_dat_hang: { type: String },
    dia_chi_nhan: { type: String },
    trang_thai_DH: { type: String, default: "NEW" },
}, { timestamps: false });
// Validate
orderSchema.pre("validate", function (next) {
    if (this.ngay_giao_hang !== null &&
        this.ngay_dat_hang > this.ngay_giao_hang) {
        next(new Error("Ngày đặt hàng không thể lớn hơn ngày giao hàng."));
    }
    else {
        next();
    }
});
var Order = models.Order || mongoose_1.default.model("Order", orderSchema);
exports.Order = Order;
