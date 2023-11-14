import mongoose, { Mongoose, StringSchemaDefinition } from "mongoose";
import { Sizes } from "./Cart";
const { Schema, models } = mongoose;

export interface IOrderDetails {
  _id?: StringSchemaDefinition;
  order_id: StringSchemaDefinition;
  product_id: StringSchemaDefinition;
  size: Sizes;
  so_luong: number;
  gia_Dat_hang: number;
  giam_gia: number;
}

const orderDetailsSchema = new Schema<IOrderDetails>(
  {
    order_id: { type: mongoose.Types.ObjectId, ref: "Order" },
    product_id: { type: mongoose.Types.ObjectId, ref: "Product" },
    size: { type: String },
    so_luong: { type: Number },
    gia_Dat_hang: { type: Number },
    giam_gia: { type: Number, default: 0 },
  },
  { timestamps: false }
);

const OrderDetails =
  models.OrderDetails ||
  mongoose.model<IOrderDetails>("OrderDetails", orderDetailsSchema);

export { OrderDetails };
