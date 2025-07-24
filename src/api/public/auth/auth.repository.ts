import type { Admin } from "@prisma/client";
import { Prisma } from "../../../configs/database";

export class AuthRepository {
  async findEmail(email: string): Promise<Admin | null> {
    const result = await Prisma.admin.findFirst({
      where: {
        email,
      },
    });

    return result;
  }
}
