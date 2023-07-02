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

const createUser = async (user: IUser): Promise<IUser> => {
  // const lastId = await getLastId();
  // const newId = userUtils.generateNewID(null);
  user.id = "000001";
  const newUser = await User.create(user);
  return newUser;
};

const userService = {
  getLastStudentId,
  getLastFacultyId,
  getLastAdminId,
  getLastSuperAdminId,
  createUser,
};

export default userService;
