import { IUser } from "../app/models/User";
import { User } from "../app/models";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { IStaff, Staff } from "../app/models/Staff";
import { Role } from "../utils/generateTokens";
import { Cart, Sizes } from "../app/models/Cart";
import { ProductImage } from "../app/models/ProductImage";

dotenv.config();

class UserServices {
  async saveToken(user: IUser, token: String) {
    const docs = await User.updateOne(
      {
        _id: user._id,
      },
      {
        token,
      }
    );
  }

  async createUser(user: IUser, chuc_vu: string) {
    const userExists: IUser | null = await User.findOne({
      so_dien_thoai: user.so_dien_thoai,
    });

    const staffExists: IStaff | null = await Staff.findOne({
      so_dien_thoai: user.so_dien_thoai,
    });

    if (userExists || staffExists) {
      return {
        statusCode: 401,
        msg: "Người dùng đã tồn tại.",
      };
    }

    // Hash password
    const saft = Number.parseInt(process?.env?.SALT_ROUNDS || "10");
    const hashPassword: string = await bcrypt.hash(user.password, saft);
    if (chuc_vu) {
      const data: IStaff = {
        ...user,
        password: hashPassword,
        chuc_vu: chuc_vu as Role,
      };
      const staffDoc: IStaff | null = await Staff.create(data);

      return {
        statusCode: 200,
        msg: "Tạo nhân viên thành công.",
        data: staffDoc,
      };
    } else {
      // create a new user
      const data: IUser = {
        ...user,
        password: hashPassword,
      };
      const userDoc: IUser | null = await User.create(data);

      return {
        statusCode: 200,
        msg: "Tạo người dùng thành công.",
        data: userDoc,
      };
    }
  }

  async addCart({
    product_id,
    so_luong,
    user_id,
    size,
  }: {
    product_id: string;
    so_luong: number;
    user_id: string;
    size: Sizes;
  }) {
    // filter have product
    const productCart = await Cart.findOneAndUpdate(
      {
        product_id: product_id,
        user_id: user_id,
        size: size,
      },
      {
        $inc: {
          so_luong: so_luong,
        },
      }
    );

    if (productCart) {
      return {
        statusCode: 200,
        msg: "Thêm thành công.",
      };
    } else {
      const productCart = await Cart.create({
        product_id: product_id,
        user_id: user_id,
        so_luong: so_luong,
        size,
      });

      if (productCart) {
        return {
          statusCode: 200,
          msg: "Thêm thành công.",
          data: productCart,
        };
      } else {
        return {
          statusCode: 400,
          msg: "Thêm thất bại.",
        };
      }
    }
  }

  async updateCart({
    product_id,
    so_luong,
    user_id,
    size,
    size_old,
  }: {
    product_id: string;
    so_luong: number;
    user_id: string;
    size: Sizes;
    size_old: Sizes;
  }) {
    // filter have product

    let productCart;
    if (size_old) {
      productCart = await Cart.findOneAndUpdate(
        {
          product_id: product_id,
          user_id: user_id,
          size: size_old,
        },
        {
          size: size,
        }
      );
    } else {
      productCart = await Cart.findOneAndUpdate(
        {
          product_id: product_id,
          user_id: user_id,
          size,
        },
        {
          so_luong: so_luong,
        }
      );
    }

    if (productCart) {
      return {
        statusCode: 200,
        msg: "Cập nhật thành công.",
        data: productCart,
      };
    } else {
      return {
        statusCode: 400,
        msg: "Cập nhật thất bại.",
      };
    }
  }

  async deleteCart({
    product_id,
    user_id,
  }: {
    product_id: string;
    user_id: string;
  }) {
    // filter have product
    const productCart = await Cart.deleteOne({
      product_id: product_id,
      user_id: user_id,
    });

    if (productCart) {
      return {
        statusCode: 200,
        msg: "Xóa thành công.",
        data: productCart,
      };
    } else {
      return {
        statusCode: 400,
        msg: "Xóa thất bại.",
      };
    }
  }

  async getCart({ user_id }: { user_id: string }) {
    const productCart = await Cart.find({
      user_id: user_id,
    })
      .populate("product_id")
      .lean();

    const promiseAll = productCart.map(async (productCartItem) => {
      const newP: any = productCartItem;
      const imgDoc = await ProductImage.findOne({
        product_id: productCartItem.product_id._id,
      }).lean();
      newP.product_id.ProductImage = imgDoc;
      return newP;
    });
    const data = await Promise.all(promiseAll);

    if (productCart) {
      return {
        statusCode: 200,
        msg: "Lấy thành công.",
        data: data,
      };
    } else {
      return {
        statusCode: 400,
        msg: "Lấy thất bại.",
      };
    }
  }
}

const userServices = new UserServices();
export { userServices };
