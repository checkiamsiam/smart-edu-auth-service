import { z } from 'zod';
import { academicSemesterCodes, academicSemesterTitles, acdemicSemesterMonths } from './academicSemester.constant';


const createAcademicSemesterReq = z.object({
    body: z.object({
        title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
            required_error: 'Title is must required',
        }),
        year: z.string({
            required_error: 'Year is must required ',
        }),
        code: z.enum([...academicSemesterCodes] as [string, ...string[]]),
        startMonth: z.enum([...acdemicSemesterMonths] as [string, ...string[]], {
            required_error: 'Start month is required',
        }),
        endMonth: z.enum([...acdemicSemesterMonths] as [string, ...string[]], {
            required_error: 'End month is required',
        }),
    }),
});


const academicSemesterValidation = { createAcademicSemesterReq }

export default academicSemesterValidation