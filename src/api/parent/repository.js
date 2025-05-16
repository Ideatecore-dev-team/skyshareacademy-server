const db = require("../../utilities/db");

const findAdminById = async (id) => {
  const result = await db("admin").select(["*"]).where({ id });
  return result;
};

const create = async (data) => {
  const result = await db("parent").insert(data).returning(["*"]);
  return result[0];
};

const getAll = async () => {
  const result = await db("parent").select(["*"]);
  return result;
};

const createParentSchool = async (data) => {
  const result = await db("parent_school").insert(data).returning(["*"]);
  return result[0];
};

const getAllParentSchool = async () => {
  const result = await db("parent_school").select([
    "id",
    "parent_id",
    "school_id",
  ]);
  return result;
};

const update = async (data) => {
  const result = await db("parent").update(data).returning(["*"]);
  return result[0];
};

const deleteParentSchool = async (data) => {
  const result = await db("parent_school")
    .delete()
    .where({ parent_id: data.parent_id })
    .returning(["*"]);
  return result[0];
};

module.exports = {
  findAdminById,
  create,
  getAll,
  createParentSchool,
  getAllParentSchool,
  update,
  deleteParentSchool,
};
