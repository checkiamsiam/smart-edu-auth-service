import express from "express";
import validateRequest from "../../middleware/validateRequest.middleware";
import authController from "./auth.controller";
import authValidation from "./auth.validation";
const router = express.Router();

router.post(
  "/login",
  validateRequest(authValidation.loginReq),
  authController.login
);

export const authRoutes = router;
