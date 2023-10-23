import { Model, Types } from "mongoose";
import { IAdmin } from "../admin/admin.interface";
import { IStudent } from "../student/student.interface";
import { IFaculty } from "../faculty/faculty.interface";

export type TUserRole = "student" | "faculty" | "admin" | "super_admin";

export enum userRoleEnum {
  superAdmin = "super_admin",
  student = "student",
  faculty = "faculty",
  admin = "admin",
}

export type IUser = {
  id: string;
  role: TUserRole;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
};

export interface UserModel extends Model<IUser> {
  isUserExist(id: string): Promise<IUser | null>;
}
