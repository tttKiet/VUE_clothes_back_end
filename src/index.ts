import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import connectDb from "./config/db";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routers";
import { TokenPayload } from "./utils/generateTokens";

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

// Use cookie
app.use(cookieParser());

// Use bodyParser
app.use(express.urlencoded());

// Cors
app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

// Use route
route(app);

// Connect to db
connectDb();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
