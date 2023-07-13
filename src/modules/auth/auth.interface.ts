import { userRoleEnum } from "../user/user.interface";

export type ILoginUser = {
  id: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange: boolean;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IVerifiedLoginUser = {
  userId: string;
  role: userRoleEnum;
};

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};
