const repository = require("./repository");
const schema = require("./schema");
const validate = require("../../utilities/validation");
const ResponseError = require("../../error/ResponseError");
const { deleteImage } = require("../../utilities/deleteCloudinary");

const create = async (request) => {
  const validData = validate(request, schema.create);
  const adminExist = await repository.findAdminById(validData.admin_id);
  if (!adminExist.length > 0) {
    throw new ResponseError(404, "admin not found");
  }

  const result = await repository.create(validData);

  return result;
};

const getAll = async () => {
  const result = await repository.getAll();
  if (!result.length > 0) {
    throw new ResponseError(404, "article not found");
  }

  return result;
};

const getById = async (request) => {
  const validData = validate(request, schema.getById);

  const result = await repository.getById(validData);
  if (!result) {
    throw new ResponseError(404, "article not found");
  }

  return result;
};

const update = async (request) => {
  const validData = validate(request, schema.update);

  const articleExist = await repository.getById({ id: validData.id });
  if (!articleExist) {
    throw new ResponseError(404, "article not found");
  }
  // console.log(validData, "<====validData");
  // console.log(articleExist, "<====articleExist");

  if (
    validData.image_heading ===
    "https://res.cloudinary.com/dsh5ppscb/image/upload/v1714931793/no-image/No_Image_Available_zfarlj.jpg"
  ) {
    validData.image_heading = articleExist.image_heading;
  } else {
    // console.log(articleExist.image_heading);
    await deleteImage(articleExist.image_heading);
  }

  const updateData = {
    id: validData.id,
    image_heading: validData.image_heading,
    title: validData.title,
    content: validData.content,
    link: validData.link,
    admin_id: validData.admin_id,
    category_id: Number(validData.category_id),
  };

  console.log();
  const result = await repository.update(updateData);

  if (!result) {
    throw new ResponseError(404, "article not found");
  }

  return result;
};

const remove = async (request) => {
  const validData = validate(request, schema.remove);

  const adminExist = await repository.findAdminById(validData.admin_id);
  if (!adminExist.length > 0) {
    throw new ResponseError(404, "admin not found");
  }

  const result = await repository.remove(validData);
  await deleteImage(result.image_heading);

  if (!result) {
    throw new ResponseError(404, "article not found");
  }

  return result;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
