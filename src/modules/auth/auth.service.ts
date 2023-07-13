import httpStatus from "http-status";
import config from "../../config";
import { jwtHelpers } from "../../helpers/jwt.helper";
import AppError from "../../utils/customError.util";
import { User } from "../user/user.model";
import { ILoginUser, ILoginUserResponse } from "./auth.interface";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new AppError("User does not exist", httpStatus.NOT_FOUND);
  }

  if (isUserExist.password && !(await isUserExist.comparePassword(password))) {
    throw new AppError("Password is incorrect", httpStatus.UNAUTHORIZED);
  }

  //create access token & refresh token
  const { id: userId, role, needsPasswordChange } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret,
    config.jwt.expiresIn
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refreshSecret,
    config.jwt.refreshExpiresIn
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

export const authService = {
  loginUser,
};
