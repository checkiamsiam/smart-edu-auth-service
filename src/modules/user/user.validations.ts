import { z } from "zod";

export const createUserReq = z.object({
  body: z.object({
    role: z.string({
      invalid_type_error: "Role must be a string",
      required_error: "Role is Requered",
    }),
    password: z.string({
      invalid_type_error: "Password must be a string",
      required_error: "Password is Requered",
    }),
  })
})
