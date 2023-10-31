import mongoose from "mongoose";

const connectDb = async (): Promise<void> => {
  try {
    const url: string | undefined = process.env.MONGODB_URI;
    await mongoose.connect(url || "");
    console.log(
      "-------------------------Connected db-----------------------------"
    );
  } catch (err) {
    console.error("Error connecting: ", err);
  }
};

export default connectDb;
