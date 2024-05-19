import { Request, Response, NextFunction } from "express";
import { ControllerType } from "types/controllerType";

const asyncErrorHandler = (func: ControllerType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
  };
};

export default asyncErrorHandler;
