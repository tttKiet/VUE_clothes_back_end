import { UserToken } from "../app/models";
import jwt from "jsonwebtoken";
import { TokenPayload } from "./generateTokens";

const verifyRefreshToken = async (
  refreshToken: string
): Promise<{
  error: boolean;
  message: string;
  tokenDetails?: TokenPayload;
}> => {
  const privateKey = process.env.REFRESH_TOKEN_SECRET!;

  const userToken = await UserToken.findOne({ refresh_token: refreshToken });

  if (!userToken) {
    return { error: true, message: "Refresh token không hợp lệ." };
  }
  try {
    const tokenDetails = jwt.verify(refreshToken, privateKey) as TokenPayload;
    return {
      tokenDetails,
      error: false,
      message: "Refresh token hợp lệ",
    };
  } catch (error) {
    return { error: true, message: "Refresh token không hợp lệ" };
  }
};

export default verifyRefreshToken;
