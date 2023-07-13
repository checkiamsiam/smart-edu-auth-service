import express, { Router } from "express";
import authorization from "../../middleware/authorization.middleware";
import queryFeatures from "../../middleware/queryFeatures.middleware";
import validateRequest from "../../middleware/validateRequest.middleware";
import { userRoleEnum } from "../user/user.interface";
import adminControllers from "./admin.controller";
import { adminValidation } from "./admin.validation";

const adminRoute: Router = express.Router();

adminRoute.get(
  "/",
  authorization(userRoleEnum.admin, userRoleEnum.superAdmin),
  queryFeatures("multiple"),
  adminControllers.getAdmins
);
adminRoute.get(
  "/:id",
  queryFeatures("single"),
  adminControllers.getSingleAdmin
);
adminRoute.put(
  "/update/:id",
  validateRequest(adminValidation.updateAdminReq),
  adminControllers.updateAdmin
);

export default adminRoute;
