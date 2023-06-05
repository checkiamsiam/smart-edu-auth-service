import { NextFunction, Request, Response } from "express";
import { TMiddleware } from "../types/milldewareTypes";

const catchAsyncErrors = (fn: TMiddleware) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsyncErrors;
