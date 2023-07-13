import express, { Router } from "express";
import authorization from "../../middleware/authorization.middleware";
import queryFeatures from "../../middleware/queryFeatures.middleware";
import validateRequest from "../../middleware/validateRequest.middleware";
import studentControllers from "./student.controller";
import { studentValidation } from "./student.validation";

const studentRoute: Router = express.Router();

studentRoute.use(authorization());

studentRoute.get(
  "/",
  queryFeatures("multiple"),
  studentControllers.getStudents
);
studentRoute.get(
  "/:id",
  queryFeatures("single"),
  studentControllers.getSingleStudent
);
studentRoute.put(
  "/update/:id",
  validateRequest(studentValidation.updateStudentReq),
  studentControllers.updateStudent
);

export default studentRoute;
