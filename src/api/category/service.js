const repository = require("./repository");
const schema = require("./schema");
const validate = require("../../utilities/validation");
const ResponseError = require("../../error/ResponseError");

const create = async (request) => {
  const validData = validate(request, schema.create);

  const categoryExist = await repository.getCategoryByName({
    name: validData.name,
  });
  if (categoryExist.length > 0) {
    throw new ResponseError(409, "category already exist");
  }

  const result = await repository.create(validData);

  return result;
};

const getAll = async () => {
  const result = await repository.getAll();
  if (!result.length > 0) {
    throw new ResponseError(404, "category not found");
  }

  return result;
};

const getById = async (request) => {
  const validData = validate(request, schema.getById);

  const result = await repository.getById(validData);
  if (!result) {
    throw new ResponseError(404, "category not found");
  }

  return result;
};

const update = async (request) => {
  const validData = validate(request, schema.update);

  const categoryExist = await repository.getById({ id: validData.id });
  if (!categoryExist) {
    throw new ResponseError(404, "category not found");
  }

  const updateData = {
    name: validData.title,
    color: validData.category,
  };

  const result = await repository.update(validData, updateData);

  if (!result) {
    throw new ResponseError(404, "category not found");
  }

  return result;
};

const remove = async (request) => {
  const validData = validate(request, schema.remove);

  const result = await repository.remove(validData);
  if (!result) {
    throw new ResponseError(404, "category not found");
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
