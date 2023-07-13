import express, { Router } from "express";
import authorization from "../../middleware/authorization.middleware";
import queryFeatures from "../../middleware/queryFeatures.middleware";
import validateRequest from "../../middleware/validateRequest.middleware";
import { userRoleEnum } from "../user/user.interface";
import academicDepartmentController from "./academicDepartment.controller";
import academicDepartmentValidation from "./academicDepartment.validation";

const academicDepartmentRoutes: Router = express.Router();

academicDepartmentRoutes.post(
  "/create",
  validateRequest(academicDepartmentValidation.createAcademicDeparmentReq),
  authorization(userRoleEnum.admin, userRoleEnum.superAdmin),
  academicDepartmentController.createAcademicDepartment
);

academicDepartmentRoutes.get(
  "/",
  queryFeatures("multiple"),
  academicDepartmentController.getAcademicDepartments
);

academicDepartmentRoutes.get(
  "/:id",
  queryFeatures("single"),
  academicDepartmentController.getSigleAcademicDepartment
);

academicDepartmentRoutes.put(
  "/update/:id",
  validateRequest(academicDepartmentValidation.updateAcademicDepartmentReq),
  authorization(userRoleEnum.admin, userRoleEnum.superAdmin),
  academicDepartmentController.updateAcademicDepartment
);

academicDepartmentRoutes.delete(
  "/delete/:id",
  authorization(userRoleEnum.admin, userRoleEnum.superAdmin),
  academicDepartmentController.deleteAcademicDepartment
);

export default academicDepartmentRoutes;
