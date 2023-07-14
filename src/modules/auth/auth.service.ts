import httpStatus from "http-status";
import config from "../../config";
import { jwtHelpers } from "../../helpers/jwt.helper";
import AppError from "../../utils/customError.util";
import { User } from "../user/user.model";
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "./auth.interface";

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
    { id: userId, role },
    config.jwt.secret,
    config.jwt.expiresIn
  );

  const refreshToken = jwtHelpers.createToken(
    { id: userId, role },
    config.jwt.refreshSecret,
    config.jwt.refreshExpiresIn
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  const decoded = jwtHelpers.verifyToken(token, config.jwt.refreshSecret);

  const { userId } = decoded;

  const isUserExist = await User.isUserExist(userId);

  if (!isUserExist) {
    throw new AppError("User does not exist", httpStatus.NOT_FOUND);
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret,
    config.jwt.expiresIn
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  id: string,
  oldPassword: string,
  newPassword: string
): Promise<void> => {
  const isUserExist = await User.findOne({ id }).select("+password");

  if (!isUserExist) {
    throw new AppError("User does not exist", httpStatus.NOT_FOUND);
  }
  if (
    isUserExist.password &&
    !(await isUserExist.comparePassword(oldPassword))
  ) {
    throw new AppError("Old Password is incorrect", httpStatus.UNAUTHORIZED);
  }

  isUserExist.password = newPassword;
  isUserExist.needsPasswordChange = false;
  await isUserExist.save();
};

export const authService = {
  loginUser,
  refreshToken,
  changePassword,
};
