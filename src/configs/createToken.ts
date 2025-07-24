import jwt from "jsonwebtoken";
import { env } from "./env";

const secretKey = env.JWT_SECRET;
const expiredTime = env.JWT_EXPIRES_IN;

const option = {
  expiresIn: expiredTime,
} as jwt.SignOptions;

export const createToken = (payload: object): string => {
  const result = jwt.sign(payload, secretKey, option);

  return result;
};
