const db = require("../../utilities/db");

const get = async () => {
  let result = await db("popup_config").first();
  if (!result) {
    const inserted = await db("popup_config")
      .insert({
        is_active: false,
        randomize: true,
        popups: JSON.stringify([]),
      })
      .returning(["*"]);
    result = inserted[0];
  }
  return result;
};

const update = async (data) => {
  const existing = await get();
  const updatePayload = {
    ...data,
    popups: typeof data.popups === "string" ? data.popups : JSON.stringify(data.popups || []),
    updatedAt: db.fn.now(),
  };

  const result = await db("popup_config")
    .where({ id: existing.id })
    .update(updatePayload)
    .returning(["*"]);

  return result[0];
};

module.exports = {
  get,
  update,
};
