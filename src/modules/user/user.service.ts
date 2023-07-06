import httpStatus from "http-status";
import mongoose, { Types } from "mongoose";
import AppError from "../../utils/customError.util";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { IAdmin } from "../admin/admin.interface";
import { IFaculty } from "../faculty/faculty.interface";
import { Faculty } from "../faculty/faculty.model";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser, userRoleEnum } from "./user.interface";
import { User } from "./user.model";
import userUtils from "./user.util";

const getLastStudentId = async (): Promise<string | undefined> => {
  const lastId = await User.findOne(
    { role: userRoleEnum.student },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastId?.id;
};
const getLastFacultyId = async (): Promise<string | undefined> => {
  const lastId = await User.findOne(
    { role: userRoleEnum.faculty },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastId?.id;
};
const getLastAdminId = async (): Promise<string | undefined> => {
  const lastId = await User.findOne(
    { role: userRoleEnum.admin },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastId?.id;
};
const getLastSuperAdminId = async (): Promise<string | undefined> => {
  const lastId = await User.findOne(
    { role: userRoleEnum.superAdmin },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastId?.id;
};

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  ).lean();

  if (!academicSemester) {
    throw new AppError("Academic semester not found", httpStatus.NOT_FOUND);
  }

  let newUserId: Types.ObjectId | null = null;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newStudentId = await userUtils.generateNewStudentID(academicSemester);

    user.id = newStudentId;
    student.id = newStudentId;

    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new AppError(
        "Student not created",
        httpStatus.INTERNAL_SERVER_ERROR
      );
    }

    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new AppError("User not created", httpStatus.INTERNAL_SERVER_ERROR);
    }

    newUserId = newUser[0]._id;

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  } finally {
    await session.endSession();
  }

  const result = await User.findById(newUserId).populate({
    path: "student",
    populate: [
      {
        path: "academicSemester",
      },
      {
        path: "academicDepartment",
      },
      {
        path: "academicFaculty",
      },
    ],
  });

  return result;
};

const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  let newUserId: Types.ObjectId | null = null;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newFacultyID = await userUtils.generateNewFacultyID();

    user.id = newFacultyID;
    faculty.id = newFacultyID;

    const newFaculty = await Faculty.create([faculty], { session });

    if (!newFaculty.length) {
      throw new AppError(
        "Faculty not created",
        httpStatus.INTERNAL_SERVER_ERROR
      );
    }

    user.faculty = newFaculty[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new AppError("User not created", httpStatus.INTERNAL_SERVER_ERROR);
    }

    newUserId = newUser[0]._id;

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  } finally {
    await session.endSession();
  }

  const result = await User.findById(newUserId).populate({
    path: "faculty",
    populate: [
      {
        path: "academicDepartment",
      },
      {
        path: "academicFaculty",
      },
    ],
  });

  return result;
};
const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  let newUserId: Types.ObjectId | null = null;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newAdminID = await userUtils.generateNewAdminID();

    user.id = newAdminID;
    admin.id = newAdminID;

    const newAdmin = await Faculty.create([admin], { session });

    if (!newAdmin.length) {
      throw new AppError("Admin not created", httpStatus.INTERNAL_SERVER_ERROR);
    }

    user.faculty = newAdmin[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new AppError("User not created", httpStatus.INTERNAL_SERVER_ERROR);
    }

    newUserId = newUser[0]._id;

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  } finally {
    await session.endSession();
  }

  const result = await User.findById(newUserId).populate({
    path: "admin",
    populate: [
      {
        path: "ManagementDepartment",
      },
    ],
  });

  return result;
};

const userService = {
  getLastStudentId,
  getLastFacultyId,
  getLastAdminId,
  getLastSuperAdminId,
  createStudent,
  createFaculty,
  createAdmin,
};

export default userService;
