const bcrypt = require("bcrypt");
const jwt = require("../../utilities/token");
const repository = require("./repository");
const schema = require("./schema");
const validate = require("../../utilities/validation");
const ResponseError = require("../../error/ResponseError");

const register = async (request) => {
  const validData = validate(request, schema.register);

  const adminExist = await repository.findAdminByEmail(validData.email);
  if (adminExist.length > 0) {
    throw new ResponseError(400, "email already exist");
  }

  validData.password = await bcrypt.hash(validData.password, 10);

  const result = await repository.createAdmin(validData);

  return result;
};

const login = async (request) => {
  const validData = validate(request, schema.login);
  const admin = await repository.findAdminByEmail(validData.email);
  if (!admin.length > 0) {
    throw new ResponseError(401, "username or password is wrong");
  }

  const isPasswordValid = await bcrypt.compare(
    validData.password,
    admin[0].password
  );

  if (!isPasswordValid) {
    throw new ResponseError(401, "username or password is wrong");
  }

  const token = jwt({
    id: admin[0].id,
    role: admin[0].role,
  });

  return {
    token,
    id: admin[0].id,
    name: admin[0].name,
    email: admin[0].email,
    role: admin[0].role,
  };
};

const changePassword = async (request) => {
  const validData = validate(request, schema.changePassword);

  const superadmin = await repository.findAdminById(validData.id);

  if (!superadmin.length > 0) {
    throw new ResponseError(401, "admin not found");
  }

  const isPasswordValid = await bcrypt.compare(
    validData.oldPassword,
    superadmin[0].password
  );

  if (!isPasswordValid) {
    throw new ResponseError(401, "old password is wrong");
  }

  const hashedPassword = await bcrypt.hash(validData.newPassword, 10);

  const result = await repository.updateAdminPassword(
    validData.id,
    hashedPassword
  );

  return result;
};

const logout = async (request) => {
  const validData = validate(request, schema.logout);

  const user = await repository.findAdminById(validData.id);

  if (!user.length > 0) {
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
  register,
  login,
  logout,
  changePassword,
  getAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};
