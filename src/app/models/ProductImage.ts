import mongoose, { StringSchemaDefinition } from "mongoose";
const { Schema, models } = mongoose;

export interface IProductImage {
  _id?: string;
  url: string;
  product_id: StringSchemaDefinition;
}

const productImageSchema = new Schema<IProductImage>(
  {
    url: { type: String },
    product_id: { type: mongoose.Types.ObjectId, ref: "Product" },
  },
  { timestamps: true }
);

const ProductImage =
  models.ProductImage ||
  mongoose.model<IProductImage>("ProductImage", productImageSchema);

export { ProductImage };
