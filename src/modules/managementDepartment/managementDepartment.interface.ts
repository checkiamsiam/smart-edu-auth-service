import { Model } from "mongoose";

export interface IManagementDepartment {
  title: string;
}

export type TManagementDepartmentModel = Model<IManagementDepartment, object>;
