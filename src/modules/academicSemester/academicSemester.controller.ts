import { RequestHandler } from "express";
import catchAsyncErrors from "../../utils/catchAsyncError.util";
import { IAcademicSemester } from "./academicSemester.interface";
import academicSemesterService from "./academicSemester.service";

const createAcademicSemester: RequestHandler = catchAsyncErrors(async (req, res) => {
    const body: IAcademicSemester = req.body;
    const result = await academicSemesterService.create(body)
    res.status(200).json({
        success: true,
        message: "Semester created successfully",
        data: result,
    });
});


const academicSemesterController = {
    createAcademicSemester,
};
export default academicSemesterController
