import express, { Router } from "express";
import queryFeatures from "../../middleware/queryFeatures.middleware";
import validateRequest from "../../middleware/validateRequest.middleware";
import academicSemesterController from "./academicSemester.controller";
import academicSemesterValidation from "./academicSemester.validation";

const academicSemesterRoutes : Router = express.Router();

academicSemesterRoutes.post(
  "/create",
  validateRequest(academicSemesterValidation.createAcademicSemesterReq),
  academicSemesterController.createAcademicSemester
);
academicSemesterRoutes.get(
  "/get-academic-semesters",
  queryFeatures,
  academicSemesterController.getAcademicSemesters
);

export default academicSemesterRoutes;
