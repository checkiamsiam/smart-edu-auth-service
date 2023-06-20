import { z } from "zod";
import {
  academicSemesterCodes,
  academicSemesterTitles,
  acdemicSemesterMonths,
} from "./academicSemester.constant";

const createAcademicSemesterReq = z.object({
  body: z.object({
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
  }),
});

const academicSemesterValidation = { createAcademicSemesterReq };

export default academicSemesterValidation;
