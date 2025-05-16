const db = require("../../utilities/db");
const create = async (data) => {
  const result = await db("contact").insert(data).returning(["*"]);
  return result[0];
};

const getAll = async () => {
  const result = await db("contact").select(["*"]);
  return result;
};

module.exports = { create, getAll };
