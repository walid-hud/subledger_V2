import {AppError, ValidationError} from "../utils/errors.js";
import {Request, Response, NextFunction , RequestHandler} from "express";

export const globalErrorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      ...(err instanceof ValidationError && {errors: err.errors}),
      code: err.code,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};



type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;
export const catchAsync = (fn: AsyncRequestHandler): RequestHandler => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
