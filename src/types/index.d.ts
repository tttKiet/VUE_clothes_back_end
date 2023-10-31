interface ResponseMsg {
  statusCode: number;
  msg: string;
  data?: any;
}
declare global {
  declare namespace Express {
    import { TokenPayload } from "./utils/generateTokens";
    export interface Request {
      user: TokenPayload;
    }
  }
}
