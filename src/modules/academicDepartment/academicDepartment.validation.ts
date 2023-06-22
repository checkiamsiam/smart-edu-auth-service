import { z } from "zod";

const createAcademicDeparmentReq = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is must required",
      invalid_type_error: "Title must be a string",
    }),
    academicFaculty: z.string({
      required_error: 'Academic Faculty is required',
    }),
  }).strict(),
});
const updateAcademicDepartmentReq = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is must required",
      invalid_type_error: "Title must be a string",
    }).optional(),
    academicFaculty: z.string({
      required_error: 'Academic Faculty is required',
    }).optional(),
  }),
});

const academicDepartmentValidation = { createAcademicDeparmentReq, updateAcademicDepartmentReq };

export default academicDepartmentValidation;
