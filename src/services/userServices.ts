import { IUser } from "../app/models/user";
import { User } from "../app/models";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

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
    console.log("docs--------------------", docs);
  }

  async createUser(user: IUser) {
    const userExists: IUser | null = await User.findOne({
      so_dien_thoai: user.so_dien_thoai,
    });

    if (userExists) {
      return {
        statusCode: 401,
        msg: "Người dùng đã tồn tại.",
      };
    }

    // Hash password
    const saft = Number.parseInt(process?.env?.SALT_ROUNDS || "10");
    const hashPassword: string = await bcrypt.hash(user.password, saft);
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

const userServices = new UserServices();
export { userServices };
