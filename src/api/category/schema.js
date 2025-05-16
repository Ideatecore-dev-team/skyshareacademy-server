const Joi = require("joi");

const create = Joi.object({
  name: Joi.string().required(),
  color: Joi.string().required(),
});

const getById = Joi.object({
  id: Joi.number().required(),
});

const update = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  color: Joi.string().required(),
});

const remove = Joi.object({
  id: Joi.number().required(),
});

module.exports = { create, getById, update, remove };
