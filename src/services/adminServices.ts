import { IUser } from "../app/models/User";
import { User } from "../app/models";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { IStaff, Staff } from "../app/models/Staff";
import { Role } from "../utils/generateTokens";
import { IProduct, Product } from "../app/models/Product";
import { ProductImage } from "../app/models/ProductImage";
import { destroyUploadCloundinary } from "../utils/common";
import { orderServices } from "./orderServices";

dotenv.config();

class AdminServices {
  async createOrUpdateProduct(product: IProduct, imageUrl: string | undefined) {
    if (product?._id) {
      // update
      if (imageUrl) {
        const productImg = await ProductImage.updateMany(
          {
            product_id: product._id,
          },
          {
            url: imageUrl,
          }
        );

        if (!productImg) {
          return {
            statusCode: 400,
            msg: "Cập nhật hình ảnh thất bại.",
          };
        }
      }

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
        const productImg = await ProductImage.create({
          product_id: doc._id,
          url: imageUrl,
        });
        if (!productImg) {
          return {
            statusCode: 400,
            msg: "Thêm hình ảnh thất bại.",
          };
        }
        doc.imageUrl = imageUrl;
        return {
          statusCode: 200,
          msg: "Đã thêm hàng hóa.",
          data: doc,
        };
      } else {
        return {
          statusCode: 400,
          msg: "Lỗi tạo hàng hóa, vui lòng thử lại!",
        };
      }
    }
  }
  async deleteProduct(_id: string) {
    const [pro, proImg] = await Promise.all([
      Product.findOneAndRemove({
        _id,
      }),
      ProductImage.findOneAndRemove({
        product_id: _id,
      }),
    ]);

    if (proImg) await destroyUploadCloundinary(proImg.url);
    if (pro || proImg) {
      return {
        statusCode: 200,
        msg: "Đã xóa thành công.",
      };
    } else {
      return {
        statusCode: 400,
        msg: "Xóa thất bại, vui lòng thử lại.",
      };
    }
  }

  async getProduct() {
    const productDoc = await Product.find().sort({ createdAt: "desc" }).lean();

    const promiseAll = productDoc.map(async (product) => {
      const newP: any = product;
      const imgDoc = await ProductImage.findOne({
        product_id: product._id,
      }).lean();
      const availableOrder = await orderServices.checkAvailableOrder(
        product._id as string,
        0
      );

      console.log("availableOrder-- ", availableOrder);
      newP.ProductImage = imgDoc;
      newP.availableOrder = availableOrder.quantityAvailable;
      return newP;
    });

    const data = await Promise.all(promiseAll);
    return {
      statusCode: 200,
      msg: "Lấy thành công.",
      data: data,
    };
  }

  async getProductById(_id: string) {
    const productDoc = await Product.findById<IProduct>(_id).lean();
    if (productDoc) {
      const newP: any = productDoc;
      const imgDoc = await ProductImage.findOne({
        product_id: productDoc._id,
      }).lean();
      newP.ProductImage = imgDoc;
      return {
        statusCode: 200,
        msg: "Lấy thành công.",
        data: newP,
      };
    }

    return {
      statusCode: 400,
      msg: "Không tim thấy.",
      data: null,
    };
  }
}

const adminServices = new AdminServices();
export { adminServices };
