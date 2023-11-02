import { IUser } from "../app/models/User";
import { User } from "../app/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateTokens, { TokenPayload } from "../utils/generateTokens";
import { UserToken } from "../app/models";
import verifyRefreshToken from "../utils/verify-refresh-token";
import { IStaff, Staff } from "../app/models/Staff";

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
    const userExists: IUser | null = await User.findOne({
      so_dien_thoai,
    }).lean();

    // Login if user
    if (userExists) {
      const isValidPassword: boolean = await bcrypt.compare(
        password,
        userExists?.password || ""
      );

      if (!isValidPassword) {
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
          userType: "User",
        });
      }
      return {
        statusCode: 200,
        msg: "Đăng nhập thành công.",
        data: {
          accessToken,
          refreshToken,
          user: {
            ...userExists,
            password: null,
            role: "user",
          },
        },
      };
    } else {
      // If stafff
      const staffExists: IStaff | null = await Staff.findOne({
        so_dien_thoai,
      }).lean();

      if (staffExists) {
        const isValidPassword: boolean = await bcrypt.compare(
          password,
          staffExists?.password || ""
        );

        if (!isValidPassword) {
          return {
            statusCode: 401,
            msg: "Sai số điện thoại hoặc mật khẩu.",
          };
        }

        // handle login
        const { accessToken, refreshToken } = await generateTokens(
          staffExists,
          "admin"
        );
        if (!accessToken || !refreshToken) {
          return {
            statusCode: 401,
            msg: "Đăng nhập không thành công, vui lòng thử lại..",
          };
        }

        // Save with database
        const userToken = await UserToken.findOne({
          userId: staffExists._id,
        });

        if (userToken) {
          await userToken.updateOne({
            refresh_token: refreshToken,
          });
          await userToken.save();
        } else {
          await UserToken.create({
            userId: staffExists._id,
            refresh_token: refreshToken,
            userType: "Staff",
          });
        }
        return {
          statusCode: 200,
          msg: "Đăng nhập thành công.",
          data: {
            accessToken,
            refreshToken,
            user: {
              ...staffExists,
              password: null,
              role: "admin",
            },
          },
        };
      } else {
        return {
          statusCode: 401,
          msg: "Sai số điện thoại hoặc mật khẩu.",
        };
      }
    }
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
        statusCode: 401,
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
