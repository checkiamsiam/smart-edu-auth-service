import { Response } from "express";
import AppError from "../utils/CustomError";

export type TAppError =  AppError;
export type THandleErrorFunc = (err: any, res?: Response) => TAppError;
export type THandleErrorResponse = (err: any, res: Response) => void;
