const repository = require("./repository");
const schema = require("./schema");
const validate = require("../../utilities/validation");
const ResponseError = require("../../error/ResponseError");

const create = async (request) => {
  const validData = validate(request, schema.create);

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

module.exports = { create, getAll };
