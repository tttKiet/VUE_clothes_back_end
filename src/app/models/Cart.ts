import mongoose, { Mongoose, StringSchemaDefinition } from "mongoose";
const { Schema, models } = mongoose;

export interface ICart {
  _id?: string;
  product_id: StringSchemaDefinition;
  user_id: StringSchemaDefinition;
  so_luong: number;
}

const cartSchema = new Schema<ICart>(
  {
    product_id: { type: mongoose.Types.ObjectId, ref: "Product" },
    so_luong: { type: Number },
    user_id: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: false }
);

const Cart = models.Cart || mongoose.model<ICart>("Cart", cartSchema);

export { Cart };
