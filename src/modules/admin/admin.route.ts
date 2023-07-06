import express, { Router } from "express";
import queryFeatures from "../../middleware/queryFeatures.middleware";
import validateRequest from "../../middleware/validateRequest.middleware";
import adminControllers from "./admin.controller";
import { adminValidation } from "./admin.validation";

const adminRoute: Router = express.Router();

adminRoute.get("/", queryFeatures("multiple"), adminControllers.getAdmins);
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
