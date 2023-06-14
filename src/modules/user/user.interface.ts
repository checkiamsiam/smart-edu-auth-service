import { Model } from "mongoose";

export type userRole = "student" | "faculty" | "admin"

export type IUser = {
  id: string;
  role: userRole;
  password: string;
};

export type UserModel = Model<IUser, object>;