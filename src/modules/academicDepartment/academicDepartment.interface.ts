import { Model, Types } from "mongoose";
import { IAcademicFaculty } from "../academicFaculty/academicFaculty.interface";

export interface IAcademicDepartment {
  title: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  syncId: string;
}

export type AcademicDepartmentCreatedEvent = {
  id: string;
  title: string;
  academicFacultyId: string;
};

export type AcademicDepartmentUpdatedEvent = {
  id: string;
  title: string;
  academicFacultyId: string;
};

export type AcademicDepartmentDeletedEvent = {
  id: string;
};

export type AcademicDepartmentModel = Model<IAcademicDepartment, object>;
