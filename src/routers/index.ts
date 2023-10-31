import ApiError from "../utils/api-error";
import apiRouter from "./apiRouter";
import { Express, Request, Response } from "express";

const route = (app: Express) => {
  app.use("/api/v1", apiRouter);

  // Page not found
  app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
  });

  // Middleware handler public error
  app.use((err: ApiError, req: Request, res: Response) => {
    return res.status(err.statusCode || 500).json({
      message: err.message || "Internal Server Error",
    });
  });
};

export default route;
