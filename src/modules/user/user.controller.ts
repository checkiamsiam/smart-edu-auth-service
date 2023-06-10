import { Request, Response } from "express";
import catchAsyncErrors from "../../utils/catchAsyncError";
import userService from "./user.service";

const createUser = catchAsyncErrors(async (req: Request, res: Response) => {
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
