import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import config from "../../config";
import catchAsyncErrors from "../../utils/catchAsyncError.util";
import sendResponse from "../../utils/sendResponse.util";
import { IUser, userRoleEnum } from "./user.interface";
import userService from "./user.service";

const createStudent: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;
    if (!userData.password) {
      userData.password = config.studentDefaultPassword;
    }
    userData.role = userRoleEnum.student;
    const result = await userService.createStudent(student, userData);
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student created successfully",
      data: result,
    });
  }
);
const createFaculty: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body;
    if (!userData.password) {
      userData.password = config.facultyDefaultPassword;
    }
    userData.role = userRoleEnum.faculty;
    const result = await userService.createFaculty(faculty, userData);
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Faculty created successfully",
      data: result,
    });
  }
);
const createAdmin: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;
    if (!userData.password) {
      userData.password = config.adminDefaultPassword;
    }
    userData.role = userRoleEnum.admin;
    const result = await userService.createAdmin(admin, userData);
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  }
);

const userController = { createStudent, createFaculty, createAdmin };

export default userController;
