import { RequestHandler } from "express";
import { userServices } from "../../services";
import ApiError from "../../utils/api-error";
import { validateReqBody } from "../../utils/validate-req-body";
import { orderServices } from "../../services/orderServices";

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

  handleAddCart: RequestHandler = async (req, res, next) => {
    const { product_id, so_luong, size } = req.body;
    if (!product_id || !so_luong || !size) {
      return next(new ApiError(400, "Thiếu tham số truyền vào."));
    } else if (so_luong <= 0) {
      return next(new ApiError(400, "Số lượng phải lớn hơn 0."));
    }

    const user_id = req.user?._id!;
    try {
      const result = await userServices.addCart({
        product_id,
        so_luong,
        user_id,
        size,
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

  handleEditCart: RequestHandler = async (req, res, next) => {
    const { product_id, so_luong, size, size_old } = req.body;
    if (!product_id && !so_luong && !size) {
      return next(new ApiError(400, "Thiếu tham số truyền vào."));
    } else if (so_luong <= 0) {
      return next(new ApiError(400, "Số lượng phải lớn hơn 0."));
    }

    const user_id = req.user?._id!;
    try {
      const result = await userServices.updateCart({
        product_id,
        so_luong,
        user_id,
        size_old,
        size,
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

  handleDeleteProductCart: RequestHandler = async (req, res, next) => {
    const { product_id } = req.body;
    if (!product_id) {
      return next(new ApiError(400, "Thiếu tham số truyền vào."));
    }

    const user_id = req.user?._id!;
    try {
      const result = await userServices.deleteCart({
        product_id,
        user_id,
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

  handleGetCart: RequestHandler = async (req, res, next) => {
    const user_id = req.user?._id!;
    try {
      const result = await userServices.getCart({
        user_id,
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

  // Order
  handleGetOrder: RequestHandler = async (req, res, next) => {
    const user_id = req.user?._id!;
    try {
      const result = await orderServices.getOrder({
        user_id,
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

  handleOrderProductCart: RequestHandler = async (req, res, next) => {
    const user_id = req.user?._id!;
    let { cart_product_ids, so_dien_thoai_dat_hang, dia_chi_nhan } = req.body;
    const isValid = validateReqBody(so_dien_thoai_dat_hang, dia_chi_nhan);
    if (!isValid) {
      return next(new ApiError(400, "Thiếu tham số truyền vào."));
    }
    if (!Array.isArray(cart_product_ids)) cart_product_ids = [cart_product_ids];

    try {
      const result = await orderServices.orderProductInCart({
        cart_product_ids,
        user_id,
        so_dien_thoai_dat_hang,
        dia_chi_nhan,
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

  handleOrderOneItem: RequestHandler = async (req, res, next) => {
    const user_id = req.user?._id!;
    let { product_id, size, so_luong, so_dien_thoai_dat_hang, dia_chi_nhan } =
      req.body;
    const isValid = validateReqBody(
      product_id,
      size,
      so_luong,
      so_dien_thoai_dat_hang,
      dia_chi_nhan
    );
    if (!isValid) {
      return next(new ApiError(400, "Thiếu tham số truyền vào."));
    }

    try {
      const result = await orderServices.orderOnlyProduct({
        product_id,
        size,
        so_luong,
        user_id,
        so_dien_thoai_dat_hang,
        dia_chi_nhan,
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

  handleGetOrderDetail: RequestHandler = async (req, res, next) => {
    const { _id } = req.params;
    try {
      const result = await orderServices.getOrderDetail({ _id });
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

  handleGetCancelOrder: RequestHandler = async (req, res, next) => {
    const { _id } = req.params;
    try {
      const result = await orderServices.getCancelOrder({ _id });
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

const userController = new UserController();
export { userController };
