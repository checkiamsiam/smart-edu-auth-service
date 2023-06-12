import { RequestHandler } from "express";
import catchAsyncErrors from "../../utils/catchAsyncError";
import { IUser } from "./user.interface";
import { createUserReq } from "./user.schemas";
import userService from "./user.service";

const createUser: RequestHandler = catchAsyncErrors(async (req, res) => {
  const reqBody = req.body;
  const userData = createUserReq.parse(reqBody);
  const result = await userService.createUser(userData as IUser);
  res.status(200).json({
    success: true,
    message: "User created successfully",
    data: result,
  });
});

export default {
  createUser,
};
