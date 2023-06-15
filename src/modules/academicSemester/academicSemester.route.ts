import express from "express";
import validateRequest from "../../middleware/validateRequest.middleware";
import academicSemesterController from "./academicSemester.controller";
import academicSemesterValidation from "./academicSemester.validation";

const academicSemesterRoutes = express.Router();


academicSemesterRoutes.post("/create", validateRequest(academicSemesterValidation.createAcademicSemesterReq), academicSemesterController.createAcademicSemester);

export default academicSemesterRoutes;