const Joi = require("joi");

const create = Joi.object({
  name: Joi.string().required(),
  link: Joi.string().required(),
  school_id: Joi.number().required(),
});

const getById = Joi.object({
  id: Joi.number().required(),
});

const update = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  link: Joi.string().required(),
  school_id: Joi.number().required(),
});

const remove = Joi.object({
  id: Joi.number().required(),
  admin_id: Joi.number().required(),
});

const getGroupBySchoolId = Joi.object({
  school_id: Joi.number().required(),
});

module.exports = { create, getById, update, remove, getGroupBySchoolId };
