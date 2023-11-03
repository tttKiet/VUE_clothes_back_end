interface ResponseMsg {
  statusCode: number;
  msg: string;
  data?: any;
}
declare global {
  declare namespace Express {
    import { TokenPayload } from "./utils/generateTokens";
    import { UploadApiResponse } from "cloudinary";

    export interface Request {
      user: TokenPayload;
    }
  }
}
