import express, { Router } from "express";
import queryFeatures from "../../middleware/queryFeatures.middleware";
import validateRequest from "../../middleware/validateRequest.middleware";
import academicSemesterController from "./academicSemester.controller";
import academicSemesterValidation from "./academicSemester.validation";

const academicSemesterRoutes: Router = express.Router();

academicSemesterRoutes.post(
  "/create",
  validateRequest(academicSemesterValidation.createAcademicSemesterReq),
  academicSemesterController.createAcademicSemester
);

academicSemesterRoutes.get(
  "/get-academic-semesters",
  queryFeatures("multiple"),
  academicSemesterController.getAcademicSemesters
);

academicSemesterRoutes.get(
  "/get-single-academic-semester/:id",
  queryFeatures("single"),
  academicSemesterController.getSigleAcademicSemester
);

academicSemesterRoutes.put(
  "/update/:id",
  validateRequest(academicSemesterValidation.updateSemesterReq),
  academicSemesterController.updateAcademicSemester
);

academicSemesterRoutes.delete(
  "/delete/:id",
  academicSemesterController.deleteAcademicSemester
);


export default academicSemesterRoutes;
