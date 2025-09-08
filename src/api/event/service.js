const repository = require("./repository");
const schema = require("./schema");
const validate = require("../../utilities/validation");
const ResponseError = require("../../error/ResponseError");
const { deleteImage } = require("../../utilities/deleteCloudinary");
const defaultImage = "https://picsum.photos/300/300";

const create = async (request) => {
  const validData = validate(request, schema.create);

  const result = await repository.create(validData);
  //   if (!result.length > 0) {
  //     throw new ResponseError(404, "event not found");
  //   }

  return result;
};

const getAll = async () => {
  const result = await repository.getAll();
  if (!result.length > 0) {
    throw new ResponseError(404, "event not found");
  }

  return result;
};

const getById = async (request) => {
  const validData = validate(request, schema.getById);

  const result = await repository.getById({ id: validData.id });
  if (!result) {
    throw new ResponseError(404, "event not found");
  }

  return result;
};

const update = async (request) => {
  const validData = validate(request, schema.update);

  const eventExist = await repository.getById({ id: validData.id });
  if (!eventExist) {
    throw new ResponseError(404, "event not found");
  }
  if (validData.event_image_url === defaultImage) {
    validData.event_image_url = eventExist.event_image_url;
  } else {
    await deleteImage(eventExist.event_image_url);
  }

  const updateData = {
    ...validData,
    event_image_url: validData.event_image_url,
  };

  const result = await repository.update(updateData);

  return result;
};

const remove = async (request) => {
  const validData = validate(request, schema.getById);

  const result = await repository.remove({ id: validData.id });
  if (!result) {
    throw new ResponseError(404, "event not found");
  }

  await deleteImage(result.event_image_url);

  return result;
};

module.exports = { create, getAll, getById, update, remove };
