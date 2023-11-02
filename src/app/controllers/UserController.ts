import { RequestHandler } from "express";
import { userServices } from "../../services";
import ApiError from "../../utils/api-error";
import { validateReqBody } from "../../utils/validate-req-body";

class UserController {
  handleCreateUser: RequestHandler = async (req, res, next) => {
    const { ho_ten_KH, password, dia_chi, so_dien_thoai, chuc_vu } = req.body;
    if (chuc_vu) {
      // check permissions
    }
    try {
      const isValid = validateReqBody(
        ho_ten_KH,
        password,
        dia_chi,
        so_dien_thoai
      );
      if (!isValid) {
        return next(new ApiError(400, "Thiếu tham số truyền vào."));
      }

      const result = await userServices.createUser(
        {
          ho_ten_KH,
          password,
          dia_chi,
          so_dien_thoai,
        },
        chuc_vu
      );
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

const userController = new UserController();
export { userController };
