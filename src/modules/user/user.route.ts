import express from "express";
import userController from "./user.controller";

const userRoutes = express.Router();

userRoutes.post("/create-user", userController.createUser);

export default userRoutes;
