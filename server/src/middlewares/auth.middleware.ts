import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
import { AppError } from "./error.middleware.js";

interface JwtPayload {
  userId: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const auth = (roles?: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new AppError(401, "Authentication required");
      }

      const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
      req.user = decoded;

      if (roles && !roles.includes(decoded.role)) {
        throw new AppError(403, "Insufficient permissions");
      }

      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        next(new AppError(401, "Invalid token"));
      } else {
        next(error);
      }
    }
  };
};
