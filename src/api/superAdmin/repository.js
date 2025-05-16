const db = require("../../utilities/db");

const findSuperAdminByUsername = async (username) => {
  const result = await db("superadmin").select(["*"]).where({ username });
  return result;
};

const findSuperAdminById = async (id) => {
  const result = await db("superadmin").select(["*"]).where({ id });
  return result;
};

const updateSuperAdminPassword = async (id, password) => {
  const result = await db("superadmin")
    .update({ password })
    .where({ id })
    .returning(["*"]);
  return result[0];
};

const getAdmins = async () => {
  const result = await db("admin").select(["id", "name", "email", "role"]);
  return result;
};

const findAdminById = async (id) => {
  const result = await db("admin")
    .select(["id", "name", "email", "role"])
    .where({ id });
  return result;
};

const updateAdminById = async (id, data) => {
  const result = await db("admin")
    .update(data)
    .where({ id })
    .returning(["id", "name", "email", "role"]);
  console.log(result);
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
  findSuperAdminByUsername,
  findSuperAdminById,
  updateSuperAdminPassword,
  getAdmins,
  findAdminById,
  updateAdminById,
  deleteAdminById,
};
