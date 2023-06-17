import express, { Router } from "express";
import validateRequest from "../../middleware/validateRequest.middleware";
import userController from "./user.controller";
import userValidations from "./user.validations";

const userRoutes : Router = express.Router();

userRoutes.post(
  "/create-user",
  validateRequest(userValidations.createUserReq),
  userController.createUser
);

export default userRoutes;
