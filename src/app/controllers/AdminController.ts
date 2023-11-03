import { RequestHandler } from "express";
import { userServices } from "../../services";
import ApiError from "../../utils/api-error";
import { validateReqBody } from "../../utils/validate-req-body";
import { adminServices } from "../../services/adminServices";
import { destroyUploadCloundinary } from "../../utils/common";

class AdminController {
  handleCreateOrUpdateProduct: RequestHandler = async (req, res, next) => {
    console.log("req", req.file);

    const { _id, ten_HH, mo_ta_HH, gia, so_luong_hang, ghi_chu, image } =
      req.body;
    // Create
    if (!_id) {
      if (!req.file) {
        return next(new ApiError(400, "Ảnh chưa được tải lên."));
      }
    }
    try {
      if (!req.file?.path && !image) {
        return next(new ApiError(400, "Ảnh chưa được tải lên."));
      }
      const url = req.file?.path || image;
      const isValid = validateReqBody(
        ten_HH,
        mo_ta_HH,
        gia,
        so_luong_hang,
        ghi_chu
      );
      if (!isValid) {
        // delete file
        destroyUploadCloundinary(req.file!.path);
        return next(new ApiError(400, "Thiếu tham số truyền vào."));
      }

      const result = await adminServices.createOrUpdateProduct(
        {
          _id,
          ten_HH,
          mo_ta_HH,
          gia,
          so_luong_hang,
          ghi_chu,
        },
        url
      );
      if (result.statusCode === 200) {
        return res.status(200).json(result);
      } else {
        return next(new ApiError(result.statusCode, result.msg));
      }
    } catch (error) {
      const err = error as Error;
      console.log(error);
      return next(new ApiError(500, err?.message || ""));
    }
  };
  handleGetproduct: RequestHandler = async (req, res, next) => {
    // const { _id } = req.body;
    try {
      const result = await adminServices.getProduct();
      if (result.statusCode === 200) {
        return res.status(200).json(result);
      } else {
        return next(new ApiError(result.statusCode, result.msg));
      }
    } catch (error) {
      const err = error as Error;
      console.log(error);
      return next(new ApiError(500, err?.message || ""));
    }
  };

  handleDeleteProduct: RequestHandler = async (req, res, next) => {
    const { _id } = req.body;
    try {
      if (!_id) {
        return next(new ApiError(400, "Thiếu tham số truyền vào."));
      }

      const result = await adminServices.deleteProduct(_id);
      if (result.statusCode === 200) {
        return res.status(200).json(result);
      } else {
        return next(new ApiError(result.statusCode, result.msg));
      }
    } catch (error) {
      const err = error as Error;
      console.log(error);
      return next(new ApiError(500, err?.message || ""));
    }
  };
}

const adminController = new AdminController();
export { adminController };
