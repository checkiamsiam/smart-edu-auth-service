import httpStatus from "http-status";
import { Schema, model } from "mongoose";
import { months } from "../../constants/months.constant";
import AppError from "../../utils/customError.util";
import {
  academicSemesterCodes,
  academicSemesterTitles,
} from "./academicSemester.constant";
import { IAcademicSemester } from "./academicSemester.interface";

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: {
        values: academicSemesterTitles,
        message: "{VALUE} is not supported.",
      },
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: {
        values: academicSemesterCodes,
        message: "{VALUE} is not supported.",
      },
    },
    startMonth: {
      type: String,
      required: true,
      enum: {
        values: months,
        message: "{VALUE} is not supported.",
      },
    },
    endMonth: {
      type: String,
      required: true,
      enum: {
        values: months,
        message: "{VALUE} is not supported.",
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

academicSemesterSchema.pre("save", async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new AppError("Already exist !", httpStatus.CONFLICT);
  }
  next();
});

// modal should define at last
export const AcademicSemester = model<IAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);
