import { Role, type Admin } from "@prisma/client";
import { Prisma } from "../../../src/configs/database";
import bcrypt from "bcrypt";
import { createToken } from "../../../src/configs/createToken";

export const dataAdmin = {
  email: "test_email_admin@mail.com",
  password: "test_password",
  name: "test_name",
};

export const dataSuperadmin = {
  email: "super-admin@mail.com",
  password: "superadmin-pasword",
  name: "super admin",
  role: Role.SUPER_ADMIN,
};

export const deleteAdmin = async (): Promise<void> => {
  await Prisma.admin.deleteMany({
    where: {
      email: dataAdmin.email,
    },
  });
};
export const deleteSuperAdmin = async (): Promise<void> => {
  await Prisma.admin.deleteMany({
    where: {
      email: dataSuperadmin.email,
    },
  });
};

export const createAdmin = async (): Promise<Admin | null> => {
  const hashedPassword = await bcrypt.hash(dataAdmin.password, 10);
  const result = await Prisma.admin.create({
    data: { ...dataAdmin, password: hashedPassword },
  });

  return result;
};

export const createSuperAdmin = async (): Promise<Admin | null> => {
  const hashedPassword = await bcrypt.hash(dataSuperadmin.password, 10);
  const result = await Prisma.admin.create({
    data: { ...dataSuperadmin, password: hashedPassword },
  });

  return result;
};

const getSuperAdmin = async (): Promise<Admin | null> => {
  const result = await Prisma.admin.findUnique({
    where: {
      email: dataSuperadmin.email,
    },
  });

  return result;
};

export const createAdminToken = async (): Promise<string> => {
  const admin = await createAdmin();

  const result = createToken({ id: admin?.id });

  return result;
};

export const createSuperAdminToken = async (): Promise<string> => {
  const admin = await getSuperAdmin();

  const result = createToken({ id: admin?.id });

  return result;
};

export const createManyAdmins = async (): Promise<Admin[]> => {
  const adminData: { email: string; password: string; name: string }[] = [];

  for (let i = 1; i <= 15; i++) {
    const hashedPassword = await bcrypt.hash(`test_password${i}`, 10);
    adminData.push({
      email: `test_email_admin_${i}@mail.com`,
      password: hashedPassword,
      name: `test name ${i}`,
    });
  }

  const result = await Prisma.$transaction(
    adminData.map((data) => Prisma.admin.create({ data })),
  );
  return result;
};

export const deleteManyAdmin = async (): Promise<void> => {
  await Prisma.admin.deleteMany({
    where: {
      email: {
        startsWith: "test_email_admin_",
      },
    },
  });
};

export const getAdmin = async (): Promise<Admin | null> => {
  const result = await Prisma.admin.findFirst({
    where: {
      email: {
        startsWith: "test_email_admin_",
      },
    },
  });

  return result;
};
