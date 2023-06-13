import { RequestHandler } from "express";
import catchAsyncErrors from "../../utils/catchAsyncError";
import userService from "./user.service";

const createUser: RequestHandler = catchAsyncErrors(async (req, res) => {
  const userData = req.body;
  const result = await userService.createUser(userData);
  res.status(200).json({
    success: true,
    message: "User created successfully",
    data: result,
  });
});

export default {
  createUser,
};
