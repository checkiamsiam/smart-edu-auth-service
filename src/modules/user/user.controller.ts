import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsyncErrors from "../../utils/catchAsyncError.util";
import sendResponse from "../../utils/sendResponse.util";
import { IUser } from "./user.interface";
import userService from "./user.service";

const createUser: RequestHandler = catchAsyncErrors(async (req: Request, res: Response) => {
  const userData = req.body;
  const result = await userService.createUser(userData);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const userController = { createUser };

export default userController;
