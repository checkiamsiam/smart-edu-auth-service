import { NextFunction, Request, RequestHandler, Response } from "express";
import { TMiddleware } from "../types/milldewareTypes";

const catchAsyncErrors = (fn: TMiddleware): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsyncErrors;
