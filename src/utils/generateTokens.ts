import jwt from "jsonwebtoken";
import { IUser } from "../app/models/User";
import { User } from "../app/models";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export type Role = "user" | "admin";
export interface TokenPayload {
  _id: string;
  so_dien_thoai: string;
  ho_ten_KH: string;
  dia_chi: string;
  role: Role;
  iat?: number;
  exp?: number;
}
const generateTokens = async (user: IUser, role: Role) => {
  try {
    const payload: TokenPayload = {
      _id: user?._id || "",
      so_dien_thoai: user.so_dien_thoai,
      ho_ten_KH: user.ho_ten_KH,
      dia_chi: user.dia_chi,
      role: role,
    };
    const access_token_secret = process?.env?.ACCESS_TOKEN_SECRET || "";
    const refresh_token_secret = process?.env?.REFRESH_TOKEN_SECRET || "";
    const expiresIn = process?.env?.ACCESS_TOKEN_LIFE || "14m";
    // Create access token
    const accessToken = jwt.sign(payload, access_token_secret, {
      expiresIn: expiresIn,
    });

    // Create refresh token
    const refreshToken = jwt.sign(payload, refresh_token_secret, {
      expiresIn: "30d",
    });

    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    return Promise.reject(err);
  }
};

export default generateTokens;
