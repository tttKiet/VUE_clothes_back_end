import jwt from "jsonwebtoken";
import { IUser } from "../app/models/user";
import { User } from "../app/models";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { userServices } from "../services";
dotenv.config();

type Role = "user" | "admin";

const generateTokens = async (user: IUser, role: Role) => {
  try {
    const payload = {
      _id: user._id,
      so_dien_thoai: user.so_dien_thoai,
      role: role,
    };
    const secret_key = process?.env?.ACCESS_TOKEN_SECRET || "";
    const expiresIn = process?.env?.ACCESS_TOKEN_LIFE || "14m";

    // Create access token
    const accessToken = jwt.sign(payload, secret_key, {
      expiresIn: expiresIn,
    });

    // Create refresh token
    const refreshToken = jwt.sign(payload, secret_key, { expiresIn: "30d" });

    const userToken = await User.findById(user._id);
    
    if (userToken) await userServices.saveToken(user, refreshToken);
    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    return Promise.reject(err);
  }
};

export default generateTokens;
