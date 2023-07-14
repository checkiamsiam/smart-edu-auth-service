import { Request, RequestHandler, Response } from "express";
import config from "../../config";
import catchAsyncErrors from "../../utils/catchAsyncError.util";
import sendResponse from "../../utils/sendResponse.util";
import { ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface";
import { authService } from "./auth.service";

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
const refreshToken: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const result = await authService.refreshToken(refreshToken);

    // set refresh token into cookie
    const cookieOptions = {
      secure: !config.isDevelopment,
      httpOnly: true,
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);

    sendResponse<IRefreshTokenResponse>(res, {
      statusCode: 200,
      success: true,
      message: "User refreshed in successfully !",
      data: result,
    });
  }
);

const changePassword = catchAsyncErrors(async (req: Request, res: Response) => {
  const { id } = req.user;
  const { oldPassword, newPassword } = req.body;

  await authService.changePassword(id, oldPassword, newPassword);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password changed successfully !",
  });
});

const authController = { login, refreshToken, changePassword };

export default authController;
