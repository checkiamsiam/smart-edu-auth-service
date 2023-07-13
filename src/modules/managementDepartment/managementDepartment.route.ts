import express, { Router } from "express";
import authorization from "../../middleware/authorization.middleware";
import queryFeatures from "../../middleware/queryFeatures.middleware";
import validateRequest from "../../middleware/validateRequest.middleware";
import managementDepartmentController from "./managementDepartment.controller";
import managementDepartmentValidation from "./managementDepartment.validation";

const managementDepartmentRoutes: Router = express.Router();

managementDepartmentRoutes.post(
  "/create",
  validateRequest(managementDepartmentValidation.createManagementDepartmentReq),
  managementDepartmentController.createManagementDepartment
);

managementDepartmentRoutes.get(
  "/",
  queryFeatures("multiple"),
  managementDepartmentController.getManagementDepartments
);

managementDepartmentRoutes.get(
  "/:id",
  queryFeatures("single"),
  managementDepartmentController.getSigleManagementDepartment
);

managementDepartmentRoutes.put(
  "/update/:id",
  validateRequest(managementDepartmentValidation.updateManagementDepartmentReq),
  managementDepartmentController.updateManagementDepartment
);

managementDepartmentRoutes.delete(
  "/delete/:id",
  managementDepartmentController.deleteManagementDepartment
);

export default managementDepartmentRoutes;
