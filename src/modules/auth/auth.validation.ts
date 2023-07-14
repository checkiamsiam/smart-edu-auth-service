import { z } from "zod";

const loginReq = z.object({
  body: z.object({
    id: z.string({
      required_error: "ID is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

const refreshTokenReq = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh Token is required",
    }),
  }),
});

const changePasswordReq = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: "Old password  is required",
    }),
    newPassword: z.string({
      required_error: "New password  is required",
    }),
  }),
});

const authValidation = {
  loginReq,
  refreshTokenReq,
  changePasswordReq,
};

export default authValidation;
