import type { Admin } from "@prisma/client";
import { Prisma } from "../../../src/configs/database";
import bcrypt from "bcrypt";

export const dataAdmin = {
  email: "test_email_auth@mail.com",
  password: "test_password",
  name: "test_name",
};

export const dataLogin = {
  email: "test_email_auth@mail.com",
  password: "test_password",
};

export const createAdmin = async (): Promise<Admin | null> => {
  const hashedPassword = await bcrypt.hash(dataAdmin.password, 10);
  const result = await Prisma.admin.create({
    data: { ...dataAdmin, password: hashedPassword },
  });

  return result;
};

export const deleteAdmin = async (): Promise<void> => {
  await Prisma.admin.deleteMany({
    where: {
      email: dataAdmin.email,
    },
  });
};
