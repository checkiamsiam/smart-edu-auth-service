import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsyncErrors from "../../utils/catchAsyncError.util";
import AppError from "../../utils/customError.util";
import sendResponse from "../../utils/sendResponse.util";
import { IStudent } from "./student.interface";
import studentServices from "./student.service";

const getStudents: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const getResult = await studentServices.getStudents(req.queryFeatures);
    sendResponse<Partial<IStudent>[]>(res, {
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

const getSingleStudent: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const result: Partial<IStudent> | null =
      await studentServices.getSingleStudent(id, req.queryFeatures);
    if (!result) {
      throw new AppError("Student Not Found", httpStatus.NOT_FOUND);
    }
    sendResponse<Partial<IStudent>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  }
);

const updateStudent: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const updatePayload: Partial<IStudent> = req.body;
    const result: Partial<IStudent> | null =
      await studentServices.updateStudent(id, updatePayload);

    if (!result) {
      throw new AppError("Requested Document Not Found", httpStatus.NOT_FOUND);
    }
    sendResponse<Partial<IStudent>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Document Updated Successfully",
      data: result,
    });
  }
);

const studentControllers = { getStudents, getSingleStudent, updateStudent };

export default studentControllers;
