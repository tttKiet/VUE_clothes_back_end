import mongoose, { Mongoose, StringSchemaDefinition } from "mongoose";
const { Schema, models } = mongoose;

export type Status =
  | "Mới"
  | "Đã xác nhận"
  | "Đã lấy hàng"
  | "Đang giao hàng"
  | "Đã giao";

export interface IOrder {
  _id?: string;
  user_id: StringSchemaDefinition;
  staff_id?: StringSchemaDefinition;
  ngay_dat_hang: Date;
  ngay_giao_hang: Date;
  trang_thai_DH: Status;
}

const orderSchema = new Schema<IOrder>(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: "User" },
    staff_id: { type: mongoose.Types.ObjectId, ref: "Staff" },
    ngay_dat_hang: { type: Date },
    ngay_giao_hang: { type: Date },
    trang_thai_DH: { type: String },
  },
  { timestamps: false }
);

// Validate
orderSchema.pre("validate", function (next) {
  if (this.ngay_dat_hang > this.ngay_giao_hang) {
    next(new Error("Ngày đặt hàng không thể lớn hơn ngày giao hàng."));
  } else {
    next();
  }
});

const Order = models.Order || mongoose.model<IOrder>("Order", orderSchema);

export { Order };
