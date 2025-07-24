import type { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../errors/Errors";

const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const userRole = req.user?.role;

    if (!userRole) {
      throw new UnauthorizedException("Unauthorized: Role is missing");
    }

    if (!allowedRoles.includes(userRole)) {
      throw new UnauthorizedException("Forbidden: Access denied");
    }

    next();
  };
};

export const role = {
  admin: authorizeRoles("ADMIN"),
  superAdmin: authorizeRoles("SUPER_ADMIN"),
  moderator: authorizeRoles("MODERATOR"),
  writer: authorizeRoles("WRITER"),
  user: authorizeRoles("USER"),
};
