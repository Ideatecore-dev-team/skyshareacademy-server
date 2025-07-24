import bcrypt from "bcrypt";
import { validate } from "../../../configs/validation";
import { ConflictException, NotFoundException } from "../../../errors/Errors";
import { AdminRepository } from "./admin.repository";
import type {
  PaginationQueryDto,
  AdminCreateDto,
  AdminResponseDto,
  AdminResponseListDto,
  UpdateAdminByIdDto,
  ResetPasswordByIdDto,
} from "./admin.schema";
import { AdminSchema } from "./admin.schema";

const adminRepository = new AdminRepository();

export class AdminService {
  async create(request: AdminCreateDto): Promise<AdminResponseDto> {
    const isEmailExist = await adminRepository.findEmail(request.email);

    if (isEmailExist) {
      throw new ConflictException("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(request.password, 10);

    const result = await adminRepository.createAdmin({
      ...request,
      password: hashedPassword,
    });

    const response = validate.response(AdminSchema.responseAdmin, result);

    return response;
  }

  async getAdmins(request: PaginationQueryDto): Promise<AdminResponseListDto> {
    const { page, size } = request;

    const admin = await adminRepository.getAllAdmins({ page, size });

    if (admin.length === 0) {
      throw new NotFoundException("Admin not found");
    }

    const totalItems = await adminRepository.countAdmins();
    const totalPages = Math.ceil(totalItems / size);
    const totalItemCurrentPage = admin.length;

    return {
      admins: admin,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        pageSize: size,
        totalItemCurrentPage,
      },
    };
  }

  async getAdminById(adminId: string): Promise<AdminResponseDto> {
    const admin = await adminRepository.getAdminById(adminId);

    if (!admin) {
      throw new NotFoundException("Admin not found");
    }

    if (admin.role === "SUPER_ADMIN") {
      throw new NotFoundException("Admin not found");
    }

    return admin;
  }

  async updateAdminById(
    adminId: string,
    request: UpdateAdminByIdDto,
  ): Promise<AdminResponseDto> {
    const admin = await adminRepository.getAdminById(adminId);

    if (!admin) {
      throw new NotFoundException("Admin not found");
    }

    if (admin.role === "SUPER_ADMIN") {
      throw new NotFoundException("Admin not found");
    }

    const result = await adminRepository.updateAdminById(adminId, request.name);

    return result;
  }

  async resetPasswordById(
    adminId: string,
    request: ResetPasswordByIdDto,
  ): Promise<AdminResponseDto> {
    const admin = await adminRepository.getAdminById(adminId);

    if (!admin) {
      throw new NotFoundException("Admin not found");
    }

    if (admin.role === "SUPER_ADMIN") {
      throw new NotFoundException("Admin not found");
    }

    const hashedPassword = await bcrypt.hash(request.newPassword, 10);

    const result = await adminRepository.resetPasswordAdminById(
      adminId,
      hashedPassword,
    );

    return result;
  }

  async removeAdminById(adminId: string): Promise<AdminResponseDto> {
    const admin = await adminRepository.getAdminById(adminId);

    if (!admin) {
      throw new NotFoundException("Admin not found");
    }

    if (admin.role === "SUPER_ADMIN") {
      throw new NotFoundException("Admin not found");
    }

    const result = await adminRepository.removeAdminById(adminId);

    return result;
  }
}
