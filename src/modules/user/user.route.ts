import express, { Router } from "express";
import authorization from "../../middleware/authorization.middleware";
import validateRequest from "../../middleware/validateRequest.middleware";
import userController from "./user.controller";
import { userRoleEnum } from "./user.interface";
import userValidations from "./user.validations";

const userRoutes: Router = express.Router();

userRoutes.post(
  "/create-student",
  validateRequest(userValidations.createStudentReq),
  authorization(
    userRoleEnum.admin,
    userRoleEnum.superAdmin,
    userRoleEnum.faculty
  ),
  userController.createStudent
);

userRoutes.post(
  "/create-faculty",
  authorization(userRoleEnum.admin, userRoleEnum.superAdmin),
  validateRequest(userValidations.createFacultyReq),
  userController.createFaculty
);

userRoutes.post(
  "/create-admin",
  authorization(userRoleEnum.superAdmin),
  validateRequest(userValidations.createAdminReq),
  userController.createAdmin
);

export default userRoutes;
