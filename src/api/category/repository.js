const db = require("../../utilities/db");
const getCategoryByName = async (name) => {
  const result = await db("category").select(["*"]).where(name);
  return result;
};

const create = async (data) => {
  const result = await db("category").insert(data).returning(["*"]);
  return result[0];
};

const getAll = async () => {
  const result = await db("category").select(["*"]);
  return result;
};

const getById = async (data) => {
  const result = await db("category").select(["*"]).where({ id: data.id });
  return result[0];
};

const update = async (data) => {
  const result = await db("category")
    .update(data)
    .where({ id: data.id })
    .returning(["*"]);

  return result[0];
};

const remove = async (data) => {
  const result = await db("category")
    .delete()
    .where({ id: data.id })
    .returning(["*"]);
  return result[0];
};

module.exports = {
  getCategoryByName,
  create,
  getAll,
  getById,
  update,
  remove,
};
