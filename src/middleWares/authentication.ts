import ApiError from "../utils/api-error";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import dotenv from "dotenv";
import { IUser, UserToken } from "../app/models";
import { TokenPayload } from "../utils/generateTokens";
import { RequestHandler } from "express";
import { expiryToISODate } from "../utils/common";
dotenv.config();
class AuthMiddleWare {
  authenticate: RequestHandler = async (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!(authToken && authToken.startsWith("Bearer "))) {
      return next(
        new ApiError(401, "Bạn chưa đăng nhập. [Không tìm thấy access token.]")
      );
    }
    const accessToken = authToken.split(" ")[1];
    const access_token_secret = process?.env?.ACCESS_TOKEN_SECRET || "";

    try {
      const userData = jwt.verify(
        accessToken,
        access_token_secret
      ) as TokenPayload;
      const userToken = await UserToken.findOne({
        userId: userData._id,
      });

      if (!userToken) return next(new ApiError(401, "Bạn chưa đăng nhập"));
      console.log(expiryToISODate(userData?.exp || 111));
      req.user = {
        so_dien_thoai: userData.so_dien_thoai,
        dia_chi: userData.dia_chi,
        ho_ten_KH: userData.ho_ten_KH,
        iat: userData.iat,
        _id: userData._id,
        role: userData.role,
      };
      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        const err = error as TokenExpiredError;
        return next(new ApiError(403, err?.message || ""));
      } else if (error instanceof JsonWebTokenError) {
        const err = error as JsonWebTokenError;
        return next(new ApiError(401, err?.message || ""));
      } else {
        return next(new ApiError(400, "Vui lòng thử lại."));
      }
    }
  };

  verififyAdmin: RequestHandler = async (req, res, next) => {
    const user = req.user;
    if (user?.role !== "admin") {
      return next(new ApiError(403, "Bạn không có quyền truy cập."));
    }

    next();
  };
}

const authMiddleWare = new AuthMiddleWare();

export { authMiddleWare };
