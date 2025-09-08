const db = require("../../utilities/db");

// CRUD
// create
const create = async (data) => {
  const result = await db("event").insert(data).returning(["*"]);
  return result[0];
};

// read
const getAll = async () => {
  const result = await db("event").select(["*"]).orderBy("createdAt", "desc");
  return result;
};

// readById
const getById = async (data) => {
  const result = await db("event").select(["*"]).where({ id: data.id });
  return result[0];
};

// update
const update = async (data) => {
  const result = await db("event")
    .update(data)
    .where({ id: data.id })
    .returning(["*"]);
  return result[0];
};

// delete
const remove = async (data) => {
  const result = await db("event")
    .delete(data)
    .where({ id: data.id })
    .returning(["*"]);
  return result[0];
};

module.exports = { create, getAll, getById, update, remove };
