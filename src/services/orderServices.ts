import { IUser } from "../app/models/User";
import { User } from "../app/models";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { IStaff, Staff } from "../app/models/Staff";
import { Role } from "../utils/generateTokens";
import { Cart, Sizes } from "../app/models/Cart";
import { ProductImage } from "../app/models/ProductImage";
import { IOrder, Order } from "../app/models/Order";
import { OrderDetails } from "../app/models/OrderDetails";

dotenv.config();

class OrderServices {
  async getOrder({ user_id, status }: { user_id: string; status?: string }) {
    const orderDoc: IOrder[] = await Order.find({ user_id: user_id }).lean();
    console.log("orderDoc", orderDoc);
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

  async getOrderDetails(order_id: string) {
    const orderDetailsDoc = await OrderDetails.find({
      order_id: order_id,
    }).lean();
    return orderDetailsDoc;
  }
  async orderProductInCart() {
    return {
      statusCode: 200,
      msg: "Lấy danh sách đặt hàng thành công.",
    };
  }
}

const orderServices = new OrderServices();
export { orderServices };
