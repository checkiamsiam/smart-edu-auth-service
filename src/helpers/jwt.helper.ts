import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const createToken = (
  payload: object,
  secret: string,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (token: string, secret: Secret): JwtPayload | string => {
  return jwt.verify(token, secret);
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
