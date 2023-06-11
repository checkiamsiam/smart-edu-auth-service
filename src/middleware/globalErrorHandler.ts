import { ErrorRequestHandler } from "express";
import config from "../config";
import { THandleErrorFunc, THandleErrorResponse } from "../types/ErrorTypes";
import AppError from "../utils/CustomError";
import { print } from "../utils/customPrint";

// handel cast error db
const handelCastErrorDB: THandleErrorFunc = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

// handel duplicate error
const handelDuplicateErrorDB: THandleErrorFunc = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message =
    `Duplicate field value: ${value.trim()}. Please use another value!`.replace(
      /['"]+/g,
      ""
    );
  return new AppError(message, 400);
};

// handel validation error
const handelValidationErrorDB: THandleErrorFunc = (err) => {
  try {
    const errors = Object.values(err.errors).map((el: any) => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new AppError(message, 400);
  } catch (error) {
    return new AppError(err.message, 400);
  }
};

const sendErrorProd: THandleErrorResponse = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  } else {
    print.error("Error 💥", err);
    // 2. Send generic message to client
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

// send errorDevelopment to client
const sendErrorDev: THandleErrorResponse = (err, res) => {
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

// globalErrorHandler
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.name === "CastError") {
    err = handelCastErrorDB(err);
  }

  if (err.code === 11000) {
    err = handelDuplicateErrorDB(err);
  }

  if (err.name === "ValidationError") {
    err = handelValidationErrorDB(err);
  }

  if (err.name === "JsonWebTokenError") {
    err = new AppError("Invalid token. Please log in again!", 401);
  }

  if (err.name === "TokenExpiredError") {
    err = new AppError("Token expired. Please log in again!", 401);
  }

  if (config.isDevelopment) {
    sendErrorDev(err, res);
  } else {
    sendErrorProd(err, res);
  }
};

export default globalErrorHandler;
