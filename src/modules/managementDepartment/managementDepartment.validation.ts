import { z } from "zod";

const createManagementDepartmentReq = z.object({
  body: z
    .object({
      title: z.string({
        required_error: "Title is must required",
        invalid_type_error: "Title must be a string",
      }),
    })
    .strict(),
});
const updateManagementDepartmentReq = z.object({
  body: z
    .object({
      title: z
        .string({
          required_error: "Title is must required",
          invalid_type_error: "Title must be a string",
        })
        .optional(),
    })
    .strict(),
});

const managementDepartmentValidation = {
  createManagementDepartmentReq,
  updateManagementDepartmentReq,
};

export default managementDepartmentValidation;
