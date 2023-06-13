import express from "express";
import validateRequest from "../../middleware/validateRequest";
import userController from "./user.controller";
import { createUserReq } from "./user.validations";

const userRoutes = express.Router();
userRoutes.post("/create-user", validateRequest(createUserReq), userController.createUser);

export default userRoutes;
