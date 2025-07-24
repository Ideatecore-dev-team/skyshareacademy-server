import jwt from "jsonwebtoken";
import { UnauthorizedException } from "../errors/Errors";
import { env } from "./env";

const secretKey = env.JWT_SECRET;

export const verifyToken = (token: string): jwt.JwtPayload => {
  let decoded: string | jwt.JwtPayload;

  try {
    decoded = jwt.verify(token, secretKey);
  } catch {
    throw new UnauthorizedException("Unauthenticated: Invalid or expired token");
  }

  if (typeof decoded !== "object" || decoded === null) {
    throw new UnauthorizedException("Unauthenticated: Invalid token payload");
  }

  return decoded;
};
