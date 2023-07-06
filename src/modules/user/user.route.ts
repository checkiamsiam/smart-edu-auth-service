import express, { Router } from "express";
import validateRequest from "../../middleware/validateRequest.middleware";
import userController from "./user.controller";
import userValidations from "./user.validations";

const userRoutes: Router = express.Router();

userRoutes.post(
  "/create-student",
  validateRequest(userValidations.createStudentReq),
  userController.createStudent
);

userRoutes.post(
  "/create-faculty",
  validateRequest(userValidations.createFacultyReq),
  userController.createFaculty
);

userRoutes.post(
  "/create-admin",
  validateRequest(userValidations.createAdminReq),
  userController.createAdmin
);

export default userRoutes;
