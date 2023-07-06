import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsyncErrors from "../../utils/catchAsyncError.util";
import AppError from "../../utils/customError.util";
import sendResponse from "../../utils/sendResponse.util";
import { IManagementDepartment } from "./managementDepartment.interface";
import managementDepartmentService from "./managementDepartment.service";

const createManagementDepartment: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const body: IManagementDepartment = req.body;
    const result = await managementDepartmentService.create(body);
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Management Department created successfully",
      data: result,
    });
  }
);

const getManagementDepartments: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const getResult =
      await managementDepartmentService.getManagementDepartments(
        req.queryFeatures
      );
    sendResponse<Partial<IManagementDepartment>[]>(res, {
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
const getSigleManagementDepartment: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const result: Partial<IManagementDepartment> | null =
      await managementDepartmentService.getSingleManagementDepartment(
        id,
        req.queryFeatures
      );
    if (!result) {
      throw new AppError(
        "Management Department Not Found",
        httpStatus.NOT_FOUND
      );
    }
    sendResponse<Partial<IManagementDepartment>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  }
);

const updateManagementDepartment: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const updatePayload: Partial<IManagementDepartment> = req.body;
    const result: Partial<IManagementDepartment> | null =
      await managementDepartmentService.updateManagementDepartment(
        id,
        updatePayload
      );

    if (!result) {
      throw new AppError("Requrested Document Not Found", httpStatus.NOT_FOUND);
    }
    sendResponse<Partial<IManagementDepartment>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Document Updated Successfully",
      data: result,
    });
  }
);
const deleteManagementDepartment: RequestHandler = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const result = await managementDepartmentService.deleteManagementDepartment(
      id
    );

    if (!result) {
      throw new AppError("Requrested Document Not Found", httpStatus.NOT_FOUND);
    }
    sendResponse<Partial<IManagementDepartment>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Document Deleted Successfully",
    });
  }
);

const managementDepartmentController = {
  createManagementDepartment,
  getManagementDepartments,
  getSigleManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
};
export default managementDepartmentController;
