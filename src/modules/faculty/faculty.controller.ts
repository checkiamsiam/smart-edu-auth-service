import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsyncErrors from "../../utils/catchAsyncError.util";
import AppError from "../../utils/customError.util";
import sendResponse from "../../utils/sendResponse.util";
import { IFaculty } from "./faculty.interface";
import facultyServices from "./faculty.service";

const getFaculties: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const getResult = await facultyServices.getFaculties(req.queryFeatures);
    sendResponse<Partial<IFaculty>[]>(res, {
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

const getSingleFaculty: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const result: Partial<IFaculty> | null =
      await facultyServices.getSingleFaculty(id, req.queryFeatures);
    if (!result) {
      throw new AppError("Faculty Not Found", httpStatus.NOT_FOUND);
    }
    sendResponse<Partial<IFaculty>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  }
);

const updateFaculty: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const updatePayload: Partial<IFaculty> = req.body;
    const result: Partial<IFaculty> | null =
      await facultyServices.updateFaculty(id, updatePayload);

    if (!result) {
      throw new AppError("Requested Document Not Found", httpStatus.NOT_FOUND);
    }
    sendResponse<Partial<IFaculty>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Document Updated Successfully",
      data: result,
    });
  }
);

const facultyControllers = { getFaculties, getSingleFaculty, updateFaculty };

export default facultyControllers;
