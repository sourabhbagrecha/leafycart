import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
import { AppError } from "./error.middleware.js";

interface JwtPayload {
  sub: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new AppError(401, "Authentication required");
    }
    const secret = process.env.SECRET || "secret";
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "object" && decoded !== null && "sub" in decoded) {
      req.userId = decoded.sub;
    } else {
      throw new AppError(401, "Invalid token payload");
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
