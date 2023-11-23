import { RequestHandler } from "express";
import { userServices } from "../../services";
import ApiError from "../../utils/api-error";
import { validateReqBody } from "../../utils/validate-req-body";
import { adminServices } from "../../services/adminServices";
import { destroyUploadCloundinary } from "../../utils/common";
import { orderServices } from "../../services/orderServices";

class AdminController {
  handleCreateOrUpdateProduct: RequestHandler = async (req, res, next) => {
    const { _id, ten_HH, mo_ta_HH, gia, so_luong_hang, ghi_chu, image } =
      req.body;
    // Create
    if (!_id) {
      if (!req.file) {
        return next(new ApiError(400, "Ảnh chưa được tải lên."));
      }
    }
    try {
      const url = req.file?.path || image;
      const isValid = validateReqBody(ten_HH, mo_ta_HH, gia, so_luong_hang);
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
  handleGetProductById: RequestHandler = async (req, res, next) => {
    const { _id } = req.params;
    try {
      const result = await adminServices.getProductById(_id);
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

  handleGetOrder: RequestHandler = async (req, res, next) => {
    const { trang_thai_DH } = req.query;
    try {
      const result = await orderServices.getOrder({ trang_thai_DH });
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

  handleChangeStatusOrder: RequestHandler = async (req, res, next) => {
    const { order_id, status } = req.body;
    if (!order_id || !status) {
      return next(new ApiError(400, "Thiếu tham số truyền vào."));
    }
    try {
      const result = await orderServices.changeStatusOrder({
        order_id,
        status,
      });
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

  handleGetChartRevenue: RequestHandler = async (req, res, next) => {
    const { key, value } = req.query;

    try {
      const result = await orderServices.getChartRevenue({ key, value });
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
