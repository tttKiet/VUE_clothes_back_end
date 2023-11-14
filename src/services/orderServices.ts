import { IUser } from "../app/models/User";
import { User } from "../app/models";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { IStaff, Staff } from "../app/models/Staff";
import { Role } from "../utils/generateTokens";
import { Cart, Sizes } from "../app/models/Cart";
import { ProductImage } from "../app/models/ProductImage";
import { IOrder, Order, StatusArray, StatusEnum } from "../app/models/Order";
import { OrderDetails } from "../app/models/OrderDetails";
import { IProduct, Product } from "../app/models/Product";

dotenv.config();

class OrderServices {
  async getOrder({
    user_id,
    trang_thai_DH,
  }: {
    user_id?: string;
    trang_thai_DH?: string | any;
  }) {
    const where: any = {};
    if (trang_thai_DH) {
      where.trang_thai_DH = trang_thai_DH;
    }
    if (!user_id) {
      const orderDoc: IOrder[] = await Order.find({
        ...where,
      })
        .populate("user_id")
        .lean();
      const promiseRawOrder = orderDoc.map(async (o) => {
        const order = o;
        const orderDetails = await this.getOrderDetails(o._id!);

        return {
          order,
          orderDetails,
        };
      });

      const data = await Promise.all(promiseRawOrder);
      return {
        statusCode: 200,
        msg: "Lấy danh sách đặt hàng thành công.",
        data,
      };
    } else {
      const orderDoc: IOrder[] = await Order.find({ user_id: user_id }).lean();
      if (!orderDoc)
        return {
          statusCode: 400,
          msg: "Không tìm thấy.",
        };
      const promiseRawOrder = orderDoc.map(async (o) => {
        const order = o;
        const orderDetails = await this.getOrderDetails(o._id!);

        return {
          order,
          orderDetails,
        };
      });

      const data = await Promise.all(promiseRawOrder);
      return {
        statusCode: 200,
        msg: "Lấy danh sách đặt hàng thành công.",
        data,
      };
      // Get orderDetails
    }
  }

  async getOrderDetails(order_id: string) {
    const orderDetailsDoc = await OrderDetails.find({
      order_id: order_id,
    })
      .populate("product_id")
      .lean();
    return orderDetailsDoc;
  }

  async checkAvailableOrder(
    product_id: string,
    quantity: number
  ): Promise<{
    isAvailable: boolean;
    quantityAvailable: number;
  }> {
    {
      const productDoc: IProduct | null = await Product.findOne({
        _id: product_id,
      }).lean();
      if (productDoc) {
        const quantityMax = productDoc.so_luong_hang || 0;
        const ordered = await OrderDetails.count({
          product_id: product_id,
        });

        if (ordered + quantity > quantityMax)
          return {
            isAvailable: false,
            quantityAvailable: quantityMax - ordered,
          };
        return {
          isAvailable: true,
          quantityAvailable: quantityMax - ordered,
        };
      } else {
        return {
          isAvailable: false,
          quantityAvailable: 0,
        };
      }
    }
  }

  async orderProductInCart({
    cart_product_ids,
    user_id,
    so_dien_thoai_dat_hang,
    dia_chi_nhan,
  }: {
    cart_product_ids: string[];
    user_id: string;
    so_dien_thoai_dat_hang: string;
    dia_chi_nhan: string;
  }) {
    // Check product has already been exist in cart
    const cartProductDoc = await Cart.find({
      _id: {
        $in: cart_product_ids,
      },
    }).populate("product_id");

    if (cartProductDoc.length != cart_product_ids.length) {
      return {
        statusCode: 400,
        msg: "Bạn phải order các sản phẩm sản phẩm trong giỏ hàng của bạn.",
      };
    } else if (cartProductDoc.length <= 0) {
      return {
        statusCode: 400,
        msg: "Không có sản phẩm order.",
      };
    }

    const promiseCheckAvailable = cartProductDoc.map(async (p) => {
      const orderAvailable = await this.checkAvailableOrder(
        p.product_id,
        p.so_luong
      );

      return {
        productCart: p,
        isAvailable: orderAvailable.isAvailable,
        quantityAvailable: orderAvailable.quantityAvailable,
      };
    });
    const checkOrderMap = await Promise.all(promiseCheckAvailable);
    const productNotOrder = checkOrderMap.filter((c) => c.isAvailable == false);
    const msgText = productNotOrder.reduce((acc, item) => {
      return (
        acc +
        item.productCart.product_id.ten_HH +
        ": " +
        item.quantityAvailable +
        "; "
      );
    }, "");
    if (productNotOrder.length > 0) {
      return {
        statusCode: 400,
        msg: `Đã có người vừa đặt số lượng không đủ cấp cho bạn.\nSố lượng có thể đặt:\n${msgText}`,
      };
    }

    // Create order
    const order: IOrder = await Order.create({
      user_id,
      ngay_giao_hang: null,
      trang_thai_DH: "NEW",
      so_dien_thoai_dat_hang,
      dia_chi_nhan,
    });

    await Cart.deleteMany({
      _id: {
        $in: cart_product_ids,
      },
    });

    // Remove order product in cart
    if (!order) {
      return {
        statusCode: 500,
        msg: "Lỗi đặt hàng, xin thử lại! ",
      };
    }
    // Create array order details
    const product_in_cart_details = cartProductDoc.map((productCart) => {
      return {
        order_id: order._id,
        size: productCart.size,
        so_luong: productCart.so_luong,
        product_id: productCart.product_id,
        gia_Dat_hang: productCart.product_id.gia,
      };
    });
    const orderDetailsDoc = await OrderDetails.insertMany(
      product_in_cart_details
    );

    return {
      statusCode: 200,
      msg: "Đặt thành công.",
      data: {
        order,
        order_details: orderDetailsDoc,
      },
    };
  }

  async changeStatusOrder({
    order_id,
    status,
  }: {
    order_id: string;
    status: string;
  }) {
    let ngay_giao_hang = null;
    if (status === "DELIVERED") {
      ngay_giao_hang = new Date();
    }

    if (!StatusArray.includes(status)) {
      return {
        statusCode: 400,
        msg: "Trạng thái không đúng! ",
      };
    }
    const updatedOrder = await Order.updateOne(
      {
        _id: order_id,
      },
      {
        ngay_giao_hang: ngay_giao_hang,
        trang_thai_DH: status,
      }
    );
    console.log("--updatedOrder", updatedOrder);
    if (updatedOrder.modifiedCount > 0) {
      return {
        statusCode: 200,
        msg: "Thay đổi trạng thái thành công! ",
      };
    } else {
      return {
        statusCode: 400,
        msg: "Dữ liệu không thay đổi! ",
      };
    }
  }
}

const orderServices = new OrderServices();
export { orderServices };
