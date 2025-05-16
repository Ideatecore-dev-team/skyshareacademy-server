const Joi = require("joi");

const create = Joi.object({
  image_heading: Joi.string().required(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  link: Joi.string().required(),
  admin_id: Joi.number().required(),
  category_id: Joi.number().required(),
});

const getById = Joi.object({
  id: Joi.number().required(),
});

const update = Joi.object({
  id: Joi.number().required(),
  image_heading: Joi.string().required(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  link: Joi.string().required(),
  admin_id: Joi.number().required(),
  category_id: Joi.number().required(),
});

const remove = Joi.object({
  id: Joi.number().required(),
  admin_id: Joi.number().required(),
});

module.exports = { create, getById, update, remove };
