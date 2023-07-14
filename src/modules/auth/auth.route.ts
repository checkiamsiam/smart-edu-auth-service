import express from "express";
import authorization from "../../middleware/authorization.middleware";
import validateRequest from "../../middleware/validateRequest.middleware";
import authController from "./auth.controller";
import authValidation from "./auth.validation";
const authRoutes = express.Router();

authRoutes.post(
  "/login",
  validateRequest(authValidation.loginReq),
  authController.login
);
authRoutes.post(
  "/refresh-token",
  validateRequest(authValidation.refreshTokenReq),
  authController.refreshToken
);

authRoutes.patch(
  "/change-password",
  validateRequest(authValidation.changePasswordReq),
  authorization(),
  authController.changePassword
);

export default authRoutes;
