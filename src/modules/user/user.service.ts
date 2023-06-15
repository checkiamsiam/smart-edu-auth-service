import { IUser } from "./user.interface";
import { User } from "./user.model";
import userUtils from "./user.util";

const getLastId = async (): Promise<string | null> => {
  const lastId = await User.aggregate([
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $limit: 1,
    },
    {
      $project: {
        id: 1,
        _id: 0,
      },
    },
  ]);
  return lastId[0]?.id || null;
};

const createUser = async (user: IUser): Promise<IUser> => {
  const lastId = await getLastId();
  const newId = userUtils.generateNewID(lastId);
  user.id = newId;
  const newUser = await User.create(user);
  return newUser;
};


const userService = {
  getLastId,
  createUser,
};

export default userService
