import { IUser } from "../app/models/User";
import { User } from "../app/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateTokens, { TokenPayload } from "../utils/generateTokens";
import { UserToken } from "../app/models";
import verifyRefreshToken from "../utils/verify-refresh-token";

interface JwtPayload extends IUser {
  role: "user" | "admin";
}

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
    if (!accessToken || !refreshToken) {
      return {
        statusCode: 401,
        msg: "Đăng nhập không thành công, vui lòng thử lại..",
      };
    }

    // Save with database
    const userToken = await UserToken.findOne({
      userId: userExists._id,
    });

    if (userToken) {
      await userToken.updateOne({
        refresh_token: refreshToken,
      });
      await userToken.save();
    } else {
      await UserToken.create({
        userId: userExists._id,
        refresh_token: refreshToken,
      });
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

  async refreshToken({ refreshToken }: { refreshToken: string }) {
    const refresh_token_secret = process.env?.REFRESH_TOKEN_SECRET || "";
    const userData = jwt.verify(
      refreshToken,
      refresh_token_secret
    ) as JwtPayload;

    const result = await verifyRefreshToken(refreshToken);
    if (result.error) {
      return {
        statusCode: 403,
        msg: result.message || "Làm mới access token 0 thành công.",
      };
    }

    const { accessToken: newAccessToken } = await generateTokens(
      userData,
      userData.role
    );

    return {
      statusCode: 200,
      msg: "Làm mới access token thành công.",
      data: {
        accessToken: newAccessToken,
      },
    };
  }
  // async getProfile(user:TokenPayload) {
  //   const refresh_token_secret = process.env?.REFRESH_TOKEN_SECRET || "";
  //   const userData = jwt.verify(
  //     refreshToken,
  //     refresh_token_secret
  //   ) as JwtPayload;

  //   const result = await verifyRefreshToken(refreshToken);
  //   if (result.error) {
  //     return {
  //       statusCode: 403,
  //       msg: result.message || "Làm mới access token 0 thành công.",
  //     };
  //   }

  //   const { accessToken: newAccessToken } = await generateTokens(
  //     userData,
  //     userData.role
  //   );

  //   return {
  //     statusCode: 200,
  //     msg: "Làm mới access token thành công.",
  //     data: {
  //       accessToken: newAccessToken,
  //     },
  //   };
  // }
  async logout({ userId }: { userId: string }) {
    await UserToken.deleteOne({ userId });
  }
}

const authServices = new AuthServices();
export { authServices };
