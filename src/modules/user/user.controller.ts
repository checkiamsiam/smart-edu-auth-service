import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsyncErrors from "../../utils/catchAsyncError.util";
import userService from "./user.service";

const createUser: RequestHandler = catchAsyncErrors(async (req, res) => {
  const userData = req.body;
  const result = await userService.createUser(userData);
  res.status(httpStatus.OK).json({
    success: true,
    message: "User created successfully",
    data: result,
  });
});


const userController = { createUser }

export default userController


