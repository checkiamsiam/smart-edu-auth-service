import { Model, Types } from "mongoose";
import { IAcademicFaculty } from "../academicFaculty/academicFaculty.interface";

export interface IAcademicDepartment {
  title: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
}

export type AcademicDepartmentModel = Model<IAcademicDepartment, object>;
