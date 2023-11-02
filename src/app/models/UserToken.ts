import mongoose from "mongoose";
const { Schema, models } = mongoose;

export interface IUserToken {
  _id?: string;
  userId: string;
  userType: "User" | "Staff";
  refresh_token: string;
}

const userTokenSchema = new Schema<IUserToken>(
  {
    userId: { type: String, refPath: "userType" },
    userType: {
      type: String,
      required: true,
      enum: ["User", "Staff"],
    },
    refresh_token: { type: String },
  },
  { timestamps: true }
);

const UserToken =
  models.UserToken || mongoose.model<IUserToken>("UserToken", userTokenSchema);

export { UserToken };
