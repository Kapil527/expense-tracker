import { Request, Response, NextFunction } from "express";

interface Error {
  message: string;
  statusCode: number;
  stack: any;
}
export function errorhandling(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const message = error.message || "Internal server Error";
  const statusCode = error.statusCode || 500;
  const stack = error.stack;

  return res
    .status(statusCode)
    .json({ success: false, message: message, stack });
}
