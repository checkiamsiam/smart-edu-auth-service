import { Schema, model } from "mongoose";
import {
  IManagementDepartment,
  TManagementDepartmentModel,
} from "./managementDepartment.interface";

const ManagementDepartmentSchema = new Schema<
  IManagementDepartment,
  TManagementDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const ManagementDepartment = model<
  IManagementDepartment,
  TManagementDepartmentModel
>("ManagementDepartment", ManagementDepartmentSchema);
