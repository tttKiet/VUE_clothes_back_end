import { IUser } from "../app/models/user";
import { User } from "../app/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateTokens from "../utils/generateTokens";

class AuthServices {
  async login({
    so_dien_thoai,
    password,
  }: {
    so_dien_thoai: string;
    password: string;
  }) {
    // Login if user
    const userExists: IUser | null = await User.findOne({
      so_dien_thoai,
    }).lean();

    const isValidPassword: boolean = await bcrypt.compare(
      password,
      userExists?.password || ""
    );

    if (!userExists || !isValidPassword) {
      return {
        statusCode: 401,
        msg: "Sai số điện thoại hoặc mật khẩu.",
      };
    }

    // handle login
    const { accessToken, refreshToken } = await generateTokens(
      userExists,
      "user"
    );

    // save
    console.log({
      accessToken,
    });
    if (!accessToken) {
      return {
        statusCode: 401,
        msg: "Đăng nhập không thành công, vui lòng thử lại..",
      };
    }

    return {
      statusCode: 200,
      msg: "Đăng nhập thành công.",
      data: {
        accessToken,
        refreshToken,
      },
    };
  }

  verifyRefreshToken(refreshToken: string) {
    const privateKey = process?.env?.REFRESH_TOKEN_SECRET || "";

    return new Promise(async (resolve, reject) => {
      const user = await User.findOne({ token: refreshToken });

      if (!user)
        return reject({ error: true, message: "Refresh token không đúng." });

      jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
        if (err)
          return reject({
            error: true,
            message: "Refresh token không chính xác.",
          });
        resolve({
          tokenDetails,
          error: false,
          message: "Valid refresh token",
        });
      });
    });
  }
}

const authServices = new AuthServices();
export { authServices };
