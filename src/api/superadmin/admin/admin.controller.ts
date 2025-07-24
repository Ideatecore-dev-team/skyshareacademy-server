import type { NextFunction, Request, Response } from "express";

import { AdminSchema } from "./admin.schema";
import { AdminService } from "./admin.service";

const adminService = new AdminService();

export class AdminController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await adminService.create(req.body);

      res.status(201).json({
        data: {
          admin: response,
        },
        message: "Success create new admin",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAdmins(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pagination = AdminSchema.pagination.parse(req.query);

      const response = await adminService.getAdmins(pagination);

      res.status(200).json({
        data: response,
        message: "Success get admin data",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAdminById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { adminId } = AdminSchema.adminId.parse(req.params);
      const response = await adminService.getAdminById(adminId);

      res.status(200).json({
        data: {
          admin: response,
        },
        message: "Success get data admin by id",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateAdminById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { adminId } = AdminSchema.adminId.parse(req.params);
      const response = await adminService.updateAdminById(adminId, req.body);

      res.status(200).json({
        data: {
          admin: response,
        },
        message: "Success update data admin by id",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
  async resetPasswordAdminById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { adminId } = AdminSchema.adminId.parse(req.params);
      const response = await adminService.resetPasswordById(adminId, req.body);

      res.status(200).json({
        data: {
          admin: response,
        },
        message: "Success reset password admin by id",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async removeAdminById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { adminId } = AdminSchema.adminId.parse(req.params);
      const response = await adminService.removeAdminById(adminId);

      res.status(200).json({
        data: {
          admin: response,
        },
        message: "Success remove admin by id",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
}
