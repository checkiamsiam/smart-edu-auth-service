import { z } from "zod";

const createUserReq = z.object({
  body: z.object({
    role: z.enum(["admin", "student", "faculty"] as [string, ...string[]], {
      invalid_type_error: "Role Must be admin,student or faculty",
      required_error: "Role is Required",
    }),
    password: z.string({
      invalid_type_error: "Password must be a string",
      required_error: "Password is Requered",
    }),
  }),
});

const userValidations = { createUserReq };

export default userValidations;
