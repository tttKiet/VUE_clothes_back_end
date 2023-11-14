import mongoose, { Mongoose, StringSchemaDefinition } from "mongoose";
const { Schema, models } = mongoose;

export enum StatusEnum {
  NEW = "Chưa xác nhận",
  CONFIRMED = "Đã xác nhận",
  PICKED_UP = "Đã lấy hàng",
  DELIVERING = "Đang giao hàng",
  DELIVERED = "Đã giao",
}

type StatusEnumType = keyof typeof StatusEnum;

export const StatusArray = [
  "NEW",
  "CONFIRMED",
  "PICKED_UP",
  "DELIVERING",
  "DELIVERED",
];

export interface IOrder {
  _id?: string;
  user_id: StringSchemaDefinition;
  staff_id?: StringSchemaDefinition;
  ngay_dat_hang: Date;
  so_dien_thoai_dat_hang: string;
  dia_chi_nhan: string;
  ngay_giao_hang: Date;
  trang_thai_DH: string | StatusEnumType;
}

const orderSchema = new Schema<IOrder>(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: "User" },
    staff_id: { type: mongoose.Types.ObjectId, ref: "Staff" },
    ngay_dat_hang: { type: Date, default: new Date() },
    ngay_giao_hang: { type: Date, default: null },
    so_dien_thoai_dat_hang: { type: String },
    dia_chi_nhan: { type: String },
    trang_thai_DH: { type: String, default: "NEW" },
  },
  { timestamps: false }
);

// Validate
orderSchema.pre("validate", function (next) {
  if (
    this.ngay_giao_hang !== null &&
    this.ngay_dat_hang > this.ngay_giao_hang
  ) {
    next(new Error("Ngày đặt hàng không thể lớn hơn ngày giao hàng."));
  } else {
    next();
  }
});

const Order = models.Order || mongoose.model<IOrder>("Order", orderSchema);

export { Order };
