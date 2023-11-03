import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { RequestHandler } from "express";
import ApiError from "../utils/api-error";

import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
    files: 1,
  },
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadToCloudinary = (file: Express.Multer.File) => {
  return new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader
      .upload(file.path, {
        folder: "vue_clothes",
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => reject(err));
  });
};

const handleUpload: RequestHandler = async (req, res, next) => {
  console.log("req.body", req.body);
  try {
    if (!!req.file) {
      const result = await uploadToCloudinary(req.file);
      console.log(result);
      req.file.path = result.url;
    }
    next();
  } catch (err) {
    console.log(err);
    const error = err as Error;
    return next(new ApiError(500, error.message || "Lỗi không xác định."));
  }
};

export { uploadToCloudinary, upload, handleUpload };
export default cloudinary;
