const Joi = require("joi");

const sendOtp = Joi.object({
  destination: Joi.string().required(),
  type: Joi.string().valid("email", "phone").default("email"),
});

const verifyOtp = Joi.object({
  destination: Joi.string().required(),
  otp: Joi.string().length(6).required(),
});

const register = Joi.object({
  destination: Joi.string().required(),
  name: Joi.string().required(),
  region: Joi.string().required(),
  age: Joi.number().integer().min(5).max(120).required(),
  occupation: Joi.string().required(),
  role: Joi.string().valid("mentor", "talent").default("talent"),
  phone: Joi.string().allow("", null).optional(),
  email: Joi.string().email().allow("", null).optional(),
});

const googleLogin = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().allow("", null).optional(),
  google_id: Joi.string().allow("", null).optional(),
  profile_picture: Joi.string().allow("", null).optional(),
});

const updateProfile = Joi.object({
  name: Joi.string().optional(),
  region: Joi.string().optional(),
  age: Joi.number().integer().min(5).max(120).optional(),
  occupation: Joi.string().optional(),
  profile_picture: Joi.string().allow("", null).optional(),
});

module.exports = {
  sendOtp,
  verifyOtp,
  register,
  googleLogin,
  updateProfile,
};
