import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsyncErrors from "../../utils/catchAsyncError.util";
import sendResponse from "../../utils/sendResponse.util";
import { authService } from "./auth.service";
import config from "../../config";
import { ILoginUserResponse } from "./auth.interface";

const login: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await authService.loginUser(loginData);
    const { refreshToken, ...others } = result;

    // set refresh token into cookie
    const cookieOptions = {
      secure: !config.isDevelopment,
      httpOnly: true,
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);

    sendResponse<ILoginUserResponse>(res, {
      statusCode: 200,
      success: true,
      message: "User logged in successfully !",
      data: others,
    });
  }
);

const authController = { login };

export default authController;
