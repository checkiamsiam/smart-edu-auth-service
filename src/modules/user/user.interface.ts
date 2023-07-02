import { Model, Types } from "mongoose";
import { IStudent } from "../student/student.interface";

export type TUserRole = "student" | "faculty" | "admin" | "superAdmin";

export enum userRoleEnum {
  superAdmin = "superAdmin",
  student = "student",
  faculty = "faculty",
  admin = "admin",
}

export type IUser = {
  id: string;
  role: TUserRole;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId; // | IAcademicFaculty;
  admin?: Types.ObjectId; // | IAcademicDepartment;
};

export type UserModel = Model<IUser, object>;
