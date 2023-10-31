import mongoose from "mongoose";
const { Schema, models } = mongoose;

export interface IUser {
  _id?: string;
  ho_ten_KH: string;
  password: string;
  dia_chi: string;
  so_dien_thoai: string;
}

const userSchema = new Schema<IUser>(
  {
    ho_ten_KH: { type: String },
    password: { type: String },
    dia_chi: { type: String },
    so_dien_thoai: { type: String, unique: true },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model<IUser>("User", userSchema);

export { User };
