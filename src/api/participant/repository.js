const db = require("../../utilities/db");

//CRUD

// check event
const checkEvent = async (data) => {
  const result = await db("event").select(["*"]).where({ id: data.event_id });
  return result[0];
};

// create
const create = async (data) => {
  const result = await db("participant").insert(data).returning(["*"]);
  return result[0];
};

// read
const getAll = async (data) => {
  const result = await db("participant")
    .select(["*"])
    .where({ event_id: data.event_id })
    .orderBy("createdAt", "desc");
  return result;
};

// readById
const getById = async (data) => {
  const result = await db("participant").select(["*"]).where({ id: data.id });
  return result[0];
};

// update
const update = async (data) => {
  const result = await db("participant")
    .update(data)
    .where({ id: data.id })
    .returning(["*"]);
  return result[0];
};

// delete
const remove = async (data) => {
  const result = await db("participant")
    .delete(data)
    .where({ id: data.id })
    .returning(["*"]);
  return result[0];
};

module.exports = { checkEvent, create, getAll, getById, update, remove };
