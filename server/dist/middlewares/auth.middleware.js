import jwt from "jsonwebtoken";
import { AppError } from "./error.middleware.js";
export const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new AppError(401, "Authentication required");
        }
        const secret = process.env.SECRET || "secret";
        const decoded = jwt.verify(token, secret);
        if (typeof decoded === "object" && decoded !== null && "sub" in decoded) {
            req.userId = decoded.sub;
        }
        else {
            throw new AppError(401, "Invalid token payload");
        }
        next();
    }
    catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            next(new AppError(401, "Invalid token"));
        }
        else {
            next(error);
        }
    }
};
