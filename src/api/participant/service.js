const repository = require("./repository");
const schema = require("./schema");
const validate = require("../../utilities/validation");
const ResponseError = require("../../error/ResponseError");

const create = async (request) => {
  const validData = validate(request, schema.create);

  const checkEvent = await repository.checkEvent(validData);
  if (!checkEvent) {
    throw new ResponseError(404, "event not found");
  }

  const result = await repository.create(validData);

  return result;
};

const getAll = async (request) => {
  const validData = validate(request, schema.getAll);

  const checkEvent = await repository.checkEvent(validData);
  if (!checkEvent) {
    throw new ResponseError(404, "event not found");
  }

  const result = await repository.getAll(validData);
  if (!result.length > 0) {
    throw new ResponseError(404, "participant not found");
  }

  return result;
};

const getById = async (request) => {
  const validData = validate(request, schema.getById);

  const result = await repository.getById({ id: validData.id });
  if (!result) {
    throw new ResponseError(404, "participant not found");
  }

  return result;
};

const update = async (request) => {
  const validData = validate(request, schema.update);

  const checkEvent = await repository.checkEvent(validData);
  if (!checkEvent) {
    throw new ResponseError(404, "event not found");
  }

  const participant = await repository.getById({ id: validData.id });
  if (!participant) {
    throw new ResponseError(404, "participant not found");
  }
  const result = await repository.update(validData);

  return result;
};

const remove = async (request) => {
  const validData = validate(request, schema.getById);

  const result = await repository.remove({ id: validData.id });
  if (!result) {
    throw new ResponseError(404, "participant not found");
  }

  return result;
};

module.exports = { create, getAll, getById, update, remove };
