import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { MongoError } from "mongodb";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "error",
      message: "Validation error",
      errors: err.errors,
    });
  }

  if (err instanceof MongoError) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: "error",
        message: "Duplicate entry",
      });
    }
  }

  // Default error
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
