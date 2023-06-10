import { IUser } from "./user.interface";
import { User } from "./user.model";
import util from "./user.util";

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

const createUser = async (user: IUser): Promise<IUser | null> => {
  const lastId = await getLastId();
  const newId = util.generateNewID(lastId);
  user.id = newId;
  const newUser = await User.create(user);
  return newUser;
};

export default {
  getLastId,
  createUser,
};
