import ApiError from "../utils/api-error";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUser } from "../app/models";
import { TokenPayload } from "../utils/generateTokens";
import { RequestHandler } from "express";
dotenv.config();
class AuthMiddleWare {
  authenticate: RequestHandler = async (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!(authToken && authToken.startsWith("Bearer "))) {
      return next(new ApiError(401, "Không tìm thấy access token."));
    }
    const accessToken = authToken.split(" ")[1];
    const access_token_secret = process?.env?.ACCESS_TOKEN_SECRET || "";

    try {
      const userData = jwt.verify(
        accessToken,
        access_token_secret
      ) as TokenPayload;
      req.user = {
        so_dien_thoai: userData.so_dien_thoai,
        _id: userData._id,
        role: userData.role,
      };
      next();
    } catch (error) {
      const err = error as Error;
      return next(new ApiError(403, err?.message || ""));
    }
  };
}

const authMiddleWare = new AuthMiddleWare();

export { authMiddleWare };
