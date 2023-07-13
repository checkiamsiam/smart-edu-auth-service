import express, { Router } from "express";
import queryFeatures from "../../middleware/queryFeatures.middleware";
import validateRequest from "../../middleware/validateRequest.middleware";
import academicFacultyController from "./academicFaculty.controller";
import academicFacultyValidation from "./academicFaculty.validation";
import authorization from "../../middleware/authorization.middleware";
import { userRoleEnum } from "../user/user.interface";

const academicFacultyRoutes: Router = express.Router();

academicFacultyRoutes.post(
  "/create",
  validateRequest(academicFacultyValidation.createAcademicFacultyReq),
  authorization(userRoleEnum.admin, userRoleEnum.superAdmin),
  academicFacultyController.createAcademicFaculty
);

academicFacultyRoutes.get(
  "/",
  queryFeatures("multiple"),
  academicFacultyController.getAcademicFaculties
);

academicFacultyRoutes.get(
  "/:id",
  queryFeatures("single"),
  academicFacultyController.getSigleAcademicFaculty
);

academicFacultyRoutes.put(
  "/update/:id",
  validateRequest(academicFacultyValidation.updateAcademicFacultyReq),
  authorization(userRoleEnum.admin, userRoleEnum.superAdmin),
  academicFacultyController.updateAcademicFaculty
);

academicFacultyRoutes.delete(
  "/delete/:id",
  authorization(userRoleEnum.admin, userRoleEnum.superAdmin),
  academicFacultyController.deleteAcademicFaculty
);

export default academicFacultyRoutes;
