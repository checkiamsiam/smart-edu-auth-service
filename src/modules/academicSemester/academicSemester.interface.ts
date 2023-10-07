import { Model } from "mongoose";
import { TMonthsName } from "../../interfaces/common.types";

export type TAcademicSemesterTitles = "Autumn" | "Summer" | "Fall";

export type TAcademicSemesterCodes = "01" | "02" | "03";

export interface IAcademicSemester {
  title: TAcademicSemesterTitles;
  year: number;
  code: TAcademicSemesterCodes;
  startMonth: TMonthsName;
  endMonth: TMonthsName;
  syncId: string;
}

export type AcademicSemesterModel = Model<IAcademicSemester, object>;

export type IAcademicSemesterCreatedEvent = {
  title: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
  id: string;
};
