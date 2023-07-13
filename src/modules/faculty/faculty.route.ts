import express, { Router } from "express";
import queryFeatures from "../../middleware/queryFeatures.middleware";
import validateRequest from "../../middleware/validateRequest.middleware";
import facultyControllers from "./faculty.controller";
import { facultyValidation } from "./faculty.validation";
import authorization from "../../middleware/authorization.middleware";
import { userRoleEnum } from "../user/user.interface";

const facultyRoute: Router = express.Router();

facultyRoute.get(
  "/",
  queryFeatures("multiple"),
  facultyControllers.getFaculties
);
facultyRoute.get(
  "/:id",
  queryFeatures("single"),
  facultyControllers.getSingleFaculty
);
facultyRoute.put(
  "/update/:id",
  authorization(
    userRoleEnum.admin,
    userRoleEnum.superAdmin,
    userRoleEnum.faculty
  ),
  validateRequest(facultyValidation.updateFacultyReq),
  facultyControllers.updateFaculty
);

export default facultyRoute;
