import { Model } from "mongoose";
import { TMonthsName } from "../../interfaces/common.types";

export type TAcademicSemesterTitles = "Autumn" | "Summer" | "Fall";

export type TAcademicSemesterCodes = "01" | "02" | "03";

export interface IAcademicSemester {
  title: TAcademicSemesterTitles;
  year: string;
  code: TAcademicSemesterCodes;
  startMonth: TMonthsName;
  endMonth: TMonthsName;
}

export type PIAcademicSemester = Partial<IAcademicSemester>

export type AcademicSemesterModel = Model<IAcademicSemester, object>;
