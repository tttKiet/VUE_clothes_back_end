import { RequestHandler } from "express";
import { userServices } from "../../services";
import ApiError from "../../utils/api-error";
import { validateReqBody } from "../../utils/validate-req-body";
import { adminServices } from "../../services/adminServices";

class AdminController {
  handleCreateOrUpdateProduct: RequestHandler = async (req, res, next) => {
    const { _id, ten_HH, mo_ta_HH, gia, so_luong_hang, ghi_chu } = req.body;

    try {
      const isValid = validateReqBody(
        ten_HH,
        mo_ta_HH,
        gia,
        so_luong_hang,
        ghi_chu
      );
      if (!isValid) {
        return next(new ApiError(400, "Thiếu tham số truyền vào."));
      }

      const result = await adminServices.createOrUpdateProduct({
        _id,
        ten_HH,
        mo_ta_HH,
        gia,
        so_luong_hang,
        ghi_chu,
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

const adminController = new AdminController();
export { adminController };
