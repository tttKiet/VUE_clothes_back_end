import mongoose from "mongoose";
const { Schema, models } = mongoose;

export interface IProduct {
  _id?: string;
  ten_HH: string;
  mo_ta_HH: string;
  gia: number;
  so_luong_hang: number;
  ghi_chu: string;
}

const productSchema = new Schema<IProduct>(
  {
    ten_HH: { type: String },
    mo_ta_HH: { type: String },
    gia: { type: Number },
    so_luong_hang: { type: Number, min: 0 },
    ghi_chu: { type: String },
  },
  { timestamps: true }
);

const Product =
  models.Product || mongoose.model<IProduct>("Product", productSchema);

export { Product };
