const db = require("../../utilities/db");

const findAdminById = async (id) => {
  const result = await db("admin").select(["*"]).where({ id });
  return result;
};

// CRUD
// create
const create = async (data) => {
  const result = await db("article").insert(data).returning(["*"]);
  return result[0];
};

// getAll
const getAll = async () => {
  const result = await db("article")
    .join("admin", "article.admin_id", "admin.id")
    .join("category", "article.category_id", "category.id")
    .select(
      "article.id",
      "article.image_heading",
      "article.title",
      "article.content",
      "article.link",
      "article.admin_id",
      "admin.name as admin_name",
      "article.category_id",
      "category.name as category_name",
      "category.color as category_color",
      "article.createdAt",
      "article.updatedAt"
    )
    .orderBy("article.createdAt", "desc");
  // .limit(6)
  // .offset(0);
  return result;
};

// getById
const getById = async (data) => {
  const result = await db("article")
    .join("admin", "article.admin_id", "admin.id")
    .join("category", "article.category_id", "category.id")
    .where("article.id", data.id)
    .select(
      "article.id",
      "article.image_heading",
      "article.title",
      "article.content",
      "article.link",
      "article.admin_id",
      "admin.name as admin_name",
      "article.category_id",
      "category.name as category_name",
      "category.color as category_color",
      "article.createdAt",
      "article.updatedAt"
    );
  return result[0];
};

// update
const update = async (data) => {
  const result = await db("article")
    .update({ updatedAt: new Date(), ...data })
    .where({ id: data.id })
    .returning(["*"]);

  return result[0];
};

// delete
const remove = async (data) => {
  const result = await db("article")
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
