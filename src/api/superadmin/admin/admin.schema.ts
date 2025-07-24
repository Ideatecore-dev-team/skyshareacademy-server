import { z } from "zod";

export const AdminSchema = {
  create: z
    .object({
      email: z.string().trim().email().min(8).max(100),
      name: z.string().trim().min(8).max(100),
      password: z.string().trim().min(8).max(32),
      role: z.enum(["SUPER_ADMIN", "ADMIN"]).default("ADMIN"),
    })
    .strict(),

  responseAdmin: z
    .object({
      id: z.string().cuid(),
      email: z.string().email().max(100),
      name: z.string().max(100),
      role: z.enum(["SUPER_ADMIN", "ADMIN"]),
      createdAt: z.coerce.date(),
      updatedAt: z.coerce.date(),
    })
    .strict(),

  pagination: z
    .object({
      page: z.coerce.number().int().min(1).default(1),
      size: z.coerce.number().int().min(1).max(100).default(10),
    })
    .strict(),

  adminId: z.object({
    adminId: z.string().cuid(),
  }),

  updateAdmin: z.object({
    name: z.string().trim().min(8).max(100),
  }),

  resetPassword: z.object({
    newPassword: z.string().trim().min(8).max(32),
  }),
};

export type AdminCreateDto = z.infer<typeof AdminSchema.create>;
export type AdminResponseDto = z.infer<typeof AdminSchema.responseAdmin>;
export type PaginationQueryDto = z.infer<typeof AdminSchema.pagination>;
export type AdminIdDto = z.infer<typeof AdminSchema.adminId>;
export type UpdateAdminByIdDto = z.infer<typeof AdminSchema.updateAdmin>;
export type ResetPasswordByIdDto = z.infer<typeof AdminSchema.resetPassword>;

export type AdminResponseListDto = {
  admins: AdminResponseDto[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    totalItemCurrentPage: number;
  };
};
