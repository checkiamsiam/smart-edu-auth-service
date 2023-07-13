import express, { Router } from "express";
import queryFeatures from "../../middleware/queryFeatures.middleware";
import validateRequest from "../../middleware/validateRequest.middleware";
import academicSemesterController from "./academicSemester.controller";
import academicSemesterValidation from "./academicSemester.validation";
import authorization from "../../middleware/authorization.middleware";
import { userRoleEnum } from "../user/user.interface";

const academicSemesterRoutes: Router = express.Router();

academicSemesterRoutes.post(
  "/create",
  validateRequest(academicSemesterValidation.createAcademicSemesterReq),
  authorization(userRoleEnum.admin, userRoleEnum.superAdmin),
  academicSemesterController.createAcademicSemester
);

academicSemesterRoutes.get(
  "/",
  queryFeatures("multiple"),
  academicSemesterController.getAcademicSemesters
);

academicSemesterRoutes.get(
  "/:id",
  queryFeatures("single"),
  academicSemesterController.getSigleAcademicSemester
);

academicSemesterRoutes.put(
  "/update/:id",
  validateRequest(academicSemesterValidation.updateSemesterReq),
  authorization(userRoleEnum.admin, userRoleEnum.superAdmin),
  academicSemesterController.updateAcademicSemester
);

academicSemesterRoutes.delete(
  "/delete/:id",
  authorization(userRoleEnum.admin, userRoleEnum.superAdmin),
  academicSemesterController.deleteAcademicSemester
);

export default academicSemesterRoutes;
