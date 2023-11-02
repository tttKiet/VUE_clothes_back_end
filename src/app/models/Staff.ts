import mongoose from "mongoose";
import { Role } from "../../utils/generateTokens";
const { Schema, models } = mongoose;

export interface IStaff {
  _id?: string;
  ho_ten_KH: string;
  password: string;
  dia_chi: string;
  so_dien_thoai: string;
  chuc_vu: Role;
}

const staffSchema = new Schema<IStaff>(
  {
    ho_ten_KH: { type: String },
    password: { type: String },
    dia_chi: { type: String },
    so_dien_thoai: { type: String, unique: true },
    chuc_vu: {
      type: String,
    },
  },
  { timestamps: true }
);

const Staff = models.Staff || mongoose.model<IStaff>("Staff", staffSchema);

export { Staff };
