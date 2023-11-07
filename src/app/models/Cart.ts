import mongoose, { Mongoose, StringSchemaDefinition } from "mongoose";
const { Schema, models } = mongoose;

export type Sizes = "XXS" | "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface ICart {
  _id?: string;
  product_id: StringSchemaDefinition;
  user_id: StringSchemaDefinition;
  size: Sizes;
  so_luong: number;
}

const cartSchema = new Schema<ICart>(
  {
    product_id: { type: mongoose.Types.ObjectId, ref: "Product" },
    so_luong: { type: Number },
    user_id: { type: mongoose.Types.ObjectId, ref: "User" },
    size: { type: String },
  },
  { timestamps: false }
);

const Cart = models.Cart || mongoose.model<ICart>("Cart", cartSchema);

export { Cart };
