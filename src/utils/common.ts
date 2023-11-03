import moment from "moment";
import cloudinary from "../middleWares/cloundinary";

export const expiryToISODate = (expiresIn: number): string => {
  const expiryDate = new Date(expiresIn * 1000);
  return moment(expiryDate).format("YYYY-MM-DD HH:mm:ss");
};

export async function destroyUploadCloundinary(url: string) {
  const strArr = url.split("/");
  const strSplipDot = strArr[strArr.length - 1].split(".");
  const nameImg = "vue_clothes/" + strSplipDot[0];
  await cloudinary.uploader.destroy(nameImg);
}
