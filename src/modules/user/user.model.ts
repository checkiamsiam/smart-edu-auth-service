import { Model, Schema, model } from "mongoose";
import { IUser } from "./user.interface";

type UserModel = Model<IUser, object>;

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ["admin", "student", "faculty"],
        message:
          '{VALUE} is not supported. must be either "admin" , "student" or "faculty"',
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const User = model<IUser, UserModel>("User", userSchema);
