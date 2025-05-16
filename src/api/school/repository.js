const db = require("../../utilities/db");
const getSchoolByName = async (nama_sekolah) => {
  const result = await db("school").select(["*"]).where(nama_sekolah);
  return result;
};

const create = async (data) => {
  const result = await db("school").insert(data).returning(["*"]);
  return result[0];
};

const getAll = async () => {
  const result = await db("school").select(["*"]);
  return result;
};

const getById = async (data) => {
  const result = await db("school").select(["*"]).where({ id: data.id });
  return result[0];
};

const update = async (data) => {
  const result = await db("school")
    .update({ updatedAt: new Date(), ...data })
    .where({ id: data.id })
    .returning(["*"]);

  return result[0];
};

const remove = async (data) => {
  const result = await db("school")
    .delete()
    .where({ id: data.id })
    .returning(["*"]);
  return result[0];
};

const findAdminById = async (id) => {
  const result = await db("admin").select(["*"]).where({ id });
  return result;
};

module.exports = {
  getSchoolByName,
  create,
  getAll,
  getById,
  update,
  remove,
  findAdminById,
};
