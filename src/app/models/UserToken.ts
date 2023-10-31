import mongoose from "mongoose";
const { Schema, models } = mongoose;

export interface IUserToken {
  _id?: string;
  userId: string;
  refresh_token: string;
}

const userTokenSchema = new Schema<IUserToken>(
  {
    userId: { type: String, ref: "User" },
    refresh_token: { type: String },
  },
  { timestamps: true }
);

const UserToken =
  models.UserToken || mongoose.model<IUserToken>("UserToken", userTokenSchema);

export { UserToken };
