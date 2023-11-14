import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import connectDb from "./config/db";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routers";
import bodyParser from "body-parser";
import { TokenPayload } from "./utils/generateTokens";
import ApiError from "./utils/api-error";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
// For env File
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

// Connect to db
connectDb();

// Use cookie
app.use(cookieParser());

// Use bodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cors
app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
// Middleware handler public error

// Use route
route(app);

app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
