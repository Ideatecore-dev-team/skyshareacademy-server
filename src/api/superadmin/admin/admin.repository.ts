import { type Admin, Role } from "@prisma/client";
import { Prisma } from "../../../configs/database";
import type {
  PaginationQueryDto,
  AdminCreateDto,
  AdminResponseDto,
} from "./admin.schema";

const adminSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
  createdAt: true,
  updatedAt: true,
};

export class AdminRepository {
  async findEmail(email: string): Promise<Admin | null> {
    const result = await Prisma.admin.findFirst({
      where: {
        email,
      },
    });

    return result;
  }

  async createAdmin(admin: AdminCreateDto): Promise<AdminResponseDto> {
    const result = await Prisma.admin.create({
      data: admin,
      select: adminSelect,
    });

    return result;
  }

  async getAllAdmins(data: PaginationQueryDto): Promise<AdminResponseDto[]> {
    const skip = (data.page - 1) * data.size;

    const result = await Prisma.admin.findMany({
      where: { role: { not: Role.SUPER_ADMIN } },
      select: adminSelect,
      skip,
      take: data.size,
      orderBy: {
        createdAt: "desc",
      },
    });

    return result;
  }

  async countAdmins(): Promise<number> {
    const count = await Prisma.admin.count({
      where: {
        role: {
          not: Role.SUPER_ADMIN,
        },
      },
    });

    return count;
  }

  async getAdminById(adminId: string): Promise<AdminResponseDto | null> {
    const result = await Prisma.admin.findUnique({
      where: {
        id: adminId,
      },
      select: adminSelect,
    });

    return result;
  }

  async updateAdminById(adminId: string, name: string): Promise<AdminResponseDto> {
    const result = await Prisma.admin.update({
      where: {
        id: adminId,
      },
      data: {
        name,
      },
      select: adminSelect,
    });

    return result;
  }

  async resetPasswordAdminById(
    adminId: string,
    newPassword: string,
  ): Promise<AdminResponseDto> {
    const result = await Prisma.admin.update({
      where: {
        id: adminId,
      },
      data: {
        password: newPassword,
      },
      select: adminSelect,
    });

    return result;
  }

  async removeAdminById(adminId: string): Promise<AdminResponseDto> {
    const result = await Prisma.admin.delete({
      where: {
        id: adminId,
      },
      select: adminSelect,
    });

    return result;
  }
}
