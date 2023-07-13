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
router.post(
  "/refresh-token",
  validateRequest(authValidation.refreshTokenReq),
  authController.refreshToken
);

export const authRoutes = router;
