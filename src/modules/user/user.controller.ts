import { Request, Response } from "express";
import catchAsyncErrors from "../../utils/catchAsyncError";

const createUser = catchAsyncErrors(async (req: Request, res: Response) => {
  res.send("create user");
});

export default {
  createUser,
};
