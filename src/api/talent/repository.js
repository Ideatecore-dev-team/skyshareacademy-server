const db = require("../../utilities/db");

const findAdminById = async (id) => {
  const result = await db("admin").select(["*"]).where({ id });
  return result;
};

const create = async (data) => {
  const result = await db("talent").insert(data).returning(["*"]);
  return result[0];
};

const getAll = async () => {
  const result = await db("talent").select(["*"]);
  return result;
};

const createTalentSchool = async (data) => {
  const result = await db("talent_school").insert(data).returning(["*"]);
  return result[0];
};

const getAllTalentSchool = async () => {
  const result = await db("talent_school").select([
    "id",
    "talent_id",
    "school_id",
  ]);
  return result;
};

const update = async (data) => {
  const result = await db("talent").update(data).returning(["*"]);
  return result[0];
};

const deleteTalentSchool = async (data) => {
  const result = await db("talent_school")
    .delete()
    .where({ talent_id: data.talent_id })
    .returning(["*"]);
  return result[0];
};

module.exports = {
  findAdminById,
  create,
  getAll,
  createTalentSchool,
  getAllTalentSchool,
  update,
  deleteTalentSchool,
};
