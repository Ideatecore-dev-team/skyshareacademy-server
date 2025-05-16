const bcrypt = require("bcrypt");
const jwt = require("../../utilities/token");
const repository = require("./repository");
const schema = require("./schema");
const validate = require("../../utilities/validation");
const ResponseError = require("../../error/ResponseError");

const login = async (request) => {
  const validData = validate(request, schema.login);

  const superadmin = await repository.findSuperAdminByUsername(
    validData.username
  );

  if (!superadmin.length > 0) {
    throw new ResponseError(401, "username or password is wrong");
  }

  const isPasswordValid = await bcrypt.compare(
    validData.password,
    superadmin[0].password
  );

  if (!isPasswordValid) {
    throw new ResponseError(401, "username or password is wrong");
  }

  const token = jwt({
    id: superadmin[0].id,
    role: "superadmin",
  });

  return {
    token,
    id: superadmin[0].id,
    username: superadmin[0].username,
    role: superadmin[0].role,
  };
};

const changePassword = async (request) => {
  const validData = validate(request, schema.changePassword);

  const superadmin = await repository.findSuperAdminById(validData.id);

  if (!superadmin.length > 0) {
    throw new ResponseError(401, "user not found");
  }

  const isPasswordValid = await bcrypt.compare(
    validData.oldPassword,
    superadmin[0].password
  );

  if (!isPasswordValid) {
    throw new ResponseError(401, "old password is wrong");
  }

  const hashedPassword = await bcrypt.hash(validData.newPassword, 10);

  const result = await repository.updateSuperAdminPassword(
    validData.id,
    hashedPassword
  );

  return result;
};

const logout = async (request) => {
  const validData = validate(request, schema.logout);

  const superadmin = await repository.findSuperAdminById(validData.id);

  if (!superadmin.length > 0) {
    throw new ResponseError(401, "user not found");
  }

  const token = null;

  return token;
};

const getAdmins = async () => {
  const result = await repository.getAdmins();
  if (!result.length > 0) {
    throw new ResponseError(404, "admin not found");
  }

  return result;
};

const getAdminById = async (request) => {
  const validData = validate(request, schema.getAdminById);
  const admin = await repository.findAdminById(validData.id);
  if (!admin.length > 0) {
    throw new ResponseError(404, "admin not found");
  }

  return admin;
};

const updateAdminById = async (request) => {
  const validData = validate(request, schema.updateAdminById);

  const admin = await repository.findAdminById(validData.id);
  if (!admin.length > 0) {
    throw new ResponseError(404, "admin not found");
  }

  const hashedPassword = await bcrypt.hash(validData.password, 10);

  validData.password = hashedPassword;

  const result = await repository.updateAdminById(validData.id, validData);
  if (!result) {
    throw new ResponseError(404, "admin not found");
  }

  return result;
};

const deleteAdminById = async (request) => {
  const validData = validate(request, schema.deleteAdminById);

  const admin = await repository.findAdminById(validData.id);
  if (!admin.length > 0) {
    throw new ResponseError(404, "admin not found");
  }

  const result = await repository.deleteAdminById(validData.id);
  if (!result) {
    throw new ResponseError(404, "admin not found");
  }

  return result;
};

module.exports = {
  login,
  logout,
  changePassword,
  getAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};
