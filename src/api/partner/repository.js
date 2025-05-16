const db = require("../../utilities/db");

const findAdminById = async (id) => {
  const result = await db("admin").select(["*"]).where({ id });
  return result;
};

// CRUD
// create
const create = async (data) => {
  const result = await db("partner").insert(data).returning(["*"]);
  return result[0];
};

// getAll
const getAll = async () => {
  const result = await db("partner").select(["*"]);
  return result;
};

// getById
const getById = async (data) => {
  const result = await db("partner").select(["*"]).where({ id: data.id });
  return result[0];
};

// update
const update = async (data) => {
  const result = await db("partner")
    .update(data)
    .where({ id: data.id })
    .returning(["*"]);

  return result[0];
};

// delete
const remove = async (data) => {
  const result = await db("partner")
    .delete()
    .where({ id: data.id })
    .returning(["*"]);
  return result[0];
};

module.exports = {
  findAdminById,
  create,
  getAll,
  getById,
  update,
  remove,
};
