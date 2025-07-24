import { Router } from "express";
import { validate } from "../../../configs/validation";
import { AdminController } from "./admin.controller";
import { AdminSchema } from "./admin.schema";

const adminController = new AdminController();
export const adminRouter = Router();

adminRouter.post(
  "/create",
  validate.body(AdminSchema.create),
  adminController.create,
);

// get all admin
adminRouter.get(
  "/",
  validate.query(AdminSchema.pagination),
  adminController.getAdmins,
);

// get admin by id
adminRouter.get(
  "/:adminId",
  validate.params(AdminSchema.adminId),
  adminController.getAdminById,
);

// update admin by id
adminRouter.put(
  "/:adminId",
  validate.params(AdminSchema.adminId),
  validate.body(AdminSchema.updateAdmin),
  adminController.updateAdminById,
);

// reset password by id

adminRouter.put(
  "/:adminId/resetpassword",
  validate.params(AdminSchema.adminId),
  validate.body(AdminSchema.resetPassword),
  adminController.resetPasswordAdminById,
);

// remove admin by id
adminRouter.delete(
  "/:adminId",
  validate.params(AdminSchema.adminId),
  adminController.removeAdminById,
);
