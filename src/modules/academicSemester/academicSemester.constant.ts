import { TMonthsName } from "../../interfaces/common.types";
import {
  TAcademicSemesterCodes,
  TAcademicSemesterTitles,
} from "./academicSemester.interface";

export const academicSemesterTitles: TAcademicSemesterTitles[] = [
  "Autumn",
  "Summer",
  "Fall",
];

export const academicSemesterCodes: TAcademicSemesterCodes[] = [
  "01",
  "02",
  "03",
];

export const acdemicSemesterMonths: TMonthsName[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: "01",
  Summer: "02",
  Fall: "03",
};
