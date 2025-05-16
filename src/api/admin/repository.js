const db = require("../../utilities/db");

const findAdminByEmail = async (email) => {
  const result = await db("admin")
    .select(["id", "name", "email", "role", "password"])
    .where({ email });
  return result;
};

const findAdminById = async (id) => {
  const result = await db("admin")
    .select(["id", "name", "email", "role"])
    .where({ id });
  return result;
};

const createAdmin = async (userData) => {
  const result = await db("admin")
    .insert(userData)
    .returning(["id", "name", "email", "role"]);

  return result[0];
};

const updateAdminPassword = async (id, password) => {
  const result = await db("admin")
    .update({ password })
    .where({ id })
    .returning(["id", "name", "email", "role"]);
  return result[0];
};

const getAdmins = async () => {
  const result = await db("admin")
    .select(["id", "name", "email", "role"])
    .where({ role: "admin" });
  return result;
};

const updateAdminById = async (id, data) => {
  const result = await db("admin")
    .update(data)
    .where({ id })
    .returning(["id", "name", "email", "role"]);

  return result[0];
};

const deleteAdminById = async (id) => {
  const result = await db("admin")
    .delete()
    .where({ id })
    .returning(["id", "name", "email", "role"]);
  return result[0];
};

module.exports = {
  findAdminByEmail,
  findAdminById,
  createAdmin,
  updateAdminPassword,
  getAdmins,
  updateAdminById,
  deleteAdminById,
};
