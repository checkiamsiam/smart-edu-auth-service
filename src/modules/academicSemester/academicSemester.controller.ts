import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsyncErrors from "../../utils/catchAsyncError.util";
import AppError from "../../utils/customError.util";
import sendResponse from "../../utils/sendResponse.util";
import { academicSemesterTitleCodeMapper } from "./academicSemester.constant";
import { IAcademicSemester } from "./academicSemester.interface";
import academicSemesterService from "./academicSemester.service";

const createAcademicSemester: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const body: IAcademicSemester = req.body;
    if (academicSemesterTitleCodeMapper[body.title] !== body.code) {
      throw new AppError("invalid code", httpStatus.BAD_REQUEST);
    }
    const result = await academicSemesterService.create(body);
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester created successfully",
      data: result,
    });
  }
);
const getAcademicSemesters: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const getResult = await academicSemesterService.getAcademicSemesters(
      req.queryFeatures
    );
    sendResponse<Partial<IAcademicSemester>[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: getResult.data,
      meta: {
        page: req.queryFeatures.page,
        limit: req.queryFeatures.limit,
        total: getResult.total || 0,
      },
    });
  }
);
const getSigleAcademicSemester: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const id: string = req.params.id
    const result: Partial<IAcademicSemester> | null = await academicSemesterService.getSingleAcademicSemester(id, req.queryFeatures);
    if (!result) {
      throw new AppError("Semester Not Found", httpStatus.NOT_FOUND)
    }
    sendResponse<Partial<IAcademicSemester>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result
    })
  }
);



const academicSemesterController = {
  createAcademicSemester,
  getAcademicSemesters,
  getSigleAcademicSemester
};
export default academicSemesterController;
