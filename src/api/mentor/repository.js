const db = require("../../utilities/db");

const findAdminById = async (id) => {
  const result = await db("admin").select(["*"]).where({ id });
  return result;
};

const create = async (data) => {
  const result = await db("mentor").insert(data).returning(["*"]);
  return result[0];
};

const getAll = async () => {
  const result = await db("mentor").select(["*"]);
  return result;
};

const createMentorSchool = async (data) => {
  const result = await db("mentor_school").insert(data).returning(["*"]);
  return result[0];
};

const getAllMentorSchool = async () => {
  const result = await db("mentor_school").select([
    "id",
    "mentor_id",
    "school_id",
  ]);
  return result;
};

const update = async (data) => {
  const result = await db("mentor").update(data).returning(["*"]);
  return result[0];
};

const deleteMentorSchool = async (data) => {
  const result = await db("mentor_school")
    .delete()
    .where({ mentor_id: data.mentor_id })
    .returning(["*"]);
  return result[0];
};

module.exports = {
  findAdminById,
  create,
  getAll,
  createMentorSchool,
  getAllMentorSchool,
  update,
  deleteMentorSchool,
};
