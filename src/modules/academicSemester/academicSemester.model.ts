import { Schema, model } from 'mongoose';
import {
  academicSemesterCodes,
  academicSemesterTitles,
  acdemicSemesterMonths,
} from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: {
        values: academicSemesterTitles,
        message: "{VALUE} is not supported."
      },
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: {
        values: academicSemesterCodes,
        message: "{VALUE} is not supported."
      },
    },
    startMonth: {
      type: String,
      required: true,
      enum: {
        values: acdemicSemesterMonths,
        message: "{VALUE} is not supported."
      },
    },
    endMonth: {
      type: String,
      required: true,
      enum: {
        values: acdemicSemesterMonths,
        message: "{VALUE} is not supported."
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// academicSemesterSchema.pre('save', async function (next) {
//   const isExist = await AcademicSemester.findOne({
//     title: this.title,
//     year: this.year,
//   });
//   if (isExist) {
//     throw new AppError(
//       httpStatus.CONFLICT,
//       'Academic semester is already exist !'
//     );
//   }
//   next();
// });

export const AcademicSemester = model<IAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema
);