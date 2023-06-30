import { Model } from "mongoose";

export type userRole = "student" | "faculty" | "admin" | "superAdmin";

export enum userRoleEnum {
  superAdmin = "superAdmin",
  student = "student",
  faculty = "faculty",
  admin = "admin",
}

export type IUser = {
  id: string;
  role: userRole;
  password: string;
};

export type UserModel = Model<IUser, object>;
