import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

import asyncErrorHandler from "./catchAsyncError";
import ErrorHandler from "../utils/errorhandler";

dotenv.config();
const { JWT_SECRET } = process.env;
export const fetchUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers["authorization"] as string;
    const token = userId?.split("Bearer ")[0];

    if (!token) {
      return next(new ErrorHandler("Invalid Token", 400));
    }

    const data = jwt.verify(token, JWT_SECRET as string) as JwtPayload;
    if (!data) {
      return next(new ErrorHandler("Invalid Token", 400));
    }

    req.body.user = data.user.id;

    next();
  }
);
