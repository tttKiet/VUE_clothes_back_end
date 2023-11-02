import { IUser } from "../app/models/User";
import { User } from "../app/models";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { IStaff, Staff } from "../app/models/Staff";
import { Role } from "../utils/generateTokens";

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
}

const userServices = new UserServices();
export { userServices };
