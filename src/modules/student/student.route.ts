import express, { Router } from "express";
import queryFeatures from "../../middleware/queryFeatures.middleware";
import studentControllers from "./student.controller";

const studentRoute: Router = express.Router();

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
// studentRoute.put("/:id", studentControllers.updateStudent);

export default studentRoute;
