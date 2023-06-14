import { z } from "zod";

export const createUserReq = z.object({
  body: z.object({
    role: z.enum(["admin", "student", "faculty"], {
      invalid_type_error: "Role Must be admin,student or faculty"
    }),
    password: z.string({
      invalid_type_error: "Password must be a string",
      required_error: "Password is Requered",
    }),
  })
})
