import { AsyncRequestHandler } from "../../interface";
import { userServices, authServices } from "../../services";
import ApiError from "../../utils/api-error";
import { validateReqBody } from "../../utils/validate-req-body";

class AuthController {
  handleLogin: AsyncRequestHandler = async (req, res, next) => {
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
        return res.status(200).json(result);
      } else {
        return next(new ApiError(result.statusCode, result.msg));
      }
    } catch (error) {
      const err = error as Error;
      return next(new ApiError(500, err?.message || ""));
    }
  };
}

const authController = new AuthController();
export { authController };
