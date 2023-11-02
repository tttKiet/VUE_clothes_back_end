import { userServices, authServices } from "../../services";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import ApiError from "../../utils/api-error";
import { validateReqBody } from "../../utils/validate-req-body";
import { RequestHandler } from "express";
import { TokenPayload } from "../../utils/generateTokens";
import { UserToken } from "../models";

class AuthController {
  handleLogin: RequestHandler = async (req, res, next) => {
    const { password, so_dien_thoai } = req.body;
    try {
      const isValid = validateReqBody(password, so_dien_thoai);
      if (!isValid) {
        return next(
          new ApiError(400, "Vui lòng điền số điện thoại và mật khẩu.")
        );
      }

      const result = await authServices.login({
        password,
        so_dien_thoai,
      });

      if (result.statusCode === 200) {
        // save cookie
        res.cookie("refreshToken", result.data?.refreshToken, {
          sameSite: "strict",
          httpOnly: true,
          secure: false,
          path: "/",
        });
        console.log(result.data?.user);
        return res.status(200).json({
          statusCode: result.statusCode,
          msg: result.msg,
          data: {
            accessToken: result.data?.accessToken,
            ...result.data?.user,
          },
        });
      } else {
        return next(new ApiError(result.statusCode, result.msg));
      }
    } catch (error) {
      const err = error as Error;
      return next(new ApiError(500, err?.message || ""));
    }
  };

  handleRefresh: RequestHandler = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return next(new ApiError(400, "Bạn chưa đăng nhập."));
    }
    try {
      const result = await authServices.refreshToken({
        refreshToken,
      });

      if (result.statusCode === 200) {
        return res.status(200).json({
          statusCode: result.statusCode,
          msg: result.msg,
          data: {
            accessToken: result.data?.accessToken,
          },
        });
      } else {
        return next(new ApiError(result.statusCode, result.msg));
      }
    } catch (error) {
      const err = error as Error;
      return next(new ApiError(500, err?.message || ""));
    }
  };

  handleGetProfileLogin: RequestHandler = async (req, res, next) => {
    const user = req.user;

    try {
      if (user) {
        return res.status(200).json({
          statusCode: 200,
          msg: "Lấy thông tin người dùng thành công.",
          data: user,
        });
      } else {
        return next(new ApiError(404, "Không tim thấy user."));
      }
    } catch (error) {
      const err = error as Error;
      return next(new ApiError(500, err?.message || ""));
    }
  };

  handleLogout: RequestHandler = async (req, res, next) => {
    const refresh_token = req.cookies.refreshToken;
    if (!refresh_token) {
      return next(new ApiError(401, "Bạn chưa đăng nhập."));
    }
    const refresh_token_secret = process?.env?.REFRESH_TOKEN_SECRET || "";

    try {
      const userData = jwt.verify(
        refresh_token,
        refresh_token_secret
      ) as TokenPayload;

      await authServices.logout({
        userId: userData?._id || "",
      });
      res.clearCookie("refreshToken", {
        sameSite: "strict",
        httpOnly: true,
        secure: false,
        path: "/",
      });
      return res.status(200).json({
        statusCode: 200,
        msg: "Đăng xuất thành công.",
      });
    } catch (error) {
      const err = error as Error;
      return next(new ApiError(500, err?.message || ""));
    }
  };
}

const authController = new AuthController();
export { authController };
