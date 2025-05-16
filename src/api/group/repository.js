const db = require("../../utilities/db");
const { school } = require("../../utilities/uploadCloudinary");

const getGroupByName = async (name) => {
  const result = await db("group").select(["*"]).where(name);
  return result;
};

const create = async (data) => {
  const result = await db("group").insert(data).returning(["*"]);
  return result[0];
};

const getAll = async () => {
  const result = await db("group")
    .join("school", "group.school_id", "school.id")
    .select(["group.*", "school.nama_sekolah"]);
  return result;
};

const getById = async (data) => {
  const result = await db("group")
    .where({ "group.id": data.id })
    .join("school", "group.school_id", "school.id")
    .select(["group.*", "school.nama_sekolah"]);
  return result[0];
};

const update = async (data) => {
  const result = await db("group")
    .update({ updatedAt: new Date(), ...data })
    .where({ id: data.id })
    .returning(["*"]);

  return result[0];
};

const remove = async (data) => {
  const result = await db("group")
    .delete()
    .where({ id: data.id })
    .returning(["*"]);
  return result[0];
};

const findAdminById = async (id) => {
  const result = await db("admin").select(["*"]).where({ id });
  return result;
};

const getGroupBySchoolId = async (data) => {
  const result = await db("group")
    .join("school", "group.school_id", "school.id")
    .where({ " group.school_id": data.school_id })
    .select(["group.*", "school.nama_sekolah"]);

  return result;
};

module.exports = {
  getGroupByName,
  create,
  getAll,
  getById,
  update,
  remove,
  findAdminById,
  getGroupBySchoolId,
};
