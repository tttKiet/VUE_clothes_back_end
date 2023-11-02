import { IUser } from "../app/models/User";
import { User } from "../app/models";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { IStaff, Staff } from "../app/models/Staff";
import { Role } from "../utils/generateTokens";
import { IProduct, Product } from "../app/models/Product";

dotenv.config();

class AdminServices {
  async createOrUpdateProduct(product: IProduct) {
    if (product?._id) {
      // update
      // create
      const productDoc = await Product.findOneAndUpdate(
        {
          _id: product._id,
        },
        {
          ...product,
        }
      );
      if (productDoc) {
        return {
          statusCode: 200,
          msg: "Cập nhật hàng hóa thành công.",
        };
      } else {
        return {
          statusCode: 400,
          msg: "Hàng hóa đã tồn tại.",
        };
      }
    } else {
      // create
      const productDoc = await Product.findOne({
        ten_HH: product.ten_HH,
      });

      if (productDoc) {
        return {
          statusCode: 400,
          msg: "Hàng hóa đã tồn tại.",
        };
      }

      const doc = await Product.create({
        ...product,
      });
      if (doc) {
        return {
          statusCode: 200,
          msg: "Đã thêm hàng hóa.",
        };
      } else {
        return {
          statusCode: 400,
          msg: "Lỗi tạo hàng hóa, vui lòng thử lại!",
        };
      }
    }
  }
}

const adminServices = new AdminServices();
export { adminServices };
