import { z } from "zod";
import {
  academicSemesterCodes,
  academicSemesterTitleCodeMapper,
  academicSemesterTitles,
  acdemicSemesterMonths,
} from "./academicSemester.constant";

const createAcademicSemesterReq = z.object({
  body: z
    .object({
      title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
        required_error: "Title is must required",
        invalid_type_error: "Title must be a string",
      }),
      year: z.number({
        required_error: "Year is must required ",
        invalid_type_error: "Year must be a number",
      }),
      code: z.enum([...academicSemesterCodes] as [string, ...string[]]),
      startMonth: z.enum([...acdemicSemesterMonths] as [string, ...string[]], {
        required_error: "Start month is required",
        invalid_type_error: "Start month must be a string",
      }),
      endMonth: z.enum([...acdemicSemesterMonths] as [string, ...string[]], {
        required_error: "End month is required",
        invalid_type_error: "End month must be a string",
      }),
    })
    .strict(),
});
const updateSemesterReq = z
  .object({
    body: z
      .object({
        title: z
          .enum([...academicSemesterTitles] as [string, ...string[]], {
            required_error: "Title is must required",
            invalid_type_error: "Title must be a string",
          })
          .optional(),
        year: z
          .number({
            required_error: "Year is must required ",
            invalid_type_error: "Year must be a number",
          })
          .optional(),
        code: z
          .enum([...academicSemesterCodes] as [string, ...string[]])
          .optional(),
        startMonth: z
          .enum([...acdemicSemesterMonths] as [string, ...string[]], {
            required_error: "Start month is required",
            invalid_type_error: "Start month must be a string",
          })
          .optional(),
        endMonth: z
          .enum([...acdemicSemesterMonths] as [string, ...string[]], {
            required_error: "End month is required",
            invalid_type_error: "End month must be a string",
          })
          .optional(),
      })
      .strict(),
  })
  .refine(
    (value): boolean => {
      if (value.body.title && value.body.code) {
        return (
          academicSemesterTitleCodeMapper[value.body.title] === value.body.code
        );
      } else {
        return true;
      }
    },
    { message: "title and code are not matching" }
  );

const academicSemesterValidation = {
  createAcademicSemesterReq,
  updateSemesterReq,
};

export default academicSemesterValidation;
