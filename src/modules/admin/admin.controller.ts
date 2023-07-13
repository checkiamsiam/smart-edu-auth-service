import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsyncErrors from "../../utils/catchAsyncError.util";
import AppError from "../../utils/customError.util";
import sendResponse from "../../utils/sendResponse.util";
import { IAdmin } from "./admin.interface";
import adminServices from "./admin.service";

const getAdmins: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const getResult = await adminServices.getAdmins(req.queryFeatures);
    sendResponse<Partial<IAdmin>[]>(res, {
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

const getSingleAdmin: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const result: Partial<IAdmin> | null = await adminServices.getSingleAdmin(
      id,
      req.queryFeatures
    );
    if (!result) {
      throw new AppError("Admin Not Found", httpStatus.NOT_FOUND);
    }
    sendResponse<Partial<IAdmin>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  }
);

const updateAdmin: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const updatePayload: Partial<IAdmin> = req.body;
    const result: Partial<IAdmin> | null = await adminServices.updateAdmin(
      id,
      updatePayload
    );

    if (!result) {
      throw new AppError("Requested Document Not Found", httpStatus.NOT_FOUND);
    }
    sendResponse<Partial<IAdmin>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Document Updated Successfully",
      data: result,
    });
  }
);

const adminControllers = { getAdmins, getSingleAdmin, updateAdmin };

export default adminControllers;
