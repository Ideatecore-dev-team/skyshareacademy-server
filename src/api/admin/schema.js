const Joi = require("joi");

const register = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const changePassword = Joi.object({
  id: Joi.number().required(),
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

const logout = Joi.object({
  id: Joi.number().required(),
});

const getAdminById = Joi.object({
  id: Joi.number().required(),
});

const updateAdminById = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const deleteAdminById = Joi.object({
  id: Joi.number().required(),
});

module.exports = {
  register,
  login,
  changePassword,
  logout,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};
