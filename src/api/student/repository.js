const db = require("../../utilities/db");

const findByEmail = async (email) => {
  return await db("student_accounts").where({ email }).first();
};

const findByPhone = async (phone) => {
  return await db("student_accounts").where({ phone }).first();
};

const findById = async (id) => {
  return await db("student_accounts").where({ id }).first();
};

const findByDestination = async (destination) => {
  return await db("student_accounts")
    .where("email", destination)
    .orWhere("phone", destination)
    .first();
};

const createAccount = async (data) => {
  const result = await db("student_accounts").insert(data).returning("*");
  return result[0];
};

const updateAccount = async (id, data) => {
  data.updatedAt = db.fn.now();
  const result = await db("student_accounts")
    .where({ id })
    .update(data)
    .returning("*");
  return result[0];
};

module.exports = {
  findByEmail,
  findByPhone,
  findById,
  findByDestination,
  createAccount,
  updateAccount,
};
