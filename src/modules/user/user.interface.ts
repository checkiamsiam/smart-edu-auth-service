import { Model } from "mongoose";

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
};

export type UserModel = Model<IUser, object>;
