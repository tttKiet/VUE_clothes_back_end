import ApiError from "../utils/api-error";
import apiRouter from "./apiRouter";
import { Express, Request, Response } from "express";

const route = (app: Express) => {
  app.use("/api/v1", apiRouter);

  // Page not found
  // app.use((req, res, next) => {
  //   return next(new ApiError(404, "Resource not found"));
  // });
};

export default route;
