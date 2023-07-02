import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import { IUser, userRoleEnum } from "./user.interface";
import { User } from "./user.model";

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
  user.id = "000001";
  const newUser = await User.create(user);
  return newUser;
};

const userService = {
  getLastStudentId,
  getLastFacultyId,
  getLastAdminId,
  getLastSuperAdminId,
  createStudent,
};

export default userService;
