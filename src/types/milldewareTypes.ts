import { NextFunction, Request, Response } from "express";

export type TMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;
export type TErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => void;
