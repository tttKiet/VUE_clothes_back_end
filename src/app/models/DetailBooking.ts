import mongoose, { Mongoose, StringSchemaDefinition } from "mongoose";
const { Schema, models } = mongoose;

export interface IDetailBooking {
  _id?: string;
  product_id: StringSchemaDefinition;
  so_luong: number;
  gia_dat_hang: number;
  giam_gia: number;
}

const detailBookingSchema = new Schema<IDetailBooking>(
  {
    product_id: { type: mongoose.Types.ObjectId, ref: "Product" },
    so_luong: { type: Number },
    gia_dat_hang: { type: Number },
    giam_gia: { type: Number, min: 0 },
  },
  { timestamps: false }
);

const DetailBooking =
  models.DetailBooking ||
  mongoose.model<IDetailBooking>("DetailBooking", detailBookingSchema);

export { DetailBooking };
