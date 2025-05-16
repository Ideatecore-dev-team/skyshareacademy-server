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
    throw new ResponseError(404, "group not found");
  }

  return result;
};

const getById = async (request) => {
  const validData = validate(request, schema.getById);

  const result = await repository.getById(validData);
  if (!result) {
    throw new ResponseError(404, "group not found");
  }

  return result;
};

const update = async (request) => {
  const validData = validate(request, schema.update);

  const groupExist = await repository.getById({ id: validData.id });
  if (!groupExist) {
    throw new ResponseError(404, "group not found");
  }

  const updateData = {
    id: validData.id,
    name: validData.name,
    link: validData.link,
    school_id: validData.school_id,
  };

  const result = await repository.update(validData, updateData);

  if (!result) {
    throw new ResponseError(404, "group not found");
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

  if (!result) {
    throw new ResponseError(404, "group not found");
  }

  return result;
};

const getGroupBySchoolId = async (request) => {
  const validData = validate(request, schema.getGroupBySchoolId);

  const result = await repository.getGroupBySchoolId(validData);
  if (!result) {
    throw new ResponseError(404, "group not found");
  }

  return result;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  getGroupBySchoolId,
};
